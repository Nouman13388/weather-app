
function Settings({renderHome}) {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the weather data?"
    );
    if (confirmDelete) {
      localStorage.removeItem("weatherData");
      alert("Weather data deleted successfully.");
    }
  };

  const handleBack = () => {
    return renderHome()
  };

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <h1>Settings</h1>
      <button onClick={handleDelete}>Delete Data</button>
    </>
  );
}

export default Settings;
