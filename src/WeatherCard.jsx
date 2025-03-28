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
        storeData(data);
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

  const storeData = (data) => {
    setWeatherArray((prevArray) => [
      ...prevArray,
      {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
        feelslike_c: data.current.feelslike_c,
        uv: data.current.uv,
      },
      localStorage.setItem(
        "weatherData",
        JSON.stringify([
          ...prevArray,
          weatherArray
        ]),
      ),
    ]); 
  };

  useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(weatherArray));
    console.log("Saved weatherArray:", weatherArray);
  }, [weatherArray]);

  useEffect(() => {
    const storedData = localStorage.getItem("weatherData");
    if (storedData) {
      setWeatherArray(JSON.parse(storedData));
      console.log("Loaded data from storage:", JSON.parse(storedData));
    }
  }, []);


  const expandCard = (weatherData) => {
    if (!weatherData) return null;
    return (
      <div className="expanded-card">
        <section className="wind">
          Wind: {weatherData.current.wind_kph} km/h
        </section>
        <section className="humidity">
          Humidity: {weatherData.current.humidity}%
        </section>
        <section className="feels-like">
          Feels Like: {parseInt(weatherData.current.feelslike_c)}°C
        </section>
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
      {/*{storeData()}*/}
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
