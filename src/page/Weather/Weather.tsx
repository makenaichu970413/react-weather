//? Component
import { WeatherResult, WeatherSearch } from "./component";

//? Context
import { WeatherProvider } from "./context";

export function Weather() {
  return (
    <>
      <WeatherProvider>
        <WeatherSearch />

        <WeatherResult />
      </WeatherProvider>
    </>
  );
}

export default Weather;
