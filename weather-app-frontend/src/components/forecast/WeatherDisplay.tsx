import React from "react";
import { Text, VStack } from "@chakra-ui/react";

interface WeatherDisplayProps {
  cityName: string;
  dayPhrase: string;
  temperature: string;
  commonTextStyle: Record<string, any>;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  cityName,
  dayPhrase,
  temperature,
  commonTextStyle,
}) => {
  return (
    <VStack spacing="3">
      <Text fontSize="2xl" color="white">
        {cityName}
      </Text>
      <Text fontSize="2xl" {...commonTextStyle}>
        {dayPhrase}
      </Text>
      <Text fontSize="5xl" color="white">
        {temperature}
      </Text>
    </VStack>
  );
};
