import { useEffect, useState } from "react";

function WeatherCard({ city }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (!city) return;

        const key = "f527ddffd52e46f286372143250703";
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.error("Error fetching weather data:", error));
    }, [city]);

    if (!weatherData) {
        return <div className="weather-card">Loading weather data...</div>;
    }

    return (
        <div className="weather-card">
            <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
            />
            <div className="temperature">{weatherData.current.temp_c} °C</div>
            <div className="description">{weatherData.current.condition.text}</div>
            <div className="location">
                {weatherData.location.name}, {weatherData.location.region}
            </div>
        </div>
    );
}

export default WeatherCard;