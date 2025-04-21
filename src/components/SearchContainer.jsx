import React, { useState, useEffect } from "react";

function SearchContainer({ setCityToSearch }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch("src/data/cities.json");
      const loadedData = await response.json();
      setCities(loadedData.cities);``
    } catch (error) {
      console.error("Error loading Local Data: ", error);
    }
  };

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleClick = () => {
    setCityToSearch(selectedCity);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="search-container">
      <datalist id="suggestions">
        {cities.map((city, index) => (
          <option key={index} value={city} />
        ))}
      </datalist>
      <input
        type="text"
        id="search-bar"
        className="search-bar"
        list="suggestions"
        placeholder="City Name..."
        value={selectedCity}
        onChange={handleChange}
      />
      <button
        className="search-button"
        id="search-button"
        onClick={handleClick}
      >
        Search
      </button>
    </section>
  );
}

export default SearchContainer;
