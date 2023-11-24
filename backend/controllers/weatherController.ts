import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

export const currentWeather = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;

    const response = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
    );

    const currentWeather = response.data[0];
    const leanCurrentWeather = {
      isDayTime: currentWeather.IsDayTime,
      temperatureMetric: currentWeather.Temperature.Metric.Value,
      temperatureImperial: currentWeather.Temperature.Imperial.Value,
      weatherText: currentWeather.WeatherText,
    };
    res.status(200).json(leanCurrentWeather);
  } catch (error: any) {
    console.log("error", error);
    res
      .status(404)
      .json(
        error.response?.statusText || error.data.Code || { message: "error" }
      );
  }
};

export const fiveDailyForecast = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;

    const response = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`
    );

    const fiveDailyforecast = response.data.DailyForecasts;
    const leanFiveDailyforecast = fiveDailyforecast.map((day: any) => ({
      date: formatDate(day.Date),
      minTempMetric: day.Temperature.Minimum.Value,
      maxTempMetric: day.Temperature.Maximum.Value,
      minTempImperial: celciusToFahrenheit(day.Temperature.Minimum.Value),
      maxTempImperial: celciusToFahrenheit(day.Temperature.Maximum.Value),
      dayPhrase: day.Day.IconPhrase,
      nightPhrase: day.Night.IconPhrase,
    }));
    res.status(200).json(leanFiveDailyforecast);
  } catch (error: any) {
    console.log("error", error);
    res
      .status(404)
      .json(
        error.response?.statusText || error.data.Code || { message: "error" }
      );
  }
};

const celciusToFahrenheit = (celcius: number) => (celcius * 9) / 5 + 32;

function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  // Get day and month with leading zeros
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based

  return `${day}.${month}`;
}
