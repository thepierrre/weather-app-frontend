import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import DailyForecastItem from "./DailyForecastItem";
import { Flex } from "@chakra-ui/react";

const DailyForecast = () => {
  const { globalWeather } = useContext(WeatherContext);

  const forecast = globalWeather.dailyForecast;

  const forecastItems = Object.keys(forecast).map((daily, index) =>
    index !== 0 ? (
      <DailyForecastItem key={daily} dayWeather={forecast[daily]} />
    ) : null
  );

  return (
    <>
      <Flex
        bg="rgba(255, 255, 255, 0.2)"
        w={["100%", "28rem", "40rem", "60rem", "72rem"]}
        h={["7rem", "12rem"]}
        gap={["0.2rem"]}
        borderRadius="1.5rem"
        align="center"
        justify={["", "center"]}
        overflowX={["scroll", "hidden"]}
        overflowY="hidden"
      >
        {forecastItems}
      </Flex>
    </>
  );
};

export default DailyForecast;
