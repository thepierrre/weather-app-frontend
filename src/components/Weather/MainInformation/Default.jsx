import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import { Flex, Text, Icon, Button } from "@chakra-ui/react";
import { WiDaySunnyOvercast } from "react-icons/wi";

const Default = () => {
  const { getWeatherForClickedCity } = useContext(WeatherContext);

  const defaultCities = [
    "Lisbon",
    "Miami",
    "Cairo",
    "Buenos Aires",
    "Sydney",
    "Beijing",
  ];

  const cityButtons = defaultCities.map((city) => (
    <Button
      key={city}
      bg="rgba(255, 255, 255, 0.4)"
      width={["360px", "400px", "700px"]}
      color="#0A264"
      borderRadius="1.5rem"
      _hover={{ bg: "rgba(255, 255, 255, 0.7)" }}
      onClick={() => getWeatherForClickedCity(city)}
    >
      {city}
    </Button>
  ));

  return (
    <Flex
      direction="column"
      color="#0A2647"
      gap="3rem"
      paddingTop={["1rem", "0"]}
    >
      <Flex direction="column" align="center">
        <Icon as={WiDaySunnyOvercast} boxSize={230} />
        <Text align="center" fontSize={["2xl", "3xl"]}>
          Enter a city or fetch your location
        </Text>
        <Text fontSize={["2xl", "3xl"]} textAlign="center">
          ... or simply choose one!
        </Text>
      </Flex>
      <Flex direction="column">
        <Flex direction="column" gap="0.5rem" paddingTop={["0.5rem", "0"]}>
          {cityButtons}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Default;
