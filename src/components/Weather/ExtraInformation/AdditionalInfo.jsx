import SunAndMoon from "./SunAndMoon/SunAndMoon";
import AirQuality from "./AirQuality/AirQuality";

import { Flex } from "@chakra-ui/react";

const AdditionalInfo = () => {
  return (
    <Flex
      w={["100%", "100%", "100%", "60rem", "72rem"]}
      direction={["column", "column", "column", "row"]}
      align="center"
      gap="1.5rem"
    >
      <SunAndMoon />
      <AirQuality />
    </Flex>
  );
};

export default AdditionalInfo;
