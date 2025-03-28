import "./App.css";
import SearchContainer from "./SearchContainer.jsx";
import WeatherCard from "./WeatherCard.jsx";
import { useState } from "react";

function Home() {
  const [searchedCities, setSearchedCities] = useState([]);

  const handleCitySearch = (city) => {
    if (city) {
      setSearchedCities((prevCities) => [...prevCities, city]);
    }
  };

  return (
    <section className="container">
      <nav className="navbar">
        <div className="logo-container">
          <img
            className="logo"
            src="https://img.icons8.com/material/96/FFFFFF/night-wind-.png"
            alt="night-wind"
          />
          <h1>Weather App</h1>
        </div>
        <SearchContainer setCityToSearch={handleCitySearch} />
      </nav>

      <section className="weather-container">
        {searchedCities.map((city, index) => (
          <WeatherCard key={index} city={city} />
        ))}
      </section>
    </section>
  );
}

export default Home;