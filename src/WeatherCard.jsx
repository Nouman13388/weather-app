import { useState } from "react";

function WeatherCard({ weatherData, onDelete }) {
  const [isHovered, setHovered] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    setHovered(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  const renderWeatherCard = () => {
    return (
      <div
        className="weather-card"
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
        />
        <div className="temperature">
          {parseInt(weatherData.current.temp_c)} °C
        </div>
        <div className="description">{weatherData.current.condition.text}</div>
        <div className="location">
          {weatherData.location.name}, {weatherData.location.region}
        </div>
        {isHovered && isExpanded && expandCard(weatherData)}
      </div>
    );
  };

  const expandCard = (data) => {
    if (!data || !data.current) return null;
    return (
      <div className="expanded-card">
        <section className="wind">Wind: {data.current.wind_kph} km/h</section>
        <section className="humidity">
          Humidity: {data.current.humidity}%
        </section>
        <section className="feels-like">
          Feels Like: {parseInt(data.current.feelslike_c)}°C
        </section>
        <section className="uv">UV: {data.current.uv}</section>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  };

  if (!weatherData) {
    return <div className="weather-card">Loading weather data...</div>;
  }

  return renderWeatherCard();
}

export default WeatherCard;
