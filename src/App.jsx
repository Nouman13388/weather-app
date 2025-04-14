import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Settings from "./Settings";

function App() {

  const [isPressed, setIsPressed] = useState(false);

  const handleSettings = () => {
    setIsPressed(true)
    console.log("Settings Button is Pressed");
  }

  const handleBack = () => {
    setIsPressed(false)
    console.log("Back Button is Pressed");
  }

  const renderPages = () => {
    if(!isPressed)
      return <Home renderSettings={handleSettings}/>  
    else
      return <Settings renderHome={handleBack}/>
  }

  return (
    renderPages()
  );
}

export default App;
