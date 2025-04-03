import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

function FetchWeather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherArray, setWeatherArray] = useState([]);

  const FetchWeather = (city) => {
    const key = "f527ddffd52e46f286372143250703";
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.current) {
          setWeatherData(data);
          setWeatherArray((prevArray) => [...prevArray, data]);
        } else {
          console.error("Weather data could not be fetched. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  };

  const storeDataLocally = (data) => {
    const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
    storedData.push(data);
    localStorage.setItem("weatherData", JSON.stringify(storedData));
  };

  useEffect(() => {
    if (city) {
      FetchWeather(city);
    }
  }, [city]);

  useEffect(() => {
    if (weatherArray.length > 0) {
      storeDataLocally(weatherArray[weatherArray.length - 1]);
      console.log(
        "Weather data stored locally:",
        weatherArray[weatherArray.length - 1]
      );
    }
  }, [weatherArray]);

  return <WeatherCard weatherData={weatherData} />;
}

export default FetchWeather;
