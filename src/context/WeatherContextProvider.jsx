import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { DateTime } from "luxon";
import { countries } from "country-data";
import WeatherContext from "./weather-context";

const WeatherContextProvider = (props) => {
  const { children } = props;
  const [enteredCity, setEnteredCity] = useState("");
  const [tempUnits, setTempUnits] = useState("Celsius");
  const [clockFormat, setClockFormat] = useState("12hours");
  const [globalWeather, setGlobalWeather] = useState(undefined);
  const [inputError, setInputError] = useState("");
  const [weatherIsFetched, setWeatherIsFetched] = useState(false);
  const [clickedCity, setClickedCity] = useState(undefined);

  let lat, lon;
  let cityName, countryCode;

  const getCelsiusTemp = (kelvinTemp) => {
    return Math.round(kelvinTemp - 273.15);
  };

  const getFahrenheitTemp = (kelvinTemp) => {
    return Math.round(((kelvinTemp - 273.15) * 9) / 5 + 32);
  };

  const getCoordinatesForCityName = async () => {
    const city = enteredCity;

    try {
      const response = await axios.get(`coordinates?city=${city}`);
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      cityName = response.data[0].name;
      countryCode = response.data[0].country;
      setGlobalWeather((prevState) => {
        return {
          ...prevState,
          city: {
            name: cityName,
            country: countries[countryCode].name,
          },
        };
      });
    } catch (err) {
      setInputError(err.response.data.errorMessage);
    }
  };

  const getCityNameForCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(`city?lat=${lat}&lon=${lon}`);
      const cityName = response.data[0].name;
      const countryCode = response.data[0].country;
      setEnteredCity(`${cityName}, ${countries[countryCode].name}`);
      setGlobalWeather((prevState) => {
        return {
          ...prevState,
          city: {
            name: cityName,
            country: countries[countryCode].name,
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const generateHourlyForecast = (hourlyWeatherData) => {
    const hourlyForecast = {};
    for (let i = 0; i < 25; i++) {
      const index = i + 1;
      hourlyForecast[`plus${index}`] = {
        main: hourlyWeatherData[i].weather[0].main,
        temp: hourlyWeatherData[i].temp,
        celsiusTemp: getCelsiusTemp(hourlyWeatherData[i].temp),
        fahrenheitTemp: getFahrenheitTemp(hourlyWeatherData[i].temp),
        date: hourlyWeatherData[i].dt,
      };
    }
    return hourlyForecast;
  };

  const generateDailyForecast = (dailyWeatherData) => {
    const dailyForecast = {};
    for (let i = 0; i < 8; i++) {
      const index = i + 1;
      dailyForecast[`plus${index}`] = {
        main: dailyWeatherData[i].weather[0].main,
        precipProb: dailyWeatherData[i].pop,
        temp: dailyWeatherData[i].temp.day,
        celsiusTemp: getCelsiusTemp(dailyWeatherData[i].temp.day),
        fahrenheitTemp: getFahrenheitTemp(dailyWeatherData[i].temp.day),
        nightTemp: dailyWeatherData[i].temp.night,
        celsiusNightTemp: getCelsiusTemp(dailyWeatherData[i].temp.night),
        fahrenheitNightTemp: getFahrenheitTemp(dailyWeatherData[i].temp.night),
        sunrise: dailyWeatherData[i].sunrise,
        sunset: dailyWeatherData[i].sunset,
        moonrise: dailyWeatherData[i].moonrise,
        moonset: dailyWeatherData[i].moonset,
        moonPhase: dailyWeatherData[i].moon_phase,
        date: dailyWeatherData[i].dt,
      };
    }
    return dailyForecast;
  };

  const getWeatherForCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(`combined-data?lat=${lat}&lon=${lon}`);
      const currentWeatherData = response.data.weather.current;
      const airQuality = response.data.airQuality.list[0];
      const hourlyWeatherData = response.data.weather.hourly;
      const dailyWeatherData = response.data.weather.daily;
      const timezone = response.data.weather.timezone;

      setGlobalWeather((prevState) => {
        return {
          ...prevState,
          isNight:
            currentWeatherData.dt > currentWeatherData.sunset ||
            currentWeatherData.dt < currentWeatherData.sunrise
              ? true
              : false,
          weather: {
            main: currentWeatherData.weather[0].main,
            temp: currentWeatherData.temp,
            celsiusTemp: getCelsiusTemp(currentWeatherData.temp),
            fahrenheitTemp: getFahrenheitTemp(currentWeatherData.temp),
            wind: currentWeatherData.wind_speed,
            humidity: currentWeatherData.humidity,
            pressure: currentWeatherData.pressure,
            cloudiness: currentWeatherData.clouds,
            uvIndex: currentWeatherData.uvi,
          },
          currTime: currentWeatherData.dt,
          timezone,
          sun: {
            sunrise: currentWeatherData.sunrise,
            sunset: currentWeatherData.sunset,
          },
          airQuality: {
            overall: airQuality.main.aqi,
            components: {
              co: airQuality.components.co,
              so2: airQuality.components.so2,
              no2: airQuality.components.no2,
              o3: airQuality.components.o3,
              pm2_5: airQuality.components.pm2_5,
            },
          },
          hourlyForecast: generateHourlyForecast(hourlyWeatherData),
          dailyForecast: generateDailyForecast(dailyWeatherData),
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getLocalTime = (timeInSeconds, timezone) => {
    const format = clockFormat === "12hours" ? "h:mm a" : "H:mm";
    const time = DateTime.fromSeconds(+timeInSeconds, {
      zone: timezone,
    }).toFormat(format);

    return time;
  };

  const getWeatherForEnteredCity = async () => {
    await getCoordinatesForCityName();
    setEnteredCity(`${cityName}, ${countries[countryCode].name}`);
    await getWeatherForCoordinates(lat, lon);
    setWeatherIsFetched(true);
  };

  const getWeatherForCurrentLocation = async () => {
    setEnteredCity("Fetching my location...");
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getCityNameForCoordinates(lat, lon);
      await getWeatherForCoordinates(lat, lon);
      setWeatherIsFetched(true);
      setInputError("");
    });
  };

  const getWeatherForClickedCity = async (city) => {
    setEnteredCity(city);
    setClickedCity(city);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      await getCoordinatesForCityName();
      setEnteredCity(`${cityName}, ${countries[countryCode].name}`);
      await getWeatherForCoordinates(lat, lon);
      setWeatherIsFetched(true);
    };

    if (enteredCity) {
      fetchWeather();
    }
  }, [clickedCity]);

  return (
    <WeatherContext.Provider
      value={{
        globalWeather,
        setGlobalWeather,
        getWeatherForCurrentLocation,
        getWeatherForEnteredCity,
        enteredCity,
        setEnteredCity,
        tempUnits,
        setTempUnits,
        clockFormat,
        setClockFormat,
        getLocalTime,
        getWeatherForClickedCity,
        weatherIsFetched,
        setWeatherIsFetched,
        inputError,
        setInputError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
