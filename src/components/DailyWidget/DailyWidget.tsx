import React from 'react';
import styles from './DailyWidget.module.scss';

export interface DailyWidgetProps {
    iconURL: string;
    label: string;
    temp: number;
}

export const DailyWidget = ({ iconURL, temp, label }: DailyWidgetProps) => {
    return (
        <div className={styles.container}>
            <img draggable="false" className={styles.icon} src={iconURL} alt="" />
            <div className={styles.tempContainer}>
                <div className={styles.temp}>
                    {temp}
                    <sup>&deg;C</sup>
                </div>
            </div>
            <div className={styles.label}>{label}</div>
        </div>
    );
};
