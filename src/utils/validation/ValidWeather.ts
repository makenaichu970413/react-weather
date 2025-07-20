//? Module
import { string as yupString } from "yup";

//? Utils
import type { VWeatherSearch } from "../models";
import { error } from "../error";

function REGEXP(value: string, regexp: RegExp): boolean {
  const max = 50;
  if (value.length > max) return false;
  const result = `${value}`.match(regexp);
  return result ? true : false;
}

export function ValidName(value: string): boolean {
  const regexp = /^[a-zA-Z\s\-']+$/;
  return REGEXP(value, regexp);
}

export function ValidWeather(): VWeatherSearch {
  return {
    country: yupString()
      .test({
        message: error.country.format,
        test: (value) => (value ? ValidName(value) : true),
      })
      .nullable(),

    city: yupString()
      .test({
        message: error.city.format,
        test: (value) => (value ? ValidName(value) : true),
      })
      .nullable(),
  };
}
