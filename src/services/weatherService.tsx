const API_KEY = '50ca162c11794e82bbaaf6a9239ed53e';

const weatherEndpoint = (city: string) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const onecallEndpoint = (lat: number, lon: number) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`;

interface WeatherEndpointResponse {
    // we dont care about other data
    coord: {
        lon: number;
        lat: number;
    };
    name: string;
    message: string;
}

interface OnecallEndpointResponse {
    // we dont care about other data
    current: {
        temp: number;
        humidity: number;
        clouds: number;
        wind_speed: number;
        weather: Array<{
            description: string;
            icon: string;
        }>;
    };
    daily: Array<{
        dt: number;
        temp: {
            day: number;
        };
        weather: Array<{
            icon: string;
        }>;
    }>;
    message: string;
}

export interface WeatherData {
    cityName: string;
    current: {
        temp: number;
        humidity: number;
        clouds: number;
        windSpeed: number;
        weatherIcon: string;
        description: string;
    };
    nextDays: Array<{
        timestamp: number;
        temp: number;
        weatherIcon: string;
    }>;
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
    const weatherResponse = await fetch(weatherEndpoint(city));
    const weatherData: WeatherEndpointResponse = await weatherResponse.json();

    if (!weatherResponse.ok) {
        throw new Error(weatherData.message);
    }

    const onecallResponse = await fetch(
        onecallEndpoint(weatherData.coord.lat, weatherData.coord.lon)
    );
    const onecallData: OnecallEndpointResponse = await onecallResponse.json();

    if (!onecallResponse.ok) {
        throw new Error(onecallData.message);
    }

    return {
        cityName: weatherData.name,
        current: {
            temp: Math.round(onecallData.current.temp),
            humidity: onecallData.current.humidity,
            clouds: onecallData.current.clouds,
            windSpeed: onecallData.current.wind_speed,
            weatherIcon: onecallData.current.weather[0].icon,
            description: onecallData.current.weather[0].description,
        },
        nextDays: onecallData.daily.slice(1, 6).map(entry => ({
            temp: Math.round(entry.temp.day),
            weatherIcon: entry.weather[0].icon,
            timestamp: entry.dt,
        })),
    };
};
