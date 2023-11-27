import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  VStack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { FiveDaysForecast } from "../../features/weather/weatherSlice";

const ForecastCard: React.FC<FiveDaysForecast> = ({ ...props }) => {
  const [bgGif, setBGGif] = useState<string | undefined>(undefined);
  const { tempMetric } = useSelector((state: RootState) => state.weather);
  const { colorMode } = useColorMode();

  const {
    date,
    minTempMetric,
    minTempImperial,
    maxTempImperial,
    maxTempMetric,
    dayPhrase,
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
      <Flex direction="column" width={"260px"} height={"350px"}>
        <Box
          borderRadius={"10px"}
          backgroundImage={
            bgGif ??
            "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)"
          }
          height={"450px"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Box p={4} border={0}>
            <VStack spacing="3">
              <Text fontSize="2xl" color="white">
                {date}
              </Text>
              <Text fontSize={"2xl"} {...commonTextStyle}>
                {dayPhrase}
              </Text>
              <Text fontSize="5xl" color="white">
                {`${tempMetric ? maxTempMetric : maxTempImperial}°${
                  tempMetric ? "C" : "F"
                }`}
              </Text>
              <HStack>
                <Text fontSize={"xl"} {...commonTextStyle}>
                  Night:{" "}
                  {`${tempMetric ? minTempMetric : minTempImperial}°${
                    tempMetric ? "C" : "F"
                  }`}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default ForecastCard;
