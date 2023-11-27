import React from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useDispatch } from "react-redux";
import {
  getCity,
  getCityByGeoLocation,
  setCurrentCity,
  setGeoLoading,
  setIgnoreGeoLocation,
  updateFavoriteCities,
} from "../features/search/searchSlice";
import { AppDispatch, RootState } from "../features/store";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { AddIcon, StarIcon } from "@chakra-ui/icons";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cities,
    loading: searchLoading,
    currentCity,
    error,
    favoriteCities,
    ignoreGeoLocation,
  } = useSelector((state: RootState) => state.search);

  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");
  const toast = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to fetch cities.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [error, toast]);

  const debouncedDispatch = debounce((value: string) => {
    setIgnoreGeoLocation(true);
    dispatch(getCity(value));
  }, 1000);

  const onChangeHandler = (value: string) => {
    if (/[^\u0000-\u007F]+/.test(value)) {
      toast({
        title: "Please enter a valid city name in english letters only",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    if (value.length >= 3) {
      debouncedDispatch(value.toLocaleLowerCase());
    }
  };

  const onUpdateFavoriteCitiesHandler = () => {
    if (currentCity) {
      if (
        favoriteCities?.some(
          (favoriteCity) => favoriteCity.value === currentCity.value
        )
      ) {
        // City is already in favorites, remove it
        const updatedFavorites = favoriteCities.filter(
          (favoriteCity) => favoriteCity.value !== currentCity.value
        );
        dispatch(updateFavoriteCities(updatedFavorites));
      } else {
        // City is not in favorites, add it
        dispatch(
          updateFavoriteCities([...(favoriteCities ?? []), currentCity])
        );
      }
    }
  };

  const getCurrentCityFromGeoLocation = () => {
    if (ignoreGeoLocation) {
      return;
    }
    dispatch(setGeoLoading(true));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const latitudeString = latitude.toString();
        const longitudeString = longitude.toString();

        dispatch(
          getCityByGeoLocation({ lat: latitudeString, lon: longitudeString })
        );
        dispatch(setIgnoreGeoLocation(true));
        dispatch(setGeoLoading(false));
      },
      (error) => {
        toast({
          title: "An error occurred.",
          description: "Unable to get geolocation.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.error("Error getting geolocation:", error.message);
        dispatch(setGeoLoading(false));
        setIgnoreGeoLocation(true);
      }
    );
  };

  React.useEffect(() => {
    getCurrentCityFromGeoLocation();
  }, []);

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
    if (favoriteCities) {
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    }
  }, [favoriteCities]);

  return (
    <Container mt={"20px"} width={isSmallerThan600px ? "300px" : "700px"}>
      <FormLabel> Enter City Name</FormLabel>
      <Flex alignItems={"center"}>
        <FormControl>
          <Select
            size={isSmallerThan600px ? "sm" : "md"}
            name="colors"
            options={cities || []}
            isLoading={searchLoading}
            closeMenuOnSelect={true}
            onChange={(value) => {
              dispatch(setIgnoreGeoLocation(true));
              dispatch(setCurrentCity(value));
            }}
            onInputChange={(value) => {
              onChangeHandler(value);
            }}
            value={currentCity}
          />
        </FormControl>
        {currentCity && (
          <Tooltip
            label={
              favoriteCities?.some(
                (favoriteCity) => favoriteCity.value === currentCity.value
              )
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
          >
            <Button p={0} ml={10} onClick={onUpdateFavoriteCitiesHandler}>
              {favoriteCities?.some(
                (favoriteCity) => favoriteCity.value === currentCity.value
              ) ? (
                <StarIcon color="yellow.500" />
              ) : (
                <AddIcon color="green.500" />
              )}
            </Button>
          </Tooltip>
        )}
      </Flex>
    </Container>
  );
};

export default Search;
