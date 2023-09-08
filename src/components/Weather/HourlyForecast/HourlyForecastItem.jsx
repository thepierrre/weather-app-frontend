import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import getWeatherIcon from "../../../shared/get-weather-icon";
import { Flex, Text, Icon } from "@chakra-ui/react";

const HourlyForecastItem = (props) => {
  const { celsiusTemp, fahrenheitTemp, main, date } = props;
  const { globalWeather, tempUnits, getLocalTime } = useContext(WeatherContext);

  const convertedTemp = tempUnits === "Celsius" ? celsiusTemp : fahrenheitTemp;

  const weatherIcon = getWeatherIcon(main);

  const timezone = globalWeather.timezone;

  return (
    <Flex
      direction="column"
      align="center"
      margin="0.5rem"
      minWidth={["4rem", "8.5rem"]}
      gap={["0.2rem"]}
    >
      <Text fontSize={["sm", "2xl"]}>{getLocalTime(date, timezone)}</Text>
      <Icon as={weatherIcon} boxSize={["32px", "80px"]} />
      <Text fontSize={["lg", "3xl"]}>{convertedTemp}°</Text>
    </Flex>
  );
};

export default HourlyForecastItem;
