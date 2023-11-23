import axios from "axios";
import { Request, Response } from "express";

export const getCity = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    console.log("city", city);

    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${city}`
    );
    console.log("response", response.data);

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
