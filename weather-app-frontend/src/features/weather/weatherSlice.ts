import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const CLIENT_URI = import.meta.env.VITE_REACT_CLIENT_URI as string;

export interface FavoriteCitiesCurrentWeather {
  isDayTime: boolean;
  temperatureMetric: number;
  temperatureImperial: number;
  weatherText: string;
  cityName: string;
}

export interface FiveDaysForecast {
  date: string;
  minTempMetric: number;
  minTempImperial: number;
  maxTempMetric: number;
  maxTempImperial: number;
  dayPhrase: string;
  nightPhrase: string;
}

interface WeatherState {
  loading: boolean;
  error: string | null;
  FavoriteCitiesCurrentWeather: FavoriteCitiesCurrentWeather[] | [];
  tempMetric: boolean;
  fiveDaysForecast: FiveDaysForecast[] | [];
}

const initialState: WeatherState = {
  loading: false,
  error: null,
  tempMetric: true,
  FavoriteCitiesCurrentWeather: [],
  fiveDaysForecast: [],
};

export const getCurrentWeather = createAsyncThunk<
  FavoriteCitiesCurrentWeather,
  { cityKey: string; cityName: string },
  { rejectValue: string }
>("weather/getCurrentWeather", async ({ cityKey, cityName }, thunkAPI) => {
  try {
    const response = await axios.get(`${CLIENT_URI}/api/weather/${cityKey}`);

    return { ...response.data, cityName };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getFiveDaysForecast = createAsyncThunk<
  FiveDaysForecast[],
  string,
  { rejectValue: string }
>("forecast/getFiveDaysforecast", async (cityKey, thunkAPI) => {
  try {
    const response = await axios.get(
      `${CLIENT_URI}/api/weather/fiveDaily/${cityKey}`
    );

    return response.data;
    // return mockWeather;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTempMetric(state) {
      state.tempMetric = !state.tempMetric;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.FavoriteCitiesCurrentWeather = [];
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.FavoriteCitiesCurrentWeather =
        state.FavoriteCitiesCurrentWeather.some(
          (city) => city.cityName === action.payload.cityName
        )
          ? state.FavoriteCitiesCurrentWeather
          : [...state.FavoriteCitiesCurrentWeather, action.payload];
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.FavoriteCitiesCurrentWeather = [];
    });

    builder.addCase(getFiveDaysForecast.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.fiveDaysForecast = [];
    });
    builder.addCase(getFiveDaysForecast.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.fiveDaysForecast = action.payload;
    });
    builder.addCase(getFiveDaysForecast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.fiveDaysForecast = [];
    });
  },
});

export const { setTempMetric } = weather.actions;
export default weather.reducer;

const mockWeather = [
  {
    date: "24.11",
    minTempMetric: 16,
    maxTempMetric: 27,
    minTempImperial: 62,
    maxTempImperial: 80,
    dayPhrase: "Hazy sunshine",
    nightPhrase: "Mostly cloudy",
  },
  {
    date: "25.11",
    minTempMetric: 19,
    maxTempMetric: 25,
    minTempImperial: 67,
    maxTempImperial: 78,
    dayPhrase: "Mostly cloudy",
    nightPhrase: "Partly cloudy",
  },
  {
    date: "26.11",
    minTempMetric: 17,
    maxTempMetric: 25,
    minTempImperial: 63,
    maxTempImperial: 76,
    dayPhrase: "Hazy sunshine",
    nightPhrase: "Rain",
  },
  {
    date: "27.11",
    minTempMetric: 15,
    maxTempMetric: 21,
    minTempImperial: 59,
    maxTempImperial: 69,
    dayPhrase: "Intermittent clouds",
    nightPhrase: "Intermittent clouds",
  },
  {
    date: "28.11",
    minTempMetric: 14,
    maxTempMetric: 21,
    minTempImperial: 57,
    maxTempImperial: 69,
    dayPhrase: "Intermittent clouds",
    nightPhrase: "Partly cloudy",
  },
];
