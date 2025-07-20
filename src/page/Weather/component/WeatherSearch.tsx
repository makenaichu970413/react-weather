//? Module
import { useState } from "react";
import { omit as _omit } from "lodash-es";

//? Context & Hook
import { useLoading, useModal } from "../../../context";
import { useWeather } from "../context";
import { useWeatherSearch } from "../hook/";

//? Utils
import type { FWeatherSearch, VWeatherSearch } from "../../../utils/models";
import { INIT_SEARCH_COUNTRY } from "../../../utils/constant";
import { ValidateAT } from "../../../utils/function";
import { ValidWeather } from "../../../utils/validation/ValidWeather";
import { Modal } from "../../../component";
import { useOnceEffect } from "../../../hook";

export function WeatherSearch() {
  const [search, setSearch] = useState<FWeatherSearch>({});
  const [error, setError] = useState<VWeatherSearch>({});

  const { showLoading, hideLoading } = useLoading();
  const { setModal } = useModal();
  const { dispatch } = useWeather();
  const onWeatherSearch = useWeatherSearch();

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isError = Object.keys(error).length ? true : false;

      console.log("onSearch: ", { error, isError });

      if (isError) throw Error("Please check your search input.");

      const arr = [search?.country ?? null, search?.city ?? null].filter(
        (item) => item
      ) as string[];

      if (!arr.length) throw Error("Please input your form.");

      const location = arr.join(",");
      onAPISearch(location);
    } catch (err) {
      setModal({ open: true, isError: true, message: `${err}` });
    }
  };

  const onClear = (e: React.FormEvent) => {
    e.stopPropagation();
    setSearch({});
    setError({});
  };

  const onAPISearch = async (location: string) => {
    showLoading();
    const res = await onWeatherSearch({ location });
    hideLoading();

    if (res.error) {
      setModal({ open: true, isError: true, message: `${res.error}` });
    } else if (res.result) {
      const payload = res.result;
      dispatch({ type: "SET_CURRENT", payload });
      dispatch({ type: "INSERT", payload });
      setSearch({});
    }
  };

  useOnceEffect(() => {
    if (INIT_SEARCH_COUNTRY) onAPISearch(INIT_SEARCH_COUNTRY);
  }, [INIT_SEARCH_COUNTRY]);

  return (
    <>
      <Modal />

      {/* Search bar outside the main weather app box */}
      <form onSubmit={onSearch} className="search-container">
        <div className="search-input-ctrl">
          <div className="search-input">
            <span className="label">Country</span>
            <input
              type="text"
              value={search?.country ?? ""}
              onChange={async (e) => {
                const value = e.target.value;
                const newData: FWeatherSearch = { ...search, country: value };
                setSearch(newData);
                const error = await ValidateAT<VWeatherSearch, FWeatherSearch>({
                  key: "country",
                  validation: ValidWeather(),
                  data: newData,
                });
                setError((prev) => {
                  let temp = { ...prev };
                  if (error) temp["country"] = error;
                  else temp = _omit(temp, "country");
                  return temp;
                });
              }}
              placeholder={INIT_SEARCH_COUNTRY}
            />
          </div>
          {error?.country && (
            <span className="search-invalid">{error.country}</span>
          )}
        </div>

        <div className="search-input-ctrl">
          <div className="search-input">
            <span className="label">City</span>
            <input
              type="text"
              value={search?.city ?? ""}
              onChange={async (e) => {
                const value = e.target.value;
                const newData: FWeatherSearch = { ...search, city: value };
                setSearch(newData);
                const error = await ValidateAT<VWeatherSearch, FWeatherSearch>({
                  key: "city",
                  validation: ValidWeather(),
                  data: newData,
                });
                setError((prev) => {
                  let temp = { ...prev };
                  if (error) temp["city"] = error;
                  else temp = _omit(temp, "city");
                  return temp;
                });
              }}
            />
          </div>
          {error?.city && <span className="search-invalid">{error.city}</span>}
        </div>

        <div className="search-buttons">
          <button type="submit" className="button">
            <i className="bx  bx-search"></i>
          </button>

          <button type="button" className="button clear" onClick={onClear}>
            <i className="bx  bx-trash"></i>
          </button>
        </div>
      </form>
    </>
  );
}

export default WeatherSearch;
