import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Flex, Heading, useMediaQuery, useToast } from "@chakra-ui/react";
import { getCurrentWeather } from "../../features/weather/weatherSlice";
import FavoriteCard from "./FavoriteCard";
import { City } from "../../features/search/searchSlice";

const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteCities, error } = useSelector(
    (state: RootState) => state.search
  );

  const { FavoriteCitiesCurrentWeather, loading } = useSelector(
    (state: RootState) => state.weather
  );

  React.useEffect(() => {
    if (favoriteCities) {
      favoriteCities.forEach((city: City) => {
        dispatch(
          getCurrentWeather({ cityKey: city.value, cityName: city.label })
        );
      });
    }
  }, []);

  const [isLessThan700px] = useMediaQuery("(max-width: 700px)");

  const toast = useToast();
  React.useEffect(() => {
    if (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to fetch favorites.",
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
        gap={isLessThan700px ? "30px" : ""}
        overflowX={"auto"}
      >
        {loading && (
          <Heading alignSelf={"center"} justifySelf={"center"}>
            Loading...
          </Heading>
        )}
        {FavoriteCitiesCurrentWeather &&
          FavoriteCitiesCurrentWeather.map((cityWeather) => (
            <FavoriteCard {...cityWeather} key={cityWeather.cityName} />
          ))}
      </Flex>
    </>
  );
};

export default Favorites;
