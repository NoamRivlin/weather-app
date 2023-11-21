import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import routes from "../../routes";

const NavButtons: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ChakraLink as={ReactRouterLink} to={routes.home}>
        <Button colorScheme="teal" variant="outline">
          Home
        </Button>
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={routes.favorites}>
        <Button colorScheme="teal" variant="outline">
          Favorites
        </Button>
      </ChakraLink>

      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
};

export default NavButtons;
