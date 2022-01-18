import React from 'react';
import { DailyWidget } from '../../components/DailyWidget/DailyWidget';

export interface NextDaysProps {
    weather: any;
}

export const NextDays = ({ weather }: NextDaysProps) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
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
        </>
    );
};
