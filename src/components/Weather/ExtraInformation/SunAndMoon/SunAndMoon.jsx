import { useContext } from "react";
import WeatherContext from "../../../../context/weather-context";
import { Text, Icon, Flex } from "@chakra-ui/react";
import { WiSunrise, WiSunset, WiMoonrise, WiMoonset } from "react-icons/wi";

const SunAndMoon = () => {
  const { globalWeather, getLocalTime } = useContext(WeatherContext);

  const sunrise = globalWeather.sun.sunrise;
  const sunset = globalWeather.sun.sunset;
  const moonrise = globalWeather.dailyForecast.plus1.moonrise;
  const moonset = globalWeather.dailyForecast.plus1.moonset;

  const timezone = globalWeather.timezone;

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.2)"
      w={["100%", "28rem", "40rem", "35.25rem"]}
      h={["10.5rem", "20rem"]}
      borderRadius="1.5rem"
      p="1rem"
      justify="center"
      align="center"
      gap={["1rem", "3rem"]}
    >
      <Flex direction="column" gap={["1rem", "2rem"]}>
        <Flex gap="1rem" align="center">
          <Icon as={WiSunrise} boxSize="60px" />
          <Flex direction="column" align="center" justify="center">
            <Text fontSize={["sm", "2xl"]}>Sunrise</Text>
            <Text fontSize={["md", "3xl", "3xl", "2xl", "3xl"]}>
              {getLocalTime(sunrise, timezone)}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="1rem" align="center">
          <Icon as={WiSunset} boxSize="60px" />
          <Flex direction="column" align="center" justify="center">
            <Text fontSize={["sm", "2xl"]}>Sunset</Text>
            <Text fontSize={["md", "3xl", "3xl", "2xl", "3xl"]}>
              {getLocalTime(sunset, timezone)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap={["1rem", "2rem"]}>
        <Flex gap="1rem" align="center">
          <Icon as={WiMoonrise} boxSize="60px" />
          <Flex direction="column" align="center" justify="center">
            <Text fontSize={["sm", "2xl"]}>Moonrise</Text>
            <Text fontSize={["md", "3xl", "3xl", "2xl", "3xl"]}>
              {getLocalTime(moonrise, timezone)}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="1rem" align="center">
          <Icon as={WiMoonset} boxSize="60px" />
          <Flex direction="column" align="center" justify="center">
            <Text fontSize={["sm", "2xl"]}>Moonset</Text>
            <Text fontSize={["md", "3xl", "3xl", "2xl", "3xl"]}>
              {getLocalTime(moonset, timezone)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SunAndMoon;
