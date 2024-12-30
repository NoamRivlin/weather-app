import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Center, Flex, Grid, GridItem, Heading, useMediaQuery, useToast } from "@chakra-ui/react";
import { getFiveDaysForecast } from "../../features/weather/weatherSlice";
import ForecastCard from "./ForecastCard";

const Forecast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Mock data for testing the forecast cards start
  // const mockFiveDaysForecast = [
  //   {
  //     date: "2024-12-30",
  //     minTempMetric: 12,
  //     minTempImperial: 53.6,
  //     maxTempMetric: 22,
  //     maxTempImperial: 71.6,
  //     dayPhrase: "Mostly sunny",
  //     nightPhrase: "Clear"
  //   },
  //   {
  //     date: "2024-12-31",
  //     minTempMetric: 14,
  //     minTempImperial: 57.2,
  //     maxTempMetric: 24,
  //     maxTempImperial: 75.2,
  //     dayPhrase: "Partly cloudy",
  //     nightPhrase: "Scattered clouds"
  //   },
  //   {
  //     date: "2025-01-01",
  //     minTempMetric: 15,
  //     minTempImperial: 59,
  //     maxTempMetric: 25,
  //     maxTempImperial: 77,
  //     dayPhrase: "Light rain",
  //     nightPhrase: "Showers"
  //   },
  //   {
  //     date: "2025-01-02",
  //     minTempMetric: 13,
  //     minTempImperial: 55.4,
  //     maxTempMetric: 23,
  //     maxTempImperial: 73.4,
  //     dayPhrase: "Thunderstorms",
  //     nightPhrase: "Heavy rain"
  //   },
  //   {
  //     date: "2025-01-03",
  //     minTempMetric: 11,
  //     minTempImperial: 51.8,
  //     maxTempMetric: 21,
  //     maxTempImperial: 69.8,
  //     dayPhrase: "Sunny",
  //     nightPhrase: "Clear skies"
  //   }
  // ];

  // const fiveDaysForecast = mockFiveDaysForecast;
  // const error = null;
  // const loading = false;
  // Mock data for testing the forecast cards end
  const { fiveDaysForecast, error, loading } = useSelector((state: RootState) => state.weather);

  const { currentCity, geoLoading } = useSelector((state: RootState) => state.search);

  React.useEffect(() => {
    if (currentCity) {
      dispatch(getFiveDaysForecast(currentCity.value));
    }
  }, [currentCity, dispatch]);

  const [isLessThan700px] = useMediaQuery("(max-width: 700px)");

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

  if (loading || geoLoading) {
    return (
      <Center>
        <Heading mt={"100px"}>Loading...</Heading>
      </Center>
    );
  }
  return (
    <>
      <Flex direction="column" maxW="1400px" mx="auto" w="full" px={{ base: 4, md: 8 }} alignItems="center">
        <Grid
          mt={14}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
          w="full"
          maxW="1400px"
          mx="auto"
          px={{ base: 2, sm: 4, md: 6 }}
          justifyItems="center"
          alignItems="stretch"
        >
          {fiveDaysForecast.map((dailyForecast) => (
            <GridItem key={dailyForecast.date} w="full" maxW={{ base: "100%", sm: "300px" }}>
              <ForecastCard {...dailyForecast} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default Forecast;
