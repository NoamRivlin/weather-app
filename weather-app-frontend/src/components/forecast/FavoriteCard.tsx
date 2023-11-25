import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { FavoriteCitiesCurrentWeather } from "../../features/weather/weatherSlice";

const FavoriteCard: React.FC<FavoriteCitiesCurrentWeather> = ({ ...props }) => {
  const [bgGif, setBGGif] = useState<string | undefined>(undefined);
  const { tempMetric } = useSelector((state: RootState) => state.weather);
  const { colorMode } = useColorMode();

  const {
    temperatureMetric,
    temperatureImperial,
    weatherText: dayPhrase,
    cityName,
  } = props;

  const commonTextStyle = {
    color: colorMode === "light" ? "white" : "white",
    backgroundColor: "black",
    p: "12px",
    borderRadius: "12px",
    opacity: "0.7",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  };

  useEffect(() => {
    if (dayPhrase?.toLowerCase().includes("snow")) {
      setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
    }
    if (dayPhrase?.toLowerCase().includes("cloud")) {
      setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
    }
    if (dayPhrase?.toLowerCase().includes("fog")) {
      setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
    }
    if (
      dayPhrase?.toLowerCase().includes("rain") ||
      dayPhrase?.toLowerCase().includes("shower")
    ) {
      setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
    }
    if (dayPhrase?.toLowerCase().includes("sunny")) {
      setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
    }
    if (dayPhrase?.toLowerCase().includes("t-storms")) {
      setBGGif(
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
      );
    }
  }, [dayPhrase]);

  return (
    <Container>
      <Flex direction="column" width={"260px"}>
        <Box
          borderRadius={"10px"}
          backgroundImage={
            bgGif ??
            "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)"
          }
          height={"300px"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Box p={4} border={0}>
            <VStack spacing="3">
              <Text fontSize="2xl" color="white">
                {cityName}
              </Text>
              <Text fontSize={"2xl"} {...commonTextStyle}>
                {dayPhrase}
              </Text>
              <Text fontSize="5xl" color="white">
                {`${tempMetric ? temperatureMetric : temperatureImperial}°${
                  tempMetric ? "C" : "F"
                }`}
              </Text>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default FavoriteCard;
