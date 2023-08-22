import axios from "axios";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DayPartContextProvider from "./DayPartContextProvider";
import Footer from "./components/authorship/Footer";
import "./App.css";

function App() {
  const [enteredCity, setEnteredCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
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

  const cityInputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const getLocation = () => {
    setIsLoading(true);
    setEnteredCity("Fetching the city...");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axios.post(
            // "https://get-my-current-weather-e1a1907797e1.herokuapp.com/location",
            "http://localhost:5001/location",
            {
              lat,
              lon,
            }
          );
          setEnteredCity(response.data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        // `https://get-my-current-weather-e1a1907797e1.herokuapp.com/weather?city=${enteredCity}`
        `http://localhost:5001/weather?city=${enteredCity}`
      );
      setCurrWeather({
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        main: response.data.weather[0].main,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        felt: response.data.main.feels_like,
        time: response.data.timezone,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
      });
      setInputError(undefined);
    } catch (err) {
      const inputErr = err.response.data.errorMessage;
      setInputError(inputErr);
    }
  };

  return (
    <div className="app">
      <h1 className="main-title">Get my current weather</h1>
      <SearchBar
        getWeather={getWeather}
        getLocation={getLocation}
        cityInputChangeHandler={cityInputChangeHandler}
        enteredCity={enteredCity}
      />
      {inputError && <p className="input-error">{inputError}</p>}
      <DayPartContextProvider
        sunrise={currWeather.sunrise}
        sunset={currWeather.sunset}
      >
        <CurrentWeather currWeather={currWeather} />
      </DayPartContextProvider>

      <Footer className="footer" />
    </div>
  );
}

export default App;
