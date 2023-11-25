import { useState } from "react";
import { Flex, Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavButtons from "./NavButtons";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
    >
      {/* Buttons or Menu based on screen width */}
      {isSmallerThan600px ? (
        <IconButton
          aria-label="Open Menu"
          fontSize="20px"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={handleToggle}
        />
      ) : (
        <Flex gap={3}>
          <NavButtons />
        </Flex>
      )}

      {/* Responsive Menu */}
      {isOpen && (
        <Flex
          direction="row"
          position="absolute"
          top="64px"
          right="0"
          p={4}
          gap={2}
        >
          <NavButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
