export declare type Iweather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: IweatherCurrent;
  minutely: IweatherMinutelyForecast[];
  hourly: IweatherHourlyForecast[];
  daily: IweatherDailyForecast[];
  alerts?: IweatherAlert[]; // Optional since not all responses include alerts
};

export declare type IweatherCurrent = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IweatherCondition[];
};

export declare type IweatherMinutelyForecast = {
  dt: number;
  precipitation: number;
};

export declare type IweatherHourlyForecast = Omit<
  CurrentWeather,
  "sunrise" | "sunset"
> & {
  pop: number; // Probability of precipitation
};

export declare type IweatherDailyForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IweatherCondition[];
  clouds: number;
  pop: number;
  rain?: number; // Optional precipitation volume
  uvi: number;
};

export declare type IweatherAlert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

export declare type IweatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export declare type IweatherRequset = {
  appid: string;
} & Pick<Iweather, "lat" | "lon">;
