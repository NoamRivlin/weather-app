// Header.tsx

import React from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      padding={{ base: "0.5rem", md: "1rem" }}
    >
      <Text
        fontFamily="Your Font Name, sans-serif" // Replace with the actual font name
        fontWeight="bold"
        fontSize="4xl"
      >
        Hello Weather
      </Text>

      <Navigation />
    </Flex>
  );
};

export default Header;
