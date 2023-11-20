import { ReactNode } from "react";
import { Flex, Heading } from "@chakra-ui/react";
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
        {/* //make heading into a link*/}
        <Heading
          //   fontFamily=" "
          fontSize="4xl"
        >
          Hello Weather
        </Heading>

        <Navigation />
      </Flex>
      <Flex>{children}</Flex>
    </>
  );
};

export default Header;
