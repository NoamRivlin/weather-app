import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import {
  FiveDaysForecast,
  getFiveDaysForecast,
} from "../../features/weather/weatherSlice";

const ForecastCard: React.FC<FiveDaysForecast> = ({ ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tempMetric } = useSelector((state: RootState) => state.weather);

  const {
    date,
    minTempMetric,
    minTempImperial,
    maxTempImperial,
    maxTempMetric,
    dayPhrase,
    nightPhrase,
  } = props;

  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

  return (
    <>
      {
        <Flex
          borderWidth="1px"
          borderRadius="lg"
          //   flexDirection={isSmallerThan600px ? "column" : "row"}
          flexDir={"column"}
          //   width={isSmallerThan600px ? "300px" : "700px"}
          h={"260px"}
          w={"300px"}
          gap={3}
          p="4"
          mb="4"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb="2">
            {date}
          </Text>
          <Text>
            {`${tempMetric ? maxTempMetric : maxTempImperial}°${
              tempMetric ? "C" : "F"
            }`}
          </Text>
          <Text>
            {`${tempMetric ? minTempMetric : minTempImperial}°${
              tempMetric ? "C" : "F"
            }`}
          </Text>
          <Text mt="2" fontStyle="italic">
            Day: {dayPhrase}
          </Text>
          <Text mt="2" fontStyle="italic">
            Night: {nightPhrase}
          </Text>
        </Flex>
      }
    </>
  );
};

export default ForecastCard;
