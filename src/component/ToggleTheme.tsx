//? Context
import { useTheme } from "../context";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={() =>
          setTheme((prev) => (prev === "LIGHT" ? "DARK" : "LIGHT"))
        }
        checked={theme === "LIGHT"}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <i className="bx bx-sun"></i>
        <i className="bx bx-moon"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
}

export default ToggleTheme;
