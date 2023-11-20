import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

const NavButtons: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button colorScheme="teal" variant="outline">
        Home
      </Button>
      <Button colorScheme="teal" variant="outline">
        Favorites
      </Button>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
};

export default NavButtons;
