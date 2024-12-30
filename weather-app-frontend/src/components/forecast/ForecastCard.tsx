import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Container, VStack, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { FiveDaysForecast } from "../../features/weather/weatherSlice";

const ForecastCard: React.FC<FiveDaysForecast> = ({ ...props }) => {
  const [bgGif, setBGGif] = useState<string | undefined>(undefined);
  const { tempMetric } = useSelector((state: RootState) => state.weather);

  const {
    date,
    minTempMetric,
    minTempImperial,
    maxTempImperial,
    maxTempMetric,
    dayPhrase,
  } = props;

  const commonTextStyle = {
    color: "white",
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
    <Container p={0} maxW="full">
      <Flex direction="column" width="full" height="full">
        <Box
          borderRadius={"10px"}
          backgroundImage={
            bgGif ??
            "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)"
          }
          height={"380px"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          position="relative"
        >
          <VStack 
            spacing={6} 
            height="full" 
            p={4}
            justify="space-between"
            align="center"
          >
            {/* Date Section - Top */}
            <Text 
              fontSize="2xl" 
              color="white" 
              textAlign="center"
              fontWeight="bold"
            >
              {date}
            </Text>

            {/* Weather Description - Middle */}
            <Box>
              <Text 
                fontSize="xl" 
                {...commonTextStyle}
                textAlign="center"
                px={4}
                minH="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {dayPhrase}
              </Text>
            </Box>

            {/* Temperature Section - Bottom */}
            <VStack spacing={4} mb={4}>
              <Text 
                fontSize="5xl" 
                color="white"
                fontWeight="bold"
              >
                {`${tempMetric ? maxTempMetric : maxTempImperial}°${
                  tempMetric ? "C" : "F"
                }`}
              </Text>
              <Text 
                fontSize="lg" 
                {...commonTextStyle}
              >
                Night: {`${tempMetric ? minTempMetric : minTempImperial}°${
                  tempMetric ? "C" : "F"
                }`}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default ForecastCard;
