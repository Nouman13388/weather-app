import { useEffect, useState } from "react";

function WeatherCard({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherArray, setWeatherArray] = useState([]);
  const [isHovered, setHovered] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("weatherData");
    if (storedData) {
      try {
        setWeatherArray(JSON.parse(storedData));
        console.log("Loaded weather data from storage.");
      } catch (err) {
        console.error("Error parsing weather data:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(weatherArray));
    console.log("Saved weatherArray:", weatherArray);
  }, [weatherArray]);

  const fetchWeather = (city) => {
    const key = "f527ddffd52e46f286372143250703";
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.current) {
          setWeatherData(data);
          setWeatherArray((prevArray) => [...prevArray, data]);
          console.log("Weather data stored successfully.");
        } else {
          console.error("Weather data could not be fetched. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleMouseEnter = () => {
    setHovered(true);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    setHovered(false);
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
}

export default WeatherCard;
