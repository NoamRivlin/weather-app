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

let currentApiKeyIndex = 2;
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
    handleApiError(error, req, res, getCity);
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
    handleApiError(error, req, res, getCityByGeoLocation);
  }
};

function handleApiError(
  error: any,
  req: Request,
  res: Response,
  retryFunction: (req: Request, res: Response) => Promise<void>
) {
  console.log("error", error);

  if (
    error.response?.status > 205 &&
    currentApiKeyIndex < API_KEYS.length - 1
  ) {
    // Retry with the next API key
    currentApiKeyIndex++;
    console.log(`Retrying with API key ${currentApiKeyIndex}`);
    return retryFunction(req, res);
  }

  res
    .status(404)
    .json(
      error.response?.statusText ||
        error.response?.data.Code || { message: error }
    );
}
