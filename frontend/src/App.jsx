import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./modules/Navbar";

import axios from "axios";

// import memory from "./memory.json";

// const BACKEND_IP = "http://0.0.0.0:8000/";
const BACKEND_IP = "http://192.168.100.17:8000/";
const MANGAS_API = BACKEND_IP + "availableMangas/";
const LAST_SESION_API = BACKEND_IP + "lastSesion";
const MANGA_INFO_API = BACKEND_IP + "getMangaInfo/";
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

  const [manga, setManga] = useState("");
  const [availableMangas, setAvailableMangas] = useState([]);
  const [mangaInfo, setMangaInfo] = useState({
    n_volumes: 1,
    pages_per_volume: [1],
  });
  const [volume, setVolume] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    Promise.all([axios.get(MANGAS_API), axios.get(LAST_SESION_API)]).then(
      (res) => {
        console.log(res);
        console.log(res[0]);
        console.log(res[1]);

        setAvailableMangas(res[0].data);
        setManga(res[1].data.manga);
        setVolume(res[1].data.volume);
        setPage(res[1].data.page);
      }
    );
  }, []);

  useEffect(() => {
    if (manga != "")
      axios
        .get(PAGES_API + manga + "/" + volume + "/" + page)
        .then((response) => {
          setImage(response.data.page);
        })
        .catch(errorCatcher);
  }, [page, volume, manga]);

  useEffect(() => {
    if (manga != "")
      axios
        .get(MANGA_INFO_API + manga)
        .then((response) => {
          setMangaInfo(response.data);
        })
        .catch(errorCatcher);
  }, [manga]);

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const nextPage = () => {
    if (page < mangaInfo.pages_per_volume[volume]) setPage(page + 1);
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
    <div className="page-wrapper">
      <Navbar
        selectedManga={manga}
        mangaSetter={setManga}
        availableMangas={availableMangas}
        mangaInfo={mangaInfo}
        volume={volume}
        volumeSetter={setVolume}
        page={page}
        pageSetter={setPage}
      />
      <div className="img-container">
        <img
          src={`data:image/png;base64, ${image}`}
          className="center-fit"
          onClick={processClick}
        ></img>
      </div>
      <Navbar
        selectedManga={manga}
        mangaSetter={setManga}
        availableMangas={availableMangas}
        mangaInfo={mangaInfo}
        volume={volume}
        volumeSetter={setVolume}
        page={page}
        pageSetter={setPage}
      />
    </div>
  );
}

export default App;
