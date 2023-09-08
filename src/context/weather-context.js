import { createContext } from "react";

const WeatherContext = createContext({
  enteredCity: undefined,
  setEnteredCity: () => {},
  globalWeather: undefined,
  setGlobalWeather: () => {},
  tempUnits: undefined,
  clickedCity: undefined,
  inputError: undefined,
  setInputError: () => {},
  setClickedCity: () => {},
  setTempUnits: () => {},
  clockFormat: undefined,
  setClockFormat: () => {},
  weatherIsFetched: undefined,
  setWeatherIsFetched: () => {},
  getCoordinatesForCityName: () => {},
  getCityNameForCoordinates: () => {},
  getWeatherForCoordinates: () => {},
  getWeatherForEnteredCity: () => {},
  getWeatherForCurrentLocation: () => {},
  cityInputChangeHandler: () => {},
  getLocalTime: () => {},
  getWeatherForClickedCity: () => {},
});

export default WeatherContext;
