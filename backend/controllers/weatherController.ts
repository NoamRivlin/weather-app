import { Request, Response } from "express";
import { fetchDataWithRetry } from "./retryController";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEYS = [
  process.env.API_KEY1 as string,
  process.env.API_KEY2 as string,
  process.env.API_KEY3 as string,
  process.env.API_KEY4 as string,
  process.env.API_KEY5 as string,
  process.env.API_KEY6 as string,
];

interface CurrentWeatherResponse {
  IsDayTime: boolean;
  Temperature: {
    Metric: { Value: number };
    Imperial: { Value: number };
  };
  WeatherText: string;
}

interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: { Value: number };
    Maximum: { Value: number };
  };
  Day: { IconPhrase: string };
  Night: { IconPhrase: string };
}

interface FiveDayForecastResponse {
  DailyForecasts: DailyForecast[];
}

export const currentWeather = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEYS[0]}`;
    
    const { data } = await fetchDataWithRetry<CurrentWeatherResponse[]>(url);
    const currentWeather = data[0];

    const leanCurrentWeather = {
      isDayTime: currentWeather.IsDayTime,
      temperatureMetric: Math.round(currentWeather.Temperature.Metric.Value),
      temperatureImperial: Math.round(currentWeather.Temperature.Imperial.Value),
      weatherText: currentWeather.WeatherText,
    };

    res.status(200).json(leanCurrentWeather);
  } catch (error: any) {
    console.error("Error fetching current weather:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch current weather"
    });
  }
};

export const fiveDailyForecast = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEYS[0]}&metric=true`;
    
    const { data } = await fetchDataWithRetry<FiveDayForecastResponse>(url);
    
    const leanFiveDailyforecast = data.DailyForecasts.map((day) => ({
      date: formatDate(day.Date),
      minTempMetric: Math.round(day.Temperature.Minimum.Value),
      maxTempMetric: Math.round(day.Temperature.Maximum.Value),
      minTempImperial: Math.round(celciusToFahrenheit(day.Temperature.Minimum.Value)),
      maxTempImperial: Math.round(celciusToFahrenheit(day.Temperature.Maximum.Value)),
      dayPhrase: day.Day.IconPhrase,
      nightPhrase: day.Night.IconPhrase,
    }));

    res.status(200).json(leanFiveDailyforecast);
  } catch (error: any) {
    console.error("Error fetching forecast:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch forecast"
    });
  }
};

const celciusToFahrenheit = (celcius: number): number => 
  (celcius * 9) / 5 + 32;

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
