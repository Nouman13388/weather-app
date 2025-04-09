import WeatherCard from "./WeatherCard";

function LoadData() {
  const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
  return (
    <>
      {storedData.map((data, index) => (
        console.log("Loaded Data: ",data),
        <WeatherCard key={index} weatherData={data} />
      ))}
    </>
  );
}

export default LoadData;
