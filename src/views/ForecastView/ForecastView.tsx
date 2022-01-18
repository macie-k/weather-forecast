import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './ForecastView.module.scss';
import { DailyWidget } from '../../components/DailyWidget/DailyWidget';

export interface ForecastViewProps {
    city: string;
}

export const ForecastView = ({ city }: ForecastViewProps) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const API_KEY = '50ca162c11794e82bbaaf6a9239ed53e';

    const [weather, setWeather] = useState<any>(null);
    const [current, setCurrent] = useState<any>(null);

    const getData = async (url: string, setter: (e: any) => void) => {
        await fetch(url)
            .then(res => {
                return res.json();
            })
            .then(json => {
                setter(json);
                console.log(json);
            });
    };

    /* request current forecast to get city longitute and latitude and name */
    useEffect(() => {
        if (city) {
            console.log('Seleted city: ' + city);
            getData(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
                setCurrent
            );
        }
    }, [city]);

    /* request 'onecall' weather for current & daily forecast */
    useEffect(() => {
        if (current) {
            getData(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
                setWeather
            );
        }
    }, [current]);

    return (
        <div className={styles.container}>
            {current && weather && (
                <>
                    <div className={styles.currentContainer}>
                        <img
                            draggable="false"
                            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                        />
                        <div className={styles.city}>{current.name}</div>
                        <div className={styles.temp}>{weather.current.temp} &deg;C</div>
                        <div className={styles.desc}>{weather.current.weather[0].description}</div>
                        <div className={styles.detailsRow}>
                            <div
                                title="Wind speed"
                                className={classNames(styles.detail, styles.windSpeed)}
                            >
                                {/* prettier-ignore */}
                                <svg width="123" height="75" viewBox="0 0 123 75" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M28.69 53.38C27.08 53.38 25.78 52.08 25.78 50.47C25.78 48.86 27.08 47.56 28.69 47.56H80.06C80.27 47.56 80.48 47.58 80.68 47.63C82.52 47.91 84.24 48.43 85.78 49.26C87.48 50.18 88.93 51.45 90.05 53.15C93.9 58.98 93.33 64.39 90.61 68.39C88.84 71 86.14 72.94 83.16 73.96C80.16 74.99 76.84 75.09 73.84 73.99C69.3 72.33 65.62 68.1 65.08 60.44C64.97 58.84 66.18 57.46 67.78 57.35C69.38 57.24 70.76 58.45 70.87 60.05C71.22 64.99 73.28 67.61 75.81 68.53C77.52 69.15 79.48 69.07 81.29 68.45C83.13 67.82 84.77 66.66 85.81 65.13C87.3 62.94 87.52 59.85 85.2 56.34C84.63 55.48 83.89 54.83 83.02 54.36C82.11 53.87 81.05 53.55 79.89 53.37H28.69V53.38ZM15.41 27.21C13.8 27.21 12.5 25.91 12.5 24.3C12.5 22.69 13.8 21.39 15.41 21.39H66.62C67.79 21.21 68.85 20.89 69.76 20.4C70.63 19.93 71.37 19.28 71.94 18.42C74.26 14.91 74.03 11.82 72.55 9.63001C71.51 8.10001 69.87 6.94001 68.03 6.31001C66.22 5.69001 64.25 5.61001 62.55 6.23001C60.03 7.15001 57.96 9.77001 57.61 14.71C57.5 16.31 56.12 17.52 54.52 17.41C52.92 17.3 51.71 15.92 51.82 14.32C52.36 6.66001 56.04 2.43001 60.58 0.770011C63.58 -0.319989 66.9 -0.219989 69.9 0.800011C72.88 1.82001 75.58 3.77001 77.35 6.37001C80.07 10.37 80.64 15.78 76.79 21.61C75.67 23.31 74.22 24.58 72.52 25.5C70.98 26.33 69.26 26.85 67.42 27.13C67.22 27.17 67.01 27.2 66.8 27.2H15.41V27.21ZM2.91 40.3C1.3 40.3 0 38.99 0 37.39C0 35.78 1.3 34.48 2.91 34.48H109.98C111.15 34.3 112.21 33.98 113.11 33.49C113.98 33.02 114.72 32.37 115.29 31.51C117.61 28 117.38 24.91 115.9 22.72C114.86 21.19 113.22 20.03 111.38 19.4C109.57 18.78 107.6 18.7 105.9 19.32C103.38 20.24 101.31 22.86 100.96 27.8C100.85 29.4 99.47 30.61 97.87 30.5C96.27 30.39 95.06 29.01 95.17 27.41C95.71 19.75 99.39 15.52 103.93 13.86C106.93 12.77 110.25 12.87 113.25 13.89C116.23 14.91 118.93 16.86 120.7 19.46C123.42 23.46 123.99 28.87 120.14 34.7C119.02 36.4 117.57 37.67 115.87 38.59C114.33 39.42 112.61 39.94 110.77 40.22C110.57 40.26 110.36 40.29 110.15 40.29H2.91V40.3Z" fill="#FDFDFD"/> </svg>
                                {weather.current.wind_speed + ' m/s'}
                            </div>
                            <div
                                title="Humidity"
                                className={classNames(styles.detail, styles.windSpeed)}
                            >
                                {/* prettier-ignore */}
                                <svg width="110" height="123" viewBox="0 0 110 123" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M40.45 2.13C43.62 15.7 50.41 27.84 57.53 38.83C58.59 37.23 59.71 35.59 60.86 33.92C67.25 24.58 74.53 13.93 77.36 1.66C77.62 0.509998 78.76 -0.200002 79.91 0.0599977C80.73 0.249998 81.33 0.879998 81.51 1.65C84.36 13.86 91.63 24.51 98.02 33.86C104.37 43.16 109.89 51.25 109.89 58.94C109.89 73.21 101.96 82.36 91.82 86.37C88.29 87.77 84.49 88.53 80.67 88.66C75.43 135.98 0 134.23 0 83.39C0 62.59 32.31 37.36 40.45 2.13ZM60.08 42.7C70.57 58.39 80.95 71.66 80.95 83.39C80.95 83.73 80.93 84.05 80.93 84.38C84.13 84.22 87.3 83.57 90.24 82.4C98.87 78.99 105.61 71.17 105.61 58.94C105.61 52.56 100.44 44.98 94.49 36.26C89.1 28.36 83.1 19.57 79.43 9.54C75.77 19.63 69.76 28.42 64.36 36.31C62.87 38.51 61.41 40.64 60.08 42.7ZM15.81 77.48C15.61 75.22 17.27 73.23 19.53 73.02C21.79 72.81 23.78 74.48 23.99 76.74C24.5 82.2 25.69 87.22 27.98 91.56C30.19 95.75 33.46 99.35 38.2 102.13C40.16 103.27 40.81 105.79 39.67 107.74C38.52 109.7 36.01 110.35 34.06 109.21C27.89 105.59 23.61 100.89 20.72 95.39C17.88 90.03 16.42 83.97 15.81 77.48Z" fill="#FDFDFD"/> </svg>
                                {weather.current.humidity + ' %'}
                            </div>
                            <div
                                title="Clouds"
                                className={classNames(styles.detail, styles.windSpeed)}
                            >
                                {/* prettier-ignore */}
                                <svg width="195" height="135" viewBox="0 0 195 135" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M121.875 0C106.283 0 91.9657 6.80063 82.8963 17.9518C79.7009 17.2375 76.4396 16.875 73.125 16.875C49.6069 16.875 30.4688 34.541 30.4688 56.25C30.4688 56.7995 30.4806 57.3377 30.5046 57.876C12.8837 62.71 0 77.8054 0 95.625C0 117.334 19.1382 135 42.6562 135H146.25C173.136 135 195 114.818 195 90C195 73.5975 185.229 58.7767 170.185 50.9326C170.482 48.9772 170.625 46.9884 170.625 45C170.625 20.193 148.761 0 121.875 0Z" fill="#FDFDFD"/> </svg>
                                {weather.current.clouds + ' %'}
                            </div>
                        </div>
                    </div>
                    <div className={styles.nextDays}>
                        <DailyWidget
                            iconURL={`http://openweathermap.org/img/wn/${weather.daily[0].weather[0].icon}@2x.png`}
                            label="Tommorow"
                            temp={weather.daily[0].temp.day}
                        />
                        <DailyWidget
                            iconURL={`http://openweathermap.org/img/wn/${weather.daily[1].weather[0].icon}@2x.png`}
                            label={days[(new Date().getDay() + 2) % 7]} // next day name mod 7
                            temp={weather.daily[1].temp.day}
                        />
                        <DailyWidget
                            iconURL={`http://openweathermap.org/img/wn/${weather.daily[2].weather[0].icon}@2x.png`}
                            label={days[(new Date().getDay() + 3) % 7]}
                            temp={weather.daily[2].temp.day}
                        />
                        <DailyWidget
                            iconURL={`http://openweathermap.org/img/wn/${weather.daily[3].weather[0].icon}@2x.png`}
                            label={days[(new Date().getDay() + 4) % 7]}
                            temp={weather.daily[3].temp.day}
                        />
                        <DailyWidget
                            iconURL={`http://openweathermap.org/img/wn/${weather.daily[4].weather[0].icon}@2x.png`}
                            label={days[(new Date().getDay() + 5) % 7]}
                            temp={weather.daily[4].temp.day}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
