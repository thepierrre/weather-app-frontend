import { useContext, useEffect, useState } from "react";
import WeatherContext from "../../../context/weather-context";
import { chartLevels, chartBarEmpty } from "../../../UI/chartLevels";
import "react-circular-progressbar/dist/styles.css";
import { Text, Box } from "@chakra-ui/react";

const UVIndex = () => {
  const { globalWeather } = useContext(WeatherContext);
  const [chartLevel, setChartLevel] = useState(undefined);
  const [chartColor, setChartColor] = useState(undefined);

  const uvIndex = globalWeather.weather.uvIndex;

  useEffect(() => {
    const uvIndexGrade = getUVIIndexGrade(uvIndex);
    const searchedItem = chartLevels.find(
      (item) => item.uvIndexGrade === uvIndexGrade
    );
    if (searchedItem) {
      const color = searchedItem.color;
      setChartColor(color);
      const level = chartLevels.indexOf(searchedItem) + 1;
      setChartLevel(level);
    }
  }, [uvIndex]);

  const getUVIIndexGrade = (uvIndex) => {
    if (uvIndex < 2) {
      return "Low";
    }
    if (uvIndex >= 2 && uvIndex < 5) {
      return "Moderate";
    }
    if (uvIndex >= 5 && uvIndex < 7) {
      return "High";
    }
    if (uvIndex >= 7 && uvIndex < 10) {
      return "Very high";
    }
    if (uvIndex >= 10) {
      return "Extreme";
    }
  };

  return (
    <Box
      w={["100%", "28rem", "40rem", "19rem", "23rem"]}
      h={["17rem", "25rem"]}
      padding={["2rem", "4rem"]}
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="1.5rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={["1rem", "2rem"]}
    >
      <Text fontSize={["3xl", "4xl"]}>UV Index</Text>
      <Box
        w="19.5rem"
        h="20rem"
        display="flex"
        gap={["1rem", "1.25rem"]}
        alignItems="flex-end"
        justifyContent="center"
        padding="0 2rem 0 2rem"
      >
        {chartLevels.map((level, i) => (
          <Box
            key={level.uvIndexGrade}
            w={["1.25rem", "1rem"]}
            h={4 * (i + 3)}
            borderRadius="0.75rem"
            bg={i < chartLevel ? chartColor : chartBarEmpty}
          />
        ))}
      </Box>
      <Text fontSize={["2xl", "3xl"]}>{getUVIIndexGrade(uvIndex)}</Text>
    </Box>
  );
};

export default UVIndex;
