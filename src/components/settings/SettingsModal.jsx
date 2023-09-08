import { useContext } from "react";
import WeatherContext from "../../context/weather-context";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

const SettingsModal = (props) => {
  const { isOpen, onClose } = props;
  const { tempUnits, setTempUnits, clockFormat, setClockFormat } =
    useContext(WeatherContext);

  const setTempUnitsToCelsius = () => {
    setTempUnits("Celsius");
  };

  const setTempUnitsToFahrenheit = () => {
    setTempUnits("Fahrenheit");
  };

  const setClockFormatTo12 = () => {
    setClockFormat("12hours");
  };

  const setClockFormatTo24 = () => {
    setClockFormat("24hours");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        display="flex"
        gap="2rem"
        borderRadius="1.5rem"
        p={3}
        maxWidth={["95%", "30rem", "32rem"]}
        minWidth={["95%", "30rem", "32rem"]}
        color="#0A2647"
      >
        <ModalHeader textAlign="center" fontSize="2xl">
          Settings
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Flex justify="center">
            <Flex direction="column" gap="2rem">
              <Flex>
                <Flex align="center" w={["40%", "45%"]}>
                  <Text fontSize={["lg", "xl"]}>Temperature</Text>
                </Flex>
                <Flex gap="1rem" w={["60%", "55%"]}>
                  <Button
                    w={["6rem", "8.5rem"]}
                    fontSize={["sm", "md"]}
                    onClick={setTempUnitsToCelsius}
                    colorScheme={tempUnits === "Celsius" ? "blue" : undefined}
                  >
                    Celsius
                  </Button>
                  <Button
                    w={["6rem", "8.5rem"]}
                    fontSize={["sm", "md"]}
                    onClick={setTempUnitsToFahrenheit}
                    colorScheme={
                      tempUnits === "Fahrenheit" ? "blue" : undefined
                    }
                  >
                    Fahrenheit
                  </Button>
                </Flex>
              </Flex>
              <Flex gap="3rem">
                <Flex align="center" w={["40%", "45%"]}>
                  <Text fontSize={["lg", "xl"]}>Clock</Text>
                </Flex>
                <Flex gap="1rem" w={["60%", "55%"]}>
                  <Button
                    w={["7rem", "8.5rem"]}
                    fontSize={["sm", "md"]}
                    onClick={setClockFormatTo12}
                    colorScheme={clockFormat === "12hours" ? "blue" : undefined}
                  >
                    12 hours
                  </Button>
                  <Button
                    w={["7rem", "8.5rem"]}
                    fontSize={["sm", "md"]}
                    onClick={setClockFormatTo24}
                    colorScheme={clockFormat === "24hours" ? "blue" : undefined}
                  >
                    24 hours
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
