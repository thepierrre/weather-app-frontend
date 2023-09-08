import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import HourlyForecastItem from "./HourlyForecastItem";
import { Flex } from "@chakra-ui/react";

const HourlyForecast = () => {
  const { globalWeather } = useContext(WeatherContext);

  const forecast = globalWeather.hourlyForecast;

  const forecastItems = Object.keys(forecast).map((hourly, index) =>
    index !== 0 ? (
      <HourlyForecastItem
        key={hourly}
        temp={forecast[hourly].temp}
        celsiusTemp={forecast[hourly].celsiusTemp}
        fahrenheitTemp={forecast[hourly].fahrenheitTemp}
        main={forecast[hourly].main}
        date={forecast[hourly].date}
      />
    ) : null
  );

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.2)"
      w={["100%", "28rem", "40rem", "60rem", "72rem"]}
      h={["7rem", "12rem"]}
      borderRadius="1.5rem"
      align="center"
      overflowX="scroll"
      overflowY="hidden"
      gap={["0"]}
    >
      {forecastItems}
    </Flex>
  );
};

export default HourlyForecast;
