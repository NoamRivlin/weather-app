import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const CLIENT_URI = import.meta.env.VITE_REACT_CLIENT_URI as string;

export interface City {
  // name of the city
  label: string;
  // city key
  value: string;
}
interface SearchState {
  loading: boolean;
  error: string | null;
  cities: City[] | null;
  currentCity: City | null;
  favoriteCities: City[] | null;
}

const initialState: SearchState = {
  loading: false,
  error: null,
  cities: null,
  currentCity: { value: "215854", label: "Tel Aviv" },
  // favoriteCities: null,
  favoriteCities: [
    {
      label: "New York",
      value: "349727",
    },
    {
      value: "215854",
      label: "Tel Aviv",
    },
    {
      label: "New Delhi",
      value: "187745",
    },
    {
      label: "Finspång",
      value: "309268",
    },
    {
      label: "Finote Selam",
      value: "127220",
    },
    {
      label: "Findikli",
      value: "1302404",
    },
    {
      label: "Fingoe",
      value: "246301",
    },
  ],
};

export const getCity = createAsyncThunk<
  City[],
  string,
  { rejectValue: string }
>("search/getCity", async (cityName, thunkAPI) => {
  try {
    const response = await axios.get(`${CLIENT_URI}/api/cities/${cityName}`);

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
    updateFavoriteCities(state, action) {
      const newFavoriteCities = action.payload;
      if (newFavoriteCities) {
        // Remove duplicates by converting the array to a Set and back to an array
        state.favoriteCities = Array.from(new Set(newFavoriteCities));
      } else {
        state.favoriteCities = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCity.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.cities = null;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cities = action.payload;
    });
    builder.addCase(getCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.cities = null;
    });
  },
});

export const { setCurrentCity, updateFavoriteCities } = search.actions;
export default search.reducer;
