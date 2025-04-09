import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

function FetchWeather({ city }) {
  const [weatherArray, setWeatherArray] = useState([]);

  const fetchWeatherData = async (city) => {
    const key = "f527ddffd52e46f286372143250703";
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherArray((prevArray) => [...prevArray, data]);
    } catch (error) {
      console.error("Error Fetching data:", error);
    }
  };

  const storeDataLocally = (data) => {
    const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
    storedData.push(data);
    localStorage.setItem("weatherData", JSON.stringify(storedData));
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  useEffect(() => {
    if (weatherArray.length > 0) {
      storeDataLocally(weatherArray[weatherArray.length - 1]);
      console.log("Weather data stored locally:");
    }
  }, [weatherArray]);

  return (
    <>
      <WeatherCard weatherData={weatherArray[weatherArray.length - 1]} />
    </>
  );
}

export default FetchWeather;
