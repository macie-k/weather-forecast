import React from 'react';
import { DailyWidget } from '../../components/DailyWidget/DailyWidget';
import { WeatherData } from '../../services/weatherService';

export interface NextDaysProps {
    weatherData: WeatherData;
}

const getDayLabel = (timestamp: number) => {
    const today = new Date();
    const date = new Date(timestamp * 1000);

    if (date.getTime() - today.getTime() < 3600 * 24 * 1000) {
        return 'Tommorow';
    }

    return date.toLocaleDateString('en-EN', { weekday: 'long' });
};

export const NextDays = ({ weatherData }: NextDaysProps) => {
    return (
        <>
            {weatherData.nextDays.map((entry, i) => (
                <DailyWidget
                    key={`daily-${i}`}
                    iconURL={`http://openweathermap.org/img/wn/${entry.weatherIcon}@2x.png`}
                    label={getDayLabel(entry.timestamp)}
                    temp={entry.temp}
                />
            ))}
        </>
    );
};
