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

  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

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
      <h1>Forecast</h1>
      <Flex p={8} flexWrap={"wrap"} gap={5}>
        {/* <Grid templateColumns="repeat(5, 1fr)" gap={3} p={8} flexWrap={ true}> */}
        {fiveDaysForecast &&
          fiveDaysForecast.map((dialyForecast) => (
            <ForecastCard {...dialyForecast} key={dialyForecast.date} />
          ))}
        {/* </Grid> */}
      </Flex>
    </>
  );
};

export default Forecast;
