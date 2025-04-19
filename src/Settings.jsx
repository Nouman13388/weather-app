function Settings({ renderHome }) {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the weather data?"
    );
    if (confirmDelete) {
      localStorage.removeItem("weatherData");
      alert("Weather data deleted successfully.");
    }
  };

  return (
    <>
      <button onClick={renderHome}>Back</button>
      <h1>Settings</h1>
      <button onClick={handleDelete}>Delete Data</button>
    </>
  );
}

export default Settings;