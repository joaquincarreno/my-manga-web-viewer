import { useState } from "react";
// import listFiles from "list-files";
import portada from "./mangas/Inside Mari/V01/00.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // console.log(listFiles());
  return (
    <div className="img-container">
      <img src={portada} className="center-fit"></img>
    </div>
  );
}

export default App;
