import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchView.module.scss';

export interface SearchViewProps {
    city: string;
    setCity: (e: string) => void;
}

export const SearchView = ({ city, setCity }: SearchViewProps) => {
    const [empty, setEmpty] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <input
                    onChange={e => setCity(e.target.value)}
                    className={styles.cityInput}
                    type="text"
                    placeholder="City"
                    value={city}
                />
                <button
                    onClick={() => {
                        if (city) {
                            navigate('/forecast');
                        } else {
                            setEmpty(true);
                        }
                    }}
                    className={classNames(styles.submit, { [styles.empty]: empty })}
                >
                    Check Weather
                </button>
            </div>
        </div>
    );
};
