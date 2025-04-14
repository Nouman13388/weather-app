import WeatherCard from "./WeatherCard";
import { useState } from "react";

function LoadData() {
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("weatherData")) || []
  );


  console.log(storedData);
  const handleDelete = (indexToDel) => {
    const updatedData = storedData.filter((_, index) => index !== indexToDel);
    localStorage.setItem("weatherData", JSON.stringify(updatedData));
    setStoredData(updatedData);
  };


  return (
    <>
      {storedData.map((data, index) => (
        <WeatherCard
          key={index}
          weatherData={data}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </>
  );
}

export default LoadData;
