import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import getWeatherIcon from "../../../shared/get-weather-icon";
import { Text, Box, Icon, Flex } from "@chakra-ui/react";

const GeneralWeather = () => {
  const { globalWeather, tempUnits } = useContext(WeatherContext);

  const main = globalWeather.weather.main;
  const temp =
    tempUnits === "Celsius"
      ? globalWeather.weather.celsiusTemp
      : globalWeather.weather.fahrenheitTemp;

  const weatherIcon = getWeatherIcon(
    globalWeather.weather.main,
    globalWeather.isNight
  );

  return (
    <Flex
      w={["100%", "28rem", "40rem", "19rem", "23rem"]}
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="1.5rem"
      h={["18rem", "25rem"]}
      padding={["0", "1rem"]}
      direction="column"
      align="center"
      justify="center"
    >
      <Flex align="center">
        <Icon as={weatherIcon} boxSize={["160px", "220px"]} />
      </Flex>
      <Flex direction={["row", "row"]} align="center" gap="1rem">
        <Box order={[1, 1]}>
          <Text fontSize={["7xl", "7xl", "7xl", "6xl", "7xl"]}>{`${Math.floor(
            temp || 24.0
          )}°`}</Text>
        </Box>
        <Box order={[2, 2]}>
          <Text fontSize={["5xl", "5xl", "5xl", "4xl", "5xl"]}>
            {main || "Clear"}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GeneralWeather;
