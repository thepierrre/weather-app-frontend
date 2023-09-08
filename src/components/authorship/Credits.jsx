import { imagesCredits } from "../../utils/images/images-credits";
import { Link } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";

const Credits = () => {
  const imagesSources = Object.keys(imagesCredits).map((key, index) => (
    <Link
      href={imagesCredits[key]}
      className="source-link"
      key={index}
      _hover={{ textDecoration: "none", color: "rgb(250,250,250)" }}
    >
      <p>{key}</p>
    </Link>
  ));

  return (
    <Flex
      bg="linear-gradient(150deg, #4477CE, #CCEEBC)"
      h="100vh"
      justify="center"
      align="center"
      color="#0A2647"
    >
      <Flex
        direction="column"
        align="center"
        gap="1.5rem"
        bg="rgba(255, 255, 255, 0.2)"
        padding="2rem"
        borderRadius="1.5rem"
      >
        <Text textAlign="center" fontSize="2xl">
          Sources of the Images <br />
          (Logging in may be required)
        </Text>

        <Flex direction="column" align="center" fontSize="lg">
          {imagesSources}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Credits;
