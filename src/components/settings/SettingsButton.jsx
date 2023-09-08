import { Flex, IconButton, Icon } from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";

const SettingsButton = (props) => {
  const { onOpen } = props;

  return (
    <Flex
      position={["absolute", "absolute", "absolute", "absolute", "fixed"]}
      top={["1rem", "1rem", "2rem"]}
      right={["1.5rem", "1rem", "2rem"]}
    >
      <IconButton
        variant="link"
        color="#0A2647"
        _hover={{ color: "rgb(241, 241, 241)" }}
        onClick={onOpen}
      >
        <Icon as={IoSettingsOutline} boxSize={["25px", "35px"]} />
      </IconButton>
    </Flex>
  );
};

export default SettingsButton;
