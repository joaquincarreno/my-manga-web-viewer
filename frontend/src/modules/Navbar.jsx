import "./Navbar.css";

function Navbar({
  selectedManga = "",
  availableMangas = [],
  mangaSetter = () => {},
  mangaInfo = { n_volumes: 1, pages_per_volume: [1] },
  volume = 1,
  volumeSetter = () => {},
  page = 1,
  pageSetter = () => {},
}) {
  const createHandler = (varName, setter) => {
    return (event) => {
      const value = event.target.value;
      console.log(value);
      setter(value);
      console.log("selected " + varName + ": " + value);
    };
  };
  const createHandlerNumeric = (varName, offset, setter) => {
    return (event) => {
      const value = Number(event.target.value);
      console.log(value);
      setter(value + offset);
      console.log("selected " + varName + ": " + value);
    };
  };
  const createSelector = (currentValue, options, handler) => {
    return (
      <select className="selector" value={currentValue} onChange={handler}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  const page_num = mangaInfo.pages_per_volume[volume];
  const page_array = [...Array(page_num + 1).keys()].slice(1, page_num + 1);
  return (
    <div className="navbar-container">
      {/* manga selector */}
      {createSelector(
        selectedManga,
        availableMangas,
        createHandler("manga", mangaSetter, [])
      )}
      {/* volume selector */}
      {createSelector(
        volume+1,
        [...Array(mangaInfo.n_volumes + 1).keys()].slice(
          1,
          mangaInfo.n_volumes + 1
        ),
        createHandlerNumeric("volume", -1, volumeSetter, [])
      )}
      {/* page selector */}
      {createSelector(
        page+1,
        page_array,
        createHandlerNumeric("page", -1, pageSetter, [])
      )}
    </div>
  );
}
export default Navbar;
