import { useContext } from "react";
import DailyForecastItemDetail from "./DailyForecastItemDetail";
import WeatherContext from "../../../context/weather-context";
import { DateTime } from "luxon";
import { useDisclosure } from "@chakra-ui/react";
import getWeatherIcon from "../../../shared/get-weather-icon";
import { Flex, Text, Icon } from "@chakra-ui/react";

const DailyForecastItem = (props) => {
  const { dayWeather } = props;
  const { globalWeather, tempUnits } = useContext(WeatherContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const celsiusTemp = dayWeather.celsiusTemp;
  const fahrenheitTemp = dayWeather.fahrenheitTemp;
  const main = dayWeather.main;
  const date = dayWeather.date;

  const convertedTemp = tempUnits === "Celsius" ? celsiusTemp : fahrenheitTemp;

  const weatherIcon = getWeatherIcon(main);

  const timezone = globalWeather.timezone;

  let day = DateTime.fromSeconds(+date, { zone: timezone }).weekdayLong;

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        m={0}
        minWidth={["5.5rem", "10.25rem"]}
        gap={["0.2rem"]}
        h="100%"
        _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text fontSize={["sm", "2xl"]}>{day}</Text>
        <Flex direction="column" align="center">
          <Icon as={weatherIcon} boxSize={["32px", "80px"]} />
          <Text fontSize={["lg", "3xl"]}>{convertedTemp}°</Text>
        </Flex>
      </Flex>
      <DailyForecastItemDetail
        isOpen={isOpen}
        onClose={onClose}
        dayWeather={dayWeather}
        weatherIcon={weatherIcon}
      />
    </>
  );
};

export default DailyForecastItem;
