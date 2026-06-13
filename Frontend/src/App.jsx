import TypeAfsprakenList from "./pages/typeAfspraken/TypeAfsprakenList";
import AfsprakenList from "./pages/afspraken/AfsprakenList";
import { themes, useTheme } from "./contexts/Theme.context";
import { IoMoonSharp, IoSunny } from "react-icons/io5";

function App() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
      <button type="button" onClick={toggleTheme}>
        {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
      </button>
      <AfsprakenList />
      <TypeAfsprakenList />
    </div>
  );
}

export default App;
