import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './ForecastView.module.scss';
import { NextDays } from '../../components/NextDays/NextDays';
import { CurrentWidget } from '../../components/CurrentWidget/CurrentWidget';
import { SunIcon } from '../../components/Icons/SunIcon';

export interface ForecastViewProps {
    city: string;
}

export const ForecastView = ({ city }: ForecastViewProps) => {
    const API_KEY = '50ca162c11794e82bbaaf6a9239ed53e';

    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState<any>(null);
    const [current, setCurrent] = useState<any>(null);
    const [error, setError] = useState<number>();

    const getData = async (url: string, setter: (e: any) => void) => {
        await fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res.status;
                }
            })
            .then(json => setter(json))
            .catch(err => setError(err));
    };

    /* request current forecast to get city longitute and latitude and name */
    useEffect(() => {
        if (city) {
            console.log('Seleted city: ' + city);
            setTimeout(() => {
                // fake 1s delay
                getData(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
                    setCurrent
                );
            }, 1000);
        }
    }, [city]);

    /* request 'onecall' weather for current & daily forecast */
    useEffect(() => {
        if (current) {
            getData(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
                setWeather
            );
            setLoading(false);
        }
    }, [current]);

    return (
        <div className={styles.container}>
            <div className={classNames(styles.loader, { [styles.visible]: loading && !error })}>
                <SunIcon />
            </div>
            <div className={classNames(styles.errorMessage, { [styles.visible]: error })}>
                Could not fetch weather: <span>#{error}</span>
            </div>
            {current && weather && (
                <div className={classNames(styles.innerContainer, { [styles.loaded]: !loading })}>
                    <div className={styles.currentContainer}>
                        <CurrentWidget current={current} weather={weather} />
                    </div>
                    <div className={styles.nextDays}>
                        <NextDays weather={weather} />
                    </div>
                </div>
            )}
        </div>
    );
};
