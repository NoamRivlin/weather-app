import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const API_KEYS = [
  process.env.API_KEY1 as string,
  process.env.API_KEY2 as string,
  process.env.API_KEY3 as string,
  process.env.API_KEY4 as string,
  process.env.API_KEY5 as string,
];

let currentApiKeyIndex = 4;
export const getCity = async (req: Request, res: Response) => {
  try {
    const { cityName } = req.params;

    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEYS[currentApiKeyIndex]}&q=${cityName}`
    );

    const cities = response.data.map((city: any) => ({
      label: city.LocalizedName,
      value: city.Key,
    }));
    res.status(200).json(cities);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: "City not found" });
  }
};

export const getCityByGeoLocation = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEYS[currentApiKeyIndex]}&q=${lat},${lon}`
    );
    const city = response.data;
    const leanCity = {
      label: city.LocalizedName,
      value: city.Key,
    };
    res.status(200).json(leanCity);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: "City not found" });
  }
};
