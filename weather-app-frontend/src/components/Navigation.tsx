import { useState } from "react";
import {
  Flex,
  Box,
  Button,
  IconButton,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navigation: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallerThan550] = useMediaQuery("(max-width: 550px)");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Responsive breakpoint value for menu when under 550px width

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
    >
      {/* Buttons or Menu based on screen width */}
      {isSmallerThan550 ? (
        <IconButton
          aria-label="Open Menu"
          fontSize="20px"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={handleToggle}
        />
      ) : (
        <Box>
          <Button colorScheme="teal" variant="outline">
            Home
          </Button>
          <Button colorScheme="teal" variant="outline">
            Favorites
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      )}

      {/* Responsive Menu */}
      {isOpen && (
        <Flex direction="column" position="absolute" top="64px" right="0" p={4}>
          <Button colorScheme="teal" variant="outline">
            Home
          </Button>
          <Button colorScheme="teal" variant="outline">
            Favorites
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navigation;
