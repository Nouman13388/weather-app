import React, { useState, useEffect } from "react";

function SearchContainer({ setCityToSearch }) {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        fetch("src/cities.json")
            .then((response) => response.json())
            .then((data) => {
                setCities(data.cities);
            })
            .catch((error) => {
                console.error("Error loading city data:", error);
            });
    }, []);

    const handleChange = (e) => {
        setSelectedCity(e.target.value);
    }

    const handleClick = () => {
        setCityToSearch(selectedCity);
    }

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