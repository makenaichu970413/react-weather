//? Context
import { useWeather } from "../context";

//? Utils
import { ICON } from "../../../utils/constant";
import type { TWeather } from "../../../utils/models";
import { useWeatherSearch } from "../hook";
import { useLoading } from "../../../context";

function WeatherIcon() {
  return (
    <>
      <div className="weather-icon">
        <img src={ICON["SUN"]} alt="Sun" />
      </div>
    </>
  );
}

function WeatherInfo() {
  const {
    state: { current },
  } = useWeather();

  if (!current) return;
  return (
    <>
      <WeatherIcon />

      <div className="weather-info">
        <div className="weather-text">
          <h2>Today's Weather</h2>
          <div className="temperature">{current.temperature}°</div>
          <div className="high-low">
            H: {current.temperature_max}° L: {current.temperature_min}°
          </div>
          <div className="location">{current.location}</div>
        </div>

        <div className="weather-details">
          <div className="detail datetime">
            <div className="detail-label">{current.datetime}</div>
          </div>

          <div className="detail humidity">
            <span className="detail-label">Humidity:</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
          <div className="detail clouds">
            <span className="detail-label">{current.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}

type PWeatherHistoryItem = { data: TWeather; index: number };

function WeatherHistoryItem(props: PWeatherHistoryItem) {
  const { data: pData, index } = props;
  const { showLoading, hideLoading } = useLoading();
  const { dispatch } = useWeather();
  const onWeatherSearch = useWeatherSearch();

  const onDelete = () => {
    dispatch({ type: "DELETE", payload: pData });
  };

  const onSearch = async () => {
    const location = pData.location;

    showLoading();
    const res = await onWeatherSearch({ location });
    hideLoading();

    if (res.error) {
    } else if (res.result) {
      const payload = res.result;
      dispatch({ type: "SET_CURRENT", payload });
      dispatch({ type: "INSERT", payload });
    }
  };

  return (
    <>
      <div key={index} className="history-item">
        <div className="history-detail">
          <div className="history-location">{pData.location}</div>

          <div className="history-date">{pData.datetime}</div>
        </div>

        <div className="history-actions">
          <button className="action-button search" onClick={() => onSearch()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.71 20.29l-5.4-5.4a8 8 0 10-1.41 1.41l5.4 5.4a1 1 0 001.41-1.41zM4 10a6 6 0 116 6 6 6 0 01-6-6z" />
            </svg>
          </button>

          <button className="action-button delete" onClick={() => onDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function WeatherHistory() {
  const { state } = useWeather();
  const { data } = state;

  if (!data.length) return <></>;
  return (
    <>
      {/* Search history section below the weather display */}
      <div className="history-container">
        <h3>Search History</h3>

        <div className="history-items">
          {data.map((item, index) => (
            <WeatherHistoryItem data={item} index={index} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export function WeatherResult() {
  const { state } = useWeather();
  const { data, current } = state;

  if (!data.length && !current) return <></>;
  return (
    <>
      {/* Main weather app container */}
      <div className="result-container">
        <WeatherInfo />

        <WeatherHistory />
      </div>
    </>
  );
}

export default WeatherResult;
