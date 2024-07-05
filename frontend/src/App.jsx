import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

const BACKEND_IP = "http://0.0.0.0:8000/";
// const BACKEND_IP = "http://192.172.100.17:8000/";
const MANGAS_API = BACKEND_IP + "availableMangas/";
const VOLUMES_API = BACKEND_IP + "availableVolumes/";
const PAGES_API = BACKEND_IP + "getPage/";

const errorCatcher = (error) => {
  if (error.response) {
    // La respuesta fue hecha y el servidor respondió con un código de estado
    // que esta fuera del rango de 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log("no answer");
    // La petición fue hecha pero no se recibió respuesta
    // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
    // http.ClientRequest en node.js
    console.log(error.request);
  } else {
    // Algo paso al preparar la petición que lanzo un Error
    console.log("Error", error.message);
  }
  console.log(error.config);
};

function App() {
  const [image, setImage] = useState([]);
  const [imagesReady, setImagesReady] = useState(false);

  const [manga, setManga] = useState("Inside Mari");
  const [volume, setVolume] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("ohla");
    // PAGES_API + "Inside Mari/0";
    axios
      .get(PAGES_API + manga + "/" + volume + "/" + page)
      .then((response) => {
        setImage(response.data.page);
      })
      .catch(errorCatcher);
  }, [page, volume]);

  const prevPage = () => {
    setPage(page - 1);
    return;
  };
  const nextPage = () => {
    setPage(page + 1);
    return;
  };

  const processClick = (target) => {
    const rect = target.currentTarget.getBoundingClientRect();
    const normX = target.clientX / rect.width;

    if (normX < 0.5) {
      console.log("prev page");
      prevPage();
    } else if (normX >= 0.5) {
      console.log("next page");
      nextPage();
    }
  };

  return (
    <div className="img-container">
      {imagesReady ? (
        "hola"
      ) : (
        <img
          src={`data:image/png;base64, ${image}`}
          className="center-fit"
          onClick={processClick}
        ></img>
      )}
    </div>
  );
}

export default App;
