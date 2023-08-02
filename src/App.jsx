import { useState } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import { useHttpClient } from "./hooks/http-hook";
import Footer from "./components/authorship/Footer";
import "./App.css";

function App() {
  const [enteredCity, setEnteredCity] = useState("");
  const [currWeather, setCurrWeather] = useState({
    city: undefined,
    country: undefined,
    temp: undefined,
    main: "Clear",
    wind: undefined,
    humidity: undefined,
    pressure: undefined,
    felt: undefined,
    time: undefined,
    sunrise: undefined,
    sunset: undefined,
  });

  const { sendRequest } = useHttpClient();

  const cityInputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const getLocation = async () => {
    try {
      const responseData = await sendRequest(
        // "http://3.67.197.173:5005/location"
        "https://weather-app-backend-thepierrre.vercel.app/api/location"
      );
      setEnteredCity(`${responseData.city}, ${responseData.country_name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async () => {
    try {
      const responseData = await sendRequest(
        // `http://3.67.197.173:5005/weather?city=${enteredCity}`,
        `https://weather-app-backend-thepierrre.vercel.app/api/weather?city=${enteredCity}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setCurrWeather({
        city: responseData.name,
        country: responseData.sys.country,
        temp: responseData.main.temp,
        main: responseData.weather[0].main,
        wind: responseData.wind.speed,
        humidity: responseData.main.humidity,
        pressure: responseData.main.pressure,
        felt: responseData.main.feels_like,
        time: responseData.timezone,
        sunrise: responseData.sys.sunrise,
        sunset: responseData.sys.sunset,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <h1 className="main-title">Enter a city name!</h1>
      <SearchBar
        getWeather={getWeather}
        getLocation={getLocation}
        cityInputChangeHandler={cityInputChangeHandler}
        enteredCity={enteredCity}
      />
      <CurrentWeather currWeather={currWeather} />
      <Footer className="footer" />
    </div>
  );
}

export default App;
