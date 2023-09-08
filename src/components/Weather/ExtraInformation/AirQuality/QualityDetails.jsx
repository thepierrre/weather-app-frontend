import { useContext } from "react";
import WeatherContext from "../../../../context/weather-context";
import { Text, Flex } from "@chakra-ui/react";

const QualityDetails = () => {
  const { globalWeather } = useContext(WeatherContext);
  const components = globalWeather.airQuality.components;
  return (
    <Flex
      w="50%"
      direction="column"
      fontSize="xl"
      px="2rem"
      align="center"
      gap="1rem"
    >
      <Text fontSize={["xl", "2xl"]}>
        μg/m<sup>3</sup>
      </Text>
      <Flex fontSize="md" gap="1.5rem">
        <Flex direction="column">
          <Text>CO</Text>
          <Text>
            SO<sub>2</sub>
          </Text>
          <Text>
            NO<sub>2</sub>
          </Text>
          <Text>
            O<sub>3</sub>
          </Text>
          <Text>
            PM<sub>2.5</sub>
          </Text>
        </Flex>
        <Flex direction="column" align="flex-end">
          <Text>–</Text>
          <Text>–</Text>
          <Text>–</Text>
          <Text>–</Text>
          <Text>–</Text>
        </Flex>
        <Flex direction="column" align="flex-start">
          <Text>{components.co}</Text>
          <Text>{components.so2}</Text>
          <Text>{components.no2}</Text>
          <Text>{components.o3}</Text>
          <Text>{components.pm2_5}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default QualityDetails;
