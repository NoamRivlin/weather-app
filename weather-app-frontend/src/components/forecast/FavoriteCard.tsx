import React from "react";
import { Box, Flex, Container, useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { FavoriteCitiesCurrentWeather } from "../../features/weather/weatherSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentCity, setIgnoreGeoLocation } from "../../features/search/searchSlice";
import { WEATHER_BACKGROUNDS } from "./constants";
import { WeatherDisplay } from "./WeatherDisplay";

const FavoriteCard: React.FC<FavoriteCitiesCurrentWeather> = ({ ...props }) => {
  const { tempMetric } = useSelector((state: RootState) => state.weather);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { temperatureMetric, temperatureImperial, weatherText: dayPhrase, cityName, cityKey } = props;

  const styles = {
    text: {
      color: "white",
      backgroundColor: "black",
      p: "12px",
      borderRadius: "12px",
      opacity: "0.7",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
    },
    card: {
      borderRadius: "10px",
      height: "300px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
    cardHover: {
      boxShadow: colorMode === "light" 
        ? "0 8px 16px rgba(0, 0, 0, 0.2)" 
        : "0 8px 16px rgba(255, 255, 255, 0.2)",
      transform: "translateY(-8px)",
    },
  };

  const handleCardClick = () => {
    dispatch(setIgnoreGeoLocation(true));
    dispatch(setCurrentCity({ value: cityKey, label: cityName }));
    navigate(`/`);
  };

  const getCurrentBackground = () => {
    const phrase = dayPhrase?.toLowerCase() || "";
    return WEATHER_BACKGROUNDS[phrase as keyof typeof WEATHER_BACKGROUNDS] || WEATHER_BACKGROUNDS.cloud;
  };

  const getTemperatureDisplay = () => {
    return `${tempMetric ? temperatureMetric : temperatureImperial}°${tempMetric ? "C" : "F"}`;
  };

  return (
    <Container>
      <Flex direction="column" width="260px">
        <Box
          {...styles.card}
          backgroundImage={getCurrentBackground()}
          onClick={handleCardClick}
          _hover={styles.cardHover}
        >
          <Box p={4} border={0}>
            <WeatherDisplay
              cityName={cityName}
              dayPhrase={dayPhrase}
              temperature={getTemperatureDisplay()}
              commonTextStyle={styles.text}
            />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default FavoriteCard;
