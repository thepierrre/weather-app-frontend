import { useContext } from "react";
import WeatherContext from "../../../context/weather-context";
import { DateTime } from "luxon";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
  Button,
  Flex,
} from "@chakra-ui/react";

import {
  WiMoonNew,
  WiMoonWaxingCrescent4,
  WiMoonFirstQuarter,
  WiMoonWaxingGibbous4,
  WiMoonFull,
  WiMoonWaningGibbous4,
  WiMoonThirdQuarter,
  WiMoonWaningCrescent4,
  WiDaySunny,
  WiNightClear,
} from "react-icons/wi";

const DailyForecastItemDetail = (props) => {
  const { onClose, dayWeather, isOpen, weatherIcon } = props;
  const { globalWeather, getLocalTime, tempUnits } = useContext(WeatherContext);

  const timezone = globalWeather.timezone;

  const {
    main,
    celsiusTemp,
    celsiusNightTemp,
    fahrenheitTemp,
    fahrenheitNightTemp,
    date,
    moonPhase,
    moonset,
    moonrise,
    sunset,
    sunrise,
    nightTemp,
    precipProb,
    temp,
  } = dayWeather;

  const convertedTemp = tempUnits === "Celsius" ? celsiusTemp : fahrenheitTemp;
  const convertedNightTemp =
    tempUnits === "Celsius" ? celsiusNightTemp : fahrenheitNightTemp;

  const format = { weekday: "long", day: "numeric", month: "long" };
  const time = DateTime.fromSeconds(+date, {
    zone: timezone,
  }).toLocaleString(format);

  const getMoonPhase = (moonPhase) => {
    let moonIcon;
    let moonPhaseName;
    if (moonPhase === 0 || moonPhase === 1) {
      moonIcon = WiMoonNew;
      moonPhaseName = "New moon";
    }
    if (moonPhase > 0 && moonPhase < 0.25) {
      moonIcon = WiMoonWaxingCrescent4;
      moonPhaseName = "Waxing crescent";
    }
    if (moonPhase === 0.25) {
      moonIcon = WiMoonFirstQuarter;
      moonPhaseName = "First quarter";
    }
    if (moonPhase > 0.25 && moonPhase < 0.5) {
      moonIcon = WiMoonWaxingGibbous4;
      moonPhaseName = "Waxing gibbous";
    }
    if (moonPhase === 0.5) {
      moonIcon = WiMoonFull;
      moonPhaseName = "Full moon";
    }
    if (moonPhase > 0.5 && moonPhase < 0.75) {
      moonIcon = WiMoonWaningGibbous4;
      moonPhaseName = "Waning gibbous";
    }
    if (moonPhase === 0.75) {
      moonIcon = WiMoonThirdQuarter;
      moonPhaseName = "Third quarter";
    }
    if (moonPhase > 0.75 && moonPhase < 1) {
      moonIcon = WiMoonWaningCrescent4;
      moonPhaseName = "Waning crescent";
    }

    return { moonIcon, moonPhaseName };
  };

  const { moonIcon, moonPhaseName } = getMoonPhase(moonPhase);
  let precipProbability = `${Math.round(precipProb * 100)}%`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="1.5rem"
        color="#0A2647"
        minWidth={["95%", "28rem"]}
        maxWidth={["95%", "28rem"]}
      >
        <ModalHeader textAlign="center">{time}</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="inherit">
          <Flex direction="column" gap="2rem">
            <Flex direction="column" align="center">
              <Icon as={weatherIcon} boxSize={40} />
              <Text fontSize="3xl">{main}</Text>
              <Flex align="center" gap="0.5rem">
                <Icon as={WiNightClear} boxSize={8} />
                <Text fontSize="2xl">
                  {convertedNightTemp}° / {convertedTemp}°
                </Text>
                <Icon as={WiDaySunny} boxSize={8} />
              </Flex>
            </Flex>
            <Flex direction="column" align="center" gap="2rem">
              <Flex direction="column">
                <Text>
                  <b>Precipitation probability:</b> {precipProbability}
                </Text>
                <Flex direction="column" align="center" gap="0.5rem">
                  <Text>
                    <b>Moon phase:</b> {moonPhaseName}
                  </Text>
                  <Icon as={moonIcon} boxSize={10} />
                </Flex>
              </Flex>
              <Flex justify="center" gap="2rem">
                <Flex direction="column">
                  <Text>
                    <b>Sunrise:</b> {getLocalTime(sunrise, timezone)}
                  </Text>
                  <Text>
                    <b>Sunset:</b> {getLocalTime(sunset, timezone)}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text>
                    <b>Moonrise:</b> {getLocalTime(moonrise, timezone)}
                  </Text>
                  <Text>
                    <b>Moonset:</b> {getLocalTime(moonset, timezone)}
                  </Text>
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

export default DailyForecastItemDetail;
