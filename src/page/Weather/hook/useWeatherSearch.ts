//? Utils
import { GET } from "../../../utils/api";
import type {
  Igeo,
  IgeoRequset,
  Iweather,
  IweatherRequset,
  TWeather,
} from "../../../utils/models";
import { API_KEY } from "../../../utils/constant";
import { MapGetWeather } from "../../../utils/map";

declare type PUseWeatherSearch = {
  location: string;
};

declare type TUseWeatherSearch = {
  error: string | null;
  result: TWeather | null;
};

export function useWeatherSearch() {
  const CB = async (props: PUseWeatherSearch): Promise<TUseWeatherSearch> => {
    const { location } = props;
    const temp: TUseWeatherSearch = { error: null, result: null };

    try {
      const geoParams: IgeoRequset = { q: location, appid: API_KEY };
      const geoRes = await GET<typeof geoParams, Igeo[]>({
        domain: "WEATHER",
        endpoint: "geo/1.0/direct",
        params: geoParams,
      });
      if (geoRes.error) throw geoRes.error;
      const geoData = geoRes.result?.[0] ?? null;
      if (!geoData) throw Error("Geometric Not Found !");
      const wParams: IweatherRequset = {
        lon: geoData.lon,
        lat: geoData.lat,
        appid: API_KEY,
      };
      const wRes = await GET<typeof wParams, Iweather>({
        domain: "WEATHER",
        endpoint: "data/3.0/onecall",
        params: wParams,
      });
      if (wRes.error) throw wRes.error;
      const wData = wRes.result ?? null;
      if (!wData) throw Error("Weather Not Found !");

      //? Maping to Frontend
      const data = MapGetWeather({ data_geo: geoData, data_weather: wData });
      temp["result"] = data;
    } catch (err) {
      console.log("onSearch ERROR: ", err);
      temp["error"] = `${err}`;
    }

    return temp;
  };

  return CB;
}

export default useWeatherSearch;
