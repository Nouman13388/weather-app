import "./App.css";
import Home from "./Home";
import Settings from "./Settings";
import { useState, useEffect } from "react";

function App() {
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (isPressed) {
            window.history.pushState({}, '', '/settings');
        } else {
            window.history.pushState({}, '', '/');
        }
        console.log("pathName: ",window.location.pathname);
    }, [isPressed]);

    const handleSettings = () => {
        setIsPressed(true);
        console.log("Settings Icon is Pressed");
    };

    const handleBack = () => {
        setIsPressed(false);
        console.log("Back Button is Pressed");
    };

    const renderPages = () => {
        if (!isPressed) {
            return <Home renderSettings={handleSettings} />;
        } else {
            return <Settings renderHome={handleBack} />;
        }
    };

    return renderPages();
}

export default App;