//? Module
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { TWeather } from "../../../utils/models";
import { CacheGet, CacheSet } from "../../../utils/cache";

export declare type TStateWeather = {
  current: TWeather | null;
  data: TWeather[];
};

export declare type TActionWeather =
  | { type: "SET_CURRENT"; payload: TWeather }
  | { type: "RESET_CURRENT" }
  | { type: "INSERT"; payload: TWeather }
  | { type: "DELETE"; payload: TWeather }
  | { type: "RESET" };

declare type TWeatherContext = {
  state: TStateWeather;
  dispatch: Dispatch<TActionWeather>;
};

declare type PWeatherProvider = {
  children: ReactNode;
};

const CacheStateWeather = CacheGet<TStateWeather>({ key: "WEATHER" }) ?? null;
const InitialStateWeather: TStateWeather = CacheStateWeather ?? {
  current: null,
  data: [],
};

function ReducerWeather(
  state: TStateWeather,
  action: TActionWeather
): TStateWeather {
  console.log("ReducerWeather: ", { action, state });

  switch (action.type) {
    case "SET_CURRENT":
      return { ...state, current: action.payload };

    case "RESET_CURRENT":
      return { ...state, current: null };

    case "INSERT":
      return { ...state, data: [action.payload, ...state.data] };

    case "DELETE":
      const newData = [...state.data].filter(
        (item) => item.id != action.payload.id
      );
      return { ...state, data: newData };

    case "RESET":
      return { ...state, data: [] };

    default:
      return state;
  }
}

// Create context
const ContextWeather = createContext<TWeatherContext | null>(null);

// Custom hook to use the context
export function useWeather(): TWeatherContext {
  const context = useContext(ContextWeather);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export function WeatherProvider(props: PWeatherProvider) {
  const { children } = props;
  const [state, dispatch] = useReducer(ReducerWeather, InitialStateWeather);

  useEffect(() => {
    CacheSet<TStateWeather>({ key: "WEATHER", value: state });
  }, [JSON.stringify(state)]);

  return (
    <ContextWeather.Provider value={{ state, dispatch }}>
      {children}
    </ContextWeather.Provider>
  );
}

export default WeatherProvider;
