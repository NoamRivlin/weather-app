import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const CLIENT_URI = import.meta.env.VITE_REACT_CLIENT_URI as string;

// this is for favorites,
// each favored city will hold the current weather
interface CurrWeather {
  isDayTime: boolean;
  temperatureMetric: number;
  temperatureImperial: number;
  weatherText: string;
}

// this is for search results,
interface FiveDaysForecast {
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
  currWeather: CurrWeather | null;
  fiveDaysForecast: FiveDaysForecast[] | null;
}

const initialState: WeatherState = {
  loading: false,
  error: null,
  currWeather: null,
  fiveDaysForecast: null,
};

export const getCurrentWeather = createAsyncThunk<
  CurrWeather,
  string,
  { rejectValue: string }
>("weather/getCurrentWeather", async (cityKey, thunkAPI) => {
  try {
    const response = await axios.get(`${CLIENT_URI}/api/weather/${cityKey}`);
    console.log("response", response.data);

    return response.data;
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
    // const response = await axios.get(
    //   `${CLIENT_URI}/api/weather/fiveDaily/${cityKey}`
    // );
    // console.log("response", response.data);

    // return response.data;
    return [
      {
        date: "24.11",
        minTempMetric: 62,
        maxTempMetric: 80,
        minTempImperial: 143.6,
        maxTempImperial: 176,
        dayPhrase: "Hazy sunshine",
        nightPhrase: "Mostly cloudy",
      },
      {
        date: "25.11",
        minTempMetric: 67,
        maxTempMetric: 78,
        minTempImperial: 152.6,
        maxTempImperial: 172.4,
        dayPhrase: "Mostly cloudy",
        nightPhrase: "Partly cloudy",
      },
      {
        date: "26.11",
        minTempMetric: 63,
        maxTempMetric: 76,
        minTempImperial: 145.4,
        maxTempImperial: 168.8,
        dayPhrase: "Hazy sunshine",
        nightPhrase: "Rain",
      },
      {
        date: "27.11",
        minTempMetric: 59,
        maxTempMetric: 69,
        minTempImperial: 138.2,
        maxTempImperial: 156.2,
        dayPhrase: "Intermittent clouds",
        nightPhrase: "Intermittent clouds",
      },
      {
        date: "28.11",
        minTempMetric: 57,
        maxTempMetric: 69,
        minTempImperial: 134.6,
        maxTempImperial: 156.2,
        dayPhrase: "Intermittent clouds",
        nightPhrase: "Partly cloudy",
      },
    ];
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.currWeather = null;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currWeather = action.payload;
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.currWeather = null;
    });

    builder.addCase(getFiveDaysForecast.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.fiveDaysForecast = null;
    });
    builder.addCase(getFiveDaysForecast.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.fiveDaysForecast = action.payload;
    });
    builder.addCase(getFiveDaysForecast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.fiveDaysForecast = null;
    });
  },
});

export default weather.reducer;
