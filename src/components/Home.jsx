import { useState } from "react";
import SearchContainer from './SearchContainer';
import LoadData from './LoadData';
import FetchWeather from './FetchWeather';

function Home({ renderSettings }) {
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
        <div className="search-container">
          <SearchContainer setCityToSearch={handleCitySearch} />
          <img
            src="src/assets/settings-64.ico"
            alt="Settings Icon"
            className="settings-icon"
            onClick={renderSettings}
          />
        </div>
      </nav>

      <section className="weather-container">
        <LoadData />
        {searchedCities.map((city, index) => (
          <FetchWeather key={index} city={city} />
        ))}
      </section>
    </section>
  );
}

export default Home;