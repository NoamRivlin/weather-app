import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { fetchDataWithRetry } from "./retryController";
dotenv.config();

interface City {
  LocalizedName: string;
  Key: string;
}

interface GeoPositionCity {
  LocalizedName: string;
  Key: string;
}

export const getCity = async (req: Request, res: Response) => {
  try {
    const { cityName } = req.params;
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY1}&q=${cityName}`;
    
    const { data } = await fetchDataWithRetry<City[]>(url);
    
    const cities = data.map((city) => ({
      label: city.LocalizedName,
      value: city.Key,
    }));
    
    res.status(200).json(cities);
  } catch (error: any) {
    console.error("Error searching cities:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to search cities"
    });
  }
};

export const getCityByGeoLocation = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.params;
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.API_KEY1}&q=${lat},${lon}`;
    
    const { data } = await fetchDataWithRetry<GeoPositionCity>(url);
    
    const leanCity = {
      label: data.LocalizedName,
      value: data.Key,
    };
    
    res.status(200).json(leanCity);
  } catch (error: any) {
    console.error("Error fetching city by geolocation:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch city by geolocation"
    });
  }
};
