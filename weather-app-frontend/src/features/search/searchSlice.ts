import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_KEY = import.meta.env.VITE_REACT_API_KEY;
const API_URL = (query: string) =>
  `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;

interface City {
  name: string;
  originCountry: string;
  key: string;
}
interface SearchState {
  loading: boolean;
  error: string | null;
  cities: City[] | null;
}

const initialState: SearchState = {
  loading: false,
  error: null,
  cities: null,
};

export const getCity = createAsyncThunk<any, string, { rejectValue: string }>(
  "search/getCity",
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(API_URL(city));
      console.log("response", response.data);

      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const search = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cities = action.payload;
    });
    builder.addCase(getCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default search.reducer;
