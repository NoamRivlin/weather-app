// Header.tsx

import React, { ReactNode } from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";
import Navigation from "./Navigation";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
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
      <Flex>{children}</Flex>
    </>
  );
};

export default Header;
