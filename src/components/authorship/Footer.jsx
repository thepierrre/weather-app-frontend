import { Link } from "@chakra-ui/react";
import { Flex, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex direction="column" align="center" fontSize="2xs">
      <Text>Created by Piotr Owczarczyk in 2023.</Text>
      <Box>
        <Link
          href="/credits"
          color="rgb(250, 250, 250)"
          _hover={{ color: "grey" }}
        >
          Click here
        </Link>{" "}
        for the picture credits.
      </Box>
    </Flex>
  );
};

export default Footer;
