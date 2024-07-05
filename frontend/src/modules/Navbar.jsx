function Navbar({
  selectedManga = "",
  availableMangas = [],
  mangaSetter = () => {},
  mangaInfo = { n_volumes: 0, pages_per_volume: [] },
  volume = 1,
  volumeSetter = () => {},
  page = 1,
  pageSetter = () => {},
}) {
  const createSelector = (currentValue, options, handler) => {
    return (
      <select value={currentValue} onChange={handler}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div>
      {/* manga selector */}
      {createSelector(selectedManga, availableMangas, (target) =>
        console.log(target.value)
      )}
      {/* volume selector */}
      <select></select>
      {/* page selector */}
      <select></select>
    </div>
  );
}
export default Navbar;
