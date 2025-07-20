import type { VValid } from "./Fvalid";
import type { Igeo } from "./Igeo";
import type { Iweather } from "./Iweather";

export declare type TWeather = {
  id: string;
  location: string;
  state: string | null;
  country: string | null;
  datetime: string;
  temperature: number | null;
  temperature_max: number | null;
  temperature_min: number | null;
  humidity: number | null;
  description: string | null;
  data_weather: Iweather | null;
  data_geo: Igeo | null;
};

export declare type FWeatherSearch = {
  country?: string | null;
  city?: string | null;
};

export declare type VWeatherSearch = VValid<FWeatherSearch>;
