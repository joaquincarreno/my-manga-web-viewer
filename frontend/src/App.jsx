import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

const BACKEND_IP = "http://0.0.0.0:8000/";
// const BACKEND_IP = "http://192.172.100.17:8000/";
const MANGAS_API = BACKEND_IP + "availableMangas/";
const VOLUMES_API = BACKEND_IP + "availableVolumes/";
const PAGES_API = BACKEND_IP + "getPage/";

function App() {
  const [image, setImage] = useState([]);
  const [imagesReady, setImagesReady] = useState(false);

  const [manga, setManga] = useState("Inside Mari");
  const [volume, setVolume] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(PAGES_API + manga + "/" + volume + "/" + page)
      .then((response) => {
        setImage(response.data.page);
      })
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
