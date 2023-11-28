import { Request, Response } from "express";
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

let currentApiKeyIndex = 0;

export const currentWeather = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;
    const apiKey = API_KEYS[currentApiKeyIndex];

    const response = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
    );

    const currentWeather = response.data[0];
    const leanCurrentWeather = {
      isDayTime: currentWeather.IsDayTime,
      temperatureMetric: Math.round(currentWeather.Temperature.Metric.Value),
      temperatureImperial: Math.round(
        currentWeather.Temperature.Imperial.Value
      ),
      weatherText: currentWeather.WeatherText,
    };

    res.status(200).json(leanCurrentWeather);
  } catch (error: any) {
    handleApiError(error, req, res, currentWeather);
  }
};

export const fiveDailyForecast = async (req: Request, res: Response) => {
  try {
    const { cityKey } = req.params;
    const apiKey = API_KEYS[currentApiKeyIndex];

    const response = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`
    );

    const fiveDailyforecast = response.data.DailyForecasts;
    const leanFiveDailyforecast = fiveDailyforecast.map((day: any) => ({
      date: formatDate(day.Date),
      minTempMetric: Math.round(day.Temperature.Minimum.Value),
      maxTempMetric: Math.round(day.Temperature.Maximum.Value),
      minTempImperial: Math.round(
        celciusToFahrenheit(day.Temperature.Minimum.Value)
      ),
      maxTempImperial: Math.round(
        celciusToFahrenheit(day.Temperature.Maximum.Value)
      ),
      dayPhrase: day.Day.IconPhrase,
      nightPhrase: day.Night.IconPhrase,
    }));

    res.status(200).json(leanFiveDailyforecast);
  } catch (error: any) {
    handleApiError(error, req, res, fiveDailyForecast);
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

const celciusToFahrenheit = (celcius: number) =>
  Math.round((celcius * 9) / 5 + 32);

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}`;
}
