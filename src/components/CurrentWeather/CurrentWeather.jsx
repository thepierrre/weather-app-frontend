import { useContext } from "react";
import DayPartContext from "../../context/day-part-context";
import { imagesLinks } from "../../utils/images/images-links";
import "./CurrentWeather.css";

const CurrentWeather = (props) => {
  const { isNight, setIsNight } = useContext(DayPartContext);
  const { currWeather } = props;

  // Calculate the formatted local time.
  function getLocalTimeFromOffset(offsetInSeconds) {
    const offsetMilliseconds = offsetInSeconds * 1000;
    const adjustedTime =
      Date.now() + offsetMilliseconds + new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(adjustedTime);

    const formattedTime = localDate.toLocaleString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  }

  const localTime = getLocalTimeFromOffset(currWeather.time);

  // Get the current UTC time in the Unix epoch
  const getCurrentUTCTimeInUnixEpoch = () => {
    const currentTimeInMilliseconds = Date.now();
    const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000);
    return currentTimeInSeconds;
  };

  const currentTimeUTC = getCurrentUTCTimeInUnixEpoch();

  const date = new Date();

  const currTime = {
    time: new Date(),
    timezone: currWeather.time,
  };

  const offsetMilliseconds = currTime.timezone ? currTime.timezone * 1000 : 0;

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  const time = isValidDate(localTime) ? localTime : "Saturday 10 AM";

  // Calculate the sunrise in the local time.
  const sunrise = currWeather.sunrise
    ? new Date(
        currWeather.sunrise * 1000 +
          date.getTimezoneOffset() * 60000 +
          offsetMilliseconds
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "05:00 AM";

  // Calculate the sunset in the local time.
  const sunset = currWeather.sunset
    ? new Date(
        currWeather.sunset * 1000 +
          date.getTimezoneOffset() * 60000 +
          offsetMilliseconds
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "09:00 PM";

  if (
    currentTimeUTC > currWeather.sunset ||
    currentTimeUTC < currWeather.sunrise
  ) {
    setIsNight(true);
  } else {
    setIsNight(false);
  }

  // Specify which weather image to use.
  let imgSrc;
  switch (currWeather.main) {
    case "Clouds":
      imgSrc = imagesLinks.cloudy;
      break;
    case "Clear":
      if (isNight === false) {
        imgSrc = imagesLinks.sun;
      } else {
        imgSrc = imagesLinks.moon;
      }
      break;
    case "Snow":
      imgSrc = imagesLinks.snow;
      break;
    case "Drizzle":
    case "Rain":
    case "Squall":
      imgSrc = imagesLinks.rain;
      break;
    case "Haze":
      imgSrc = imagesLinks.haze;
      break;
    case "Mist":
    case "Fog":
      imgSrc = imagesLinks.mist;
      break;
    case "Thunderstorm":
      imgSrc = imagesLinks.thunder;
      break;
    case "Tornado":
      imgSrc = imagesLinks.tornado;
      break;
    case "Smoke":
      imgSrc = imagesLinks.smoke;
      break;
    case "Dust":
    case "Sand":
    case "Ash":
      imgSrc = imagesLinks.dust;
      break;
    default:
      imgSrc = imagesLinks.sun;
      break;
  }

  return (
    <div className="city-container">
      <div className="current-weather-info">
        <div className="current-weather-info__place">
          <h1>
            {currWeather.city || "Dreamcity"},{" "}
            {currWeather.country || "Dreamland"}
          </h1>
          <p>{time}</p>
        </div>
        <div className="current-weather-info__main">
          <p className="current-temperature">
            {Math.floor(currWeather.temp || 24.0)}°C
          </p>
          <p className="current-weather-description">
            {currWeather.main || "Clear"}
          </p>
        </div>
        <div className="current-weather-info__additional">
          <div className="additional_1">
            <p>Wind: {Math.floor(currWeather.wind || 3)} km/h</p>
            <p>Humidity: {Math.floor(currWeather.humidity || 15)}%</p>
          </div>
          <div className="additional_2">
            <p>Pressure: {currWeather.pressure || 1013} hPa</p>
            <p>Feels like: {Math.floor(currWeather.felt || 24)}°C</p>
          </div>
        </div>
        <div className="current-weather-info__day">
          <p className="sunrise">Sunrise: {sunrise} </p>
          <p className="sunset">Sunset: {sunset}</p>
        </div>
      </div>
      <div className="current-weather-image">
        <img src={imgSrc} />
      </div>
    </div>
  );
};

export default CurrentWeather;
