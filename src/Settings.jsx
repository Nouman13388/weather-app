import { useNavigate } from "react-router-dom";

function Settings() {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the weather data?"
    );
    if (confirmDelete) {
      localStorage.removeItem("weatherData");
      alert("Weather data deleted successfully.");
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { replace: true });
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
