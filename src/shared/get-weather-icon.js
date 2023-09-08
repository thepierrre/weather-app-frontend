import {
  WiFog,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloudy,
  WiThunderstorm,
  WiTornado,
  WiSmog,
  WiDust,
  WiNightClear,
} from "react-icons/wi";

const getWeatherIcon = (main, isNight) => {
  switch (main) {
    case "Clouds":
      return WiCloudy;
    case "Clear":
      if (isNight === true) {
        return WiNightClear;
      } else {
        return WiDaySunny;
      }

    case "Snow":
      return WiSnow;

    case "Drizzle":
    case "Rain":
    case "Squall":
      return WiRain;

    case "Haze":
    case "Mist":
    case "Fog":
      return WiFog;

    case "Thunderstorm":
      return WiThunderstorm;

    case "Tornado":
      return WiTornado;

    case "Smoke":
      return WiSmog;

    case "Dust":
    case "Sand":
    case "Ash":
      return WiDust;
    default:
      return WiDaySunny;
  }
};

export default getWeatherIcon;
