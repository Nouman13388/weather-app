import "./App.css";
import Home from "./components/Home";
import Settings from "./components/Settings";
import { useEffect, useState } from "react";

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const renderPage = () => {
    if (route === "/settings") {
      return <Settings renderHome={() => navigate("/")} />;
    }
    return <Home renderSettings={() => navigate("/settings")} />;
  };

  return <>{renderPage()}</>;
}

export default App;
