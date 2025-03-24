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

    const inputChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const searchClick = () => {
        setCityToSearch(selectedCity);
    };

    return (
        <section className="search-container">
            <input
                type="text"
                id="search-bar"
                className="search-bar"
                list="suggestions"
                placeholder="City Name..."
                value={selectedCity}
                onChange={inputChange}
            />
            <button
                className="search-button"
                id="search-button"
                onClick={searchClick}
            >
                Search
            </button>
            <datalist id="suggestions">
                {cities.map((city, index) => (
                    <option key={index} value={city} />
                ))}
            </datalist>
        </section>
    );
}

export default SearchContainer;