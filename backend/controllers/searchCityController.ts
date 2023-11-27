import axios from "axios";
import { Request, Response } from "express";

const API_KEYS = [
  process.env.API_KEY1 as string,
  process.env.API_KEY2 as string,
  process.env.API_KEY3 as string,
  process.env.API_KEY4 as string,
];

let currentApiKeyIndex = 3;
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
