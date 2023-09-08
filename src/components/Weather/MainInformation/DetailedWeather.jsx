import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import { Text, Box, Icon, Tooltip } from "@chakra-ui/react";
import { WiStrongWind, WiHumidity, WiBarometer, WiCloud } from "react-icons/wi";

const DetailedWeather = () => {
  const { globalWeather } = useContext(WeatherContext);

  const wind = globalWeather.weather.wind;
  const humidity = globalWeather.weather.humidity;
  const pressure = globalWeather.weather.pressure;
  const cloudiness = globalWeather.weather.cloudiness;

  return (
    <Box
      w={["100%", "28rem", "40rem", "19rem", "23rem"]}
      h={["20rem", "25rem"]}
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="1.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap={["1.5rem", "4rem"]}
        width="100%"
      >
        <Tooltip label="Wind speed">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize={["3xl"]} width="100%" textAlign="center">
              {Math.floor(wind || 2)} km/h
            </Text>
            <Box width="100%" textAlign="center">
              <Icon as={WiStrongWind} boxSize={20}></Icon>
            </Box>
          </Box>
        </Tooltip>
        <Tooltip label="Humidity">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize={["3xl"]} width="100%" textAlign="center">
              {Math.floor(humidity || 15)}%
            </Text>
            <Box width="100%" textAlign="center">
              <Icon as={WiHumidity} boxSize={20} />
            </Box>
          </Box>
        </Tooltip>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap={["1.5rem", "4rem"]}
        width="100%"
      >
        <Tooltip label="Air Pressure">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize={["3xl"]} width="100%" textAlign="center">
              {Math.floor(pressure || 1013)} hPa
            </Text>
            <Box width="100%" textAlign="center">
              <Icon as={WiBarometer} boxSize={20} />
            </Box>
          </Box>
        </Tooltip>
        <Tooltip label="Cloudiness">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize={["3xl"]} width="100%" textAlign="center">
              {Math.floor(cloudiness || 5)}%
            </Text>
            <Box width="100%" textAlign="center">
              <Icon as={WiCloud} boxSize={20} />
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DetailedWeather;
