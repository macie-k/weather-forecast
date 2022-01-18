import { useEffect, useState } from 'react';
import { Routes, Route, Link, Router } from 'react-router-dom';

import { SearchView } from './views/SearchView/SearchView';
import { ForecastView } from './views/ForecastView/ForecastView';

function App() {
    const [city, setCity] = useState('');

    return (
        <div className={'main-container'}>
            <Routes>
                <Route path="/" element={<SearchView city={city} setCity={setCity} />} />
                <Route path="/forecast" element={<ForecastView city={city} />} />
            </Routes>
        </div>
    );
}

export default App;
