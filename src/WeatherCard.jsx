import { useEffect, useState } from "react";

function WeatherCard({ city }) {

    const [weatherData, setWeatherData] = useState(null);
    const [isHovered, setHovered] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [weatherArray, setWeatherArray] = useState([]);

    useEffect(() => {
        if (!city) return;

        const key = "f527ddffd52e46f286372143250703";
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => console.error("Error fetching weather data:", error));
    }, [city]);

    const handleMouseEnter = () => {
        setHovered(true);
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
        setHovered(false);
    };

    const expandCard = (weatherData) => {
        if (!weatherData) return null;
        return (
            <div className="expanded-card">
                <section className="wind">Wind: {weatherData.current.wind_kph} km/h</section>
                <section className="humidity">Humidity: {weatherData.current.humidity}%</section>
                <section className="feels-like">Feels Like: {parseInt(weatherData.current.feelslike_c)}°C</section>
                <section className="uv">UV: {weatherData.current.uv}</section>
            </div>
        );
    };



    if (!weatherData) {
        return <div className="weather-card">Loading weather data...</div>;
    }


    return (
    <div
            className="weather-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
            />
            <div className="temperature">{parseInt(weatherData.current.temp_c)} °C</div>
            <div className="description">{weatherData.current.condition.text}</div>
            <div className="location">
                {weatherData.location.name}, {weatherData.location.region}
            </div>
            {isHovered && isExpanded && expandCard(weatherData)}
        </div>
    );
}

export default WeatherCard;
