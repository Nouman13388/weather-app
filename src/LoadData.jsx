import { useState } from "react";
import WeatherCard from "./WeatherCard";

function LoadData() {
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("weatherData")) || []
  );

  const handleDelete = (indexToDel) => {
    const updatedData = storedData.filter((data, index) => index !== indexToDel);
    console.log("Data After Deletion\n", updatedData)
    localStorage.setItem("weatherData", JSON.stringify(updatedData));
    setStoredData(updatedData);
  };

  return (
    <>
      {storedData.map((data, index) => (
        <WeatherCard key={index} weatherData={data} onDelete={() => handleDelete(index)} />
      ))}
    </>
  );
}

export default LoadData;
