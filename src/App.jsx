import { useContext, useState, useEffect } from "react";
import WeatherContext from "./context/weather-context";
import SearchBar from "./components/SearchBar/SearchBar";
import SettingsModal from "./components/settings/SettingsModal";
import SettingsButton from "./components/settings/SettingsButton";
import MainInformation from "./components/Weather/MainInformation/MainInformation";
import Default from "./components/Weather/MainInformation/Default";
import Footer from "./components/authorship/Footer";
import { useDisclosure } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { weatherIsFetched } = useContext(WeatherContext);

  useEffect(() => {}, [weatherIsFetched]);

  return (
    <Flex
      bg="linear-gradient(150deg, #4477CE, #CCEEBC)"
      direction="column"
      align="center"
      paddingBottom="1rem"
    >
      <Flex
        justify="center"
        padding={["4rem 0 4rem 0", "5rem 0 5rem 0"]}
        w="100vw"
      >
        <SettingsButton onOpen={onOpen} />
        <Flex
          direction="column"
          align="center"
          gap={["1.5rem", "3rem"]}
          w="100%"
        >
          <SearchBar />
          {weatherIsFetched ? <MainInformation /> : <Default />}
        </Flex>
        <SettingsModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
