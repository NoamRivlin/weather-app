import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Flex, useMediaQuery, useToast } from "@chakra-ui/react";
import { getFiveDaysForecast } from "../../features/weather/weatherSlice";
import ForecastCard from "./ForecastCard";

const Forecast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fiveDaysForecast, error } = useSelector(
    (state: RootState) => state.weather
  );

  const { currentCity } = useSelector((state: RootState) => state.search);

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

  return (
    <>
      <Flex
        mt={14}
        justifyContent={isLessThan700px ? "center" : "start"}
        flexDir={isLessThan700px ? "column" : "row"}
        alignSelf={isLessThan700px ? "center " : ""}
        gap={isLessThan700px ? "30px" : "10px"}
        overflowX={"auto"}
      >
        {fiveDaysForecast &&
          fiveDaysForecast.map((dailyForecast) => (
            <ForecastCard {...dailyForecast} key={dailyForecast.date} />
          ))}
      </Flex>
    </>
  );
};

export default Forecast;
