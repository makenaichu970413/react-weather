//? Module
import { format } from "date-fns";

//? Utils
import { FormatCelsius, UUID } from "../function";
import type { Igeo, Iweather, TWeather } from "../models";

export function MapGetWeather(props: {
  data_geo: Igeo;
  data_weather: Iweather;
}): TWeather {
  const { data_geo: geoData, data_weather: wData } = props;

  const state = geoData.state ?? null;
  const country = geoData.name ?? null;
  const arr: string[] = [state, country].filter((item) => item);
  const temperature = wData?.daily?.[0].temp.day ?? null;
  const temperature_max = wData?.daily?.[0].temp.max ?? null;
  const temperature_min = wData?.daily?.[0].temp.min ?? null;

  const temp: TWeather = {
    id: UUID(),
    state,
    country,
    location: arr.join(", "),
    datetime: format(new Date(), "dd-MM-yyyy hh:mm a"),
    temperature: FormatCelsius(temperature),
    temperature_max: FormatCelsius(temperature_max),
    temperature_min: FormatCelsius(temperature_min),
    humidity: wData?.daily?.[0].humidity ?? null,
    description: wData?.current.weather?.[0].main ?? null,
    data_geo: geoData,
    data_weather: wData,
  };

  return temp;
}
