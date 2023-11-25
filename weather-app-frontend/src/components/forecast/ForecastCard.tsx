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
          flexDir={"column"}
          //   width={isSmallerThan600px ? "300px" : "700px"}
          //   h={"270px"}
          //   w={"1 rem"}
          gap={3}
          p="4"
          mb="4"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb="2">
            {date}
          </Text>
          <Text>
            Day:{" "}
            {`${tempMetric ? maxTempMetric : maxTempImperial}°${
              tempMetric ? "C" : "F"
            }`}
          </Text>
          <Text>
            Night:{" "}
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
