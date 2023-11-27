import { Box, Flex, Heading } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import CloudsHeader from "../components/animations/CloudsHeader";

const RootLayoutHeader: React.FC = () => {
  return (
    <>
      <Box height={""}>
        <CloudsHeader />
      </Box>
      <Flex
        align="center"
        justify="space-between"
        padding={{ base: "0.5rem", md: "1rem" }}
      >
        <Heading fontSize="4xl" fontFamily={"lobster, sans-serif"}>
          Weather App{" "}
        </Heading>
        <Navbar />
      </Flex>
    </>
  );
};

export default RootLayoutHeader;
