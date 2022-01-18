import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './ForecastView.module.scss';
import { NextDays } from '../../components/NextDays/NextDays';
import { CurrentWidget } from '../../components/CurrentWidget/CurrentWidget';
import { SunIcon } from '../../components/Icons/SunIcon';
import { getWeatherData, WeatherData } from '../../services/weatherService';

export interface ForecastViewProps {
    city: string;
}

export const ForecastView = ({ city }: ForecastViewProps) => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getWeatherData(city)
            .then(setData)
            .catch(err => {
                setError(err.message);
            });
    }, [city]);

    if (error) {
        return (
            <div className={styles.errorMessage}>
                Could not retrieve weather: <span>{error}</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.loader}>
                <SunIcon />
            </div>
        );
    }

    return (
        <div className={styles.innerContainer}>
            <div className={styles.currentContainer}>
                <CurrentWidget weatherData={data} />
            </div>
            <div className={styles.nextDays}>
                <NextDays weatherData={data} />
            </div>
        </div>
    );
};
