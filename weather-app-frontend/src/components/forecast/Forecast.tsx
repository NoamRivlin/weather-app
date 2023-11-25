import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Grid,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { getFiveDaysForecast } from "../../features/weather/weatherSlice";
import ForecastCard from "./ForecastCard";
import { wrap } from "lodash";

const Forecast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    fiveDaysForecast,
    loading: forecastLoading,
    error,
  } = useSelector((state: RootState) => state.weather);

  const { currentCity } = useSelector((state: RootState) => state.search);

  React.useEffect(() => {
    if (currentCity) {
      dispatch(getFiveDaysForecast(currentCity.value));
    }
  }, [currentCity, dispatch]);

  const [isAbove1100px, isAbove600px] = useMediaQuery([
    "(min-width: 1100px)",
    "(min-width: 600px)",
  ]);

  const toast = useToast();
  React.useEffect(() => {
    if (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to fetch forecast.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [error, toast]);

  return (
    <>
      {/* <Grid
        mt="10"
        templateColumns={
          isAbove1100px
            ? "repeat(5, 1fr)"
            : // : isAbove600px
              // ? "repeat(2, 1fr)"
              "repeat(1, 1fr)"
        }
        // gap={2}
        justifyItems="center" // Center the items horizontally
      > */}
      <Flex
        mt={14}
        justify="center"
        alignSelf={isAbove1100px ? " " : "center"}
        // justifyContent="space-around"
        gap={isAbove1100px ? "100px" : 7}
        flexDir={isAbove1100px ? "row" : "column"}
      >
        {fiveDaysForecast &&
          fiveDaysForecast.map((dailyForecast) => (
            <ForecastCard {...dailyForecast} key={dailyForecast.date} />
          ))}
      </Flex>
      {/* </Grid> */}
    </>
  );
};

export default Forecast;
