import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { SearchView } from './views/SearchView/SearchView';
import { ForecastView } from './views/ForecastView/ForecastView';
import { Container } from './components/Container/Container';

function App() {
    const [city, setCity] = useState('');
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                <Container>
                    <Routes location={location}>
                        <Route path="/" element={<SearchView city={city} setCity={setCity} />} />
                        <Route path="/forecast" element={<ForecastView city={city} />} />
                    </Routes>
                </Container>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;
