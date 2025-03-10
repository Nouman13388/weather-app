import React, { useState } from 'react';
import './App.css';

function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');


  const getWeather = async () => {

    const key = 'f527ddffd52e46f286372143250703';
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('data:', data);
      console.log('current data: ',data.current);

      if (data && data.current) {
        setWeather({
          temp: `${data.current.temp_c}°C`,
          description: data.current.condition.text,
          location: `${data.location.name}, ${data.location.region}`,
          icon: data.current.condition.icon,
        });
      } else {
        console.error('No data found.');
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  function renderWeather() {
    if (weather) {
      return (
        <div className="weather-container">
          <div className="weather-icon">
            <img id="weather-icon" src={weather.icon} alt={weather.description} />
          </div>
          <div className="temperature-value">
            <p>{weather.temp}</p>
          </div>
          <div className="temperature-description">
            <p>{weather.description}</p>
          </div>
          <div className="location">
            <p>{weather.location}</p>
          </div>
        </div>
      );
    } else {
      return <p>Enter a city to see the weather.</p>;
    }
  }

  return (
    <div className="container">
      <div className="weather-container">
        {renderWeather()}
      </div>

      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          className="search-bar"
          placeholder="City Name....."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={getWeather}>
          Search
        </button>
      </div>

    </div>
  );
}

export default Home