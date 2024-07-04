import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import portada from "./mangas/Inside Mari/V01/00.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="img-container">
      <img src={portada} className="center-fit"></img>
    </div>
  );
}

export default App;
