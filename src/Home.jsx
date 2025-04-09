import "./App.css";
import FetchWeather from "./FetchWeather.jsx";
import SearchContainer from "./SearchContainer.jsx";
import LoadData from "./LoadData.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchedCities, setSearchedCities] = useState([]);

  const handleCitySearch = (city) => {
    if (city) {
      setSearchedCities((prevCities) => [...prevCities, city]);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings", { replace: true });
  };

  const renderSettings = () => {
    return (
      <div className="menu-icon">
        <img
          width="50"
          height="50"
          src="src\assets\settings-64.ico"
          onClick={handleClick}
        />
      </div>
    );
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
          <SearchContainer handleSetCityToSearch={handleCitySearch} />
          {renderSettings()}
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
