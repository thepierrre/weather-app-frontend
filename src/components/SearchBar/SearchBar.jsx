import { useContext, useState } from "react";
import WeatherContext from "../../context/weather-context";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Text,
  Tooltip,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { CiLocationOn, CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const {
    getWeatherForCurrentLocation,
    getWeatherForEnteredCity,
    enteredCity,
    setEnteredCity,
    inputError,
    setInputError,
  } = useContext(WeatherContext);

  const cityInputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const onEnteredCity = () => {
    if (!enteredCity) {
      setInputError("Please enter a city name.");
      return;
    } else {
      setInputError("");
      getWeatherForEnteredCity();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getWeatherForEnteredCity();
    }
  };

  return (
    <Box>
      <InputGroup>
        <InputLeftElement height="100%" width="3rem">
          <Tooltip label="Fetch weather for my location">
            <IconButton variant="link" onClick={getWeatherForCurrentLocation}>
              <Icon as={CiLocationOn} boxSize={7} color="#0A2647" />
            </IconButton>
          </Tooltip>
        </InputLeftElement>
        <Input
          placeholder="Enter a city name"
          width={["360px", "400px", "700px"]}
          background="white"
          borderRadius="1.5rem"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement height="100%" width="3rem">
          <Tooltip label="Fetch weather for entered city">
            <IconButton variant="link" onClick={onEnteredCity}>
              <Icon as={CiSearch} boxSize={7} color="#0A2647" />
            </IconButton>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
      {inputError && (
        <Text
          textAlign="center"
          marginTop="0.5rem"
          fontSize="lg"
          color="#822727"
        >
          {inputError}
        </Text>
      )}
    </Box>
  );
};

export default SearchBar;
