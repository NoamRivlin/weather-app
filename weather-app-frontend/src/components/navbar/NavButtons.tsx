import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import routes from "../../routes";
import { setTempMetric } from "../../features/weather/weatherSlice";
import { celsiusIcon } from "./celsiusIcon";
import { feranhitIcon } from "./feranhitIcon";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";

const NavButtons: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { tempMetric } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  const handleMetricChange = () => {
    dispatch(setTempMetric());
  };

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

      <Button onClick={handleMetricChange} variant="unstyled">
        {
          <IconButton
            aria-label="toggle-metric"
            as={tempMetric ? celsiusIcon : feranhitIcon}
            w={10}
            h={10}
          />
        }
      </Button>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
};

export default NavButtons;
