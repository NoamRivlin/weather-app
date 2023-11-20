import { ReactNode } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Navigation from "./Navbar";

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
        <Heading fontSize="4xl">Hello Weather</Heading>

        <Navigation />
      </Flex>
      <Flex>{children}</Flex>
    </>
  );
};

export default Header;
