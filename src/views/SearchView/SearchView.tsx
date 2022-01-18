import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchView.module.scss';

export interface SearchViewProps {
    city: string;
    setCity: (e: string) => void;
}

export const SearchView = ({ city, setCity }: SearchViewProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <input
                    onChange={e => setCity(e.target.value.trim())}
                    className={styles.cityInput}
                    type="text"
                    placeholder="City"
                    value={city}
                />
                <button onClick={() => navigate('/forecast')} className={styles.submit}>
                    Check Weather
                </button>
            </div>
        </div>
    );
};
