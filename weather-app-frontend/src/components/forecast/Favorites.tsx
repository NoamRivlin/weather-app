import React from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Center, Grid, Heading, useToast } from "@chakra-ui/react";
import { getCurrentWeather } from "../../features/weather/weatherSlice";
import FavoriteCard from "./FavoriteCard";
import { City, updateFavoriteCities } from "../../features/search/searchSlice";

const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteCities, error } = useSelector(
    (state: RootState) => state.search
  );

  const { FavoriteCitiesCurrentWeather, loading } = useSelector(
    (state: RootState) => state.weather
  );
  React.useEffect(() => {
    if (!favoriteCities) {
      const favoriteCitiesFromLocalStorage =
        localStorage.getItem("favoriteCities");
      if (favoriteCitiesFromLocalStorage) {
        dispatch(
          updateFavoriteCities(JSON.parse(favoriteCitiesFromLocalStorage))
        );
      }
    }
  }, [favoriteCities]);

  React.useEffect(() => {
    if (favoriteCities) {
      favoriteCities.forEach((city: City) => {
        dispatch(
          getCurrentWeather({ cityKey: city.value, cityName: city.label })
        );
      });
    }
  }, []);

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

  if (loading) {
    return (
      <Center>
        <Heading mt={"100px"}>Loading...</Heading>
      </Center>
    );
  }

  return (
    <>
      <Center>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {FavoriteCitiesCurrentWeather &&
            FavoriteCitiesCurrentWeather.map((cityWeather) => (
              <FavoriteCard {...cityWeather} key={cityWeather.cityName} />
            ))}
          {/* {mockFavoriteCitiesCurrentWeather &&
            mockFavoriteCitiesCurrentWeather.map((cityWeather) => (
              <FavoriteCard {...cityWeather} key={cityWeather.cityName} />
            ))} */}
        </Grid>
      </Center>
    </>
  );
};

export default Favorites;
const mockFavoriteCitiesCurrentWeather = [
  {
    isDayTime: true,
    temperatureMetric: 35,
    temperatureImperial: 94,
    weatherText: "Clouds and sun",
    cityName: "Fingoe",
    cityKey: "246301",
  },
  {
    isDayTime: true,
    temperatureMetric: -4,
    temperatureImperial: 25,
    weatherText: "Partly sunny",
    cityName: "Finspång",
    cityKey: "309268",
  },
  {
    isDayTime: true,
    temperatureMetric: 6,
    temperatureImperial: 43,
    weatherText: "Mostly sunny",
    cityName: "New York",
    cityKey: "349727",
  },
  {
    isDayTime: true,
    temperatureMetric: 19,
    temperatureImperial: 65,
    weatherText: "Clouds and sun",
    cityName: "Tel Aviv",
    cityKey: "215854",
  },
  {
    isDayTime: false,
    temperatureMetric: 21,
    temperatureImperial: 71,
    weatherText: "Mostly cloudy",
    cityName: "New Delhi",
    cityKey: "187745",
  },
  {
    isDayTime: true,
    temperatureMetric: 5,
    temperatureImperial: 41,
    weatherText: "Partly sunny",
    cityName: "Findikli",
    cityKey: "1302404",
  },
  {
    isDayTime: true,
    temperatureMetric: 25,
    temperatureImperial: 77,
    weatherText: "Partly sunny",
    cityName: "Finote Selam",
    cityKey: "127220",
  },
];
