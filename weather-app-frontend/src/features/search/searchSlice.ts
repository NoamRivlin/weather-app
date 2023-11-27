import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const CLIENT_URI = import.meta.env.VITE_REACT_CLIENT_URI as string;

export interface City {
  // name of the city
  label: string;
  // city id
  value: string;
}
interface SearchState {
  loading: boolean;
  error: string | null;
  cities: City[] | null;
  currentCity: City | null;
  ignoreGeoLocation: boolean;
  favoriteCities: City[] | null;
  geoLoading: boolean;
}

const initialState: SearchState = {
  loading: false,
  error: null,
  cities: null,
  ignoreGeoLocation: false,
  currentCity: { value: "215854", label: "Tel Aviv" },
  geoLoading: false,
  // favoriteCities: null,
  // for showcasing purposes
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

export const getCityByGeoLocation = createAsyncThunk<
  City,
  { lat: string; lon: string },
  { rejectValue: string }
>("search/getCityByGeoLocation", async ({ lat, lon }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${CLIENT_URI}/api/cities/byGeo/${lat}/${lon}`
    );

    return response.data;
    // for showcasing purposes
    // return {
    //   label: "Qiryat Ono",
    //   value: "215847",
    // };
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
    setGeoLoading(state, action) {
      state.geoLoading = action.payload;
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
    setIgnoreGeoLocation(state, action) {
      state.ignoreGeoLocation = action.payload;
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
    builder.addCase(getCityByGeoLocation.pending, (state) => {
      state.loading = true;

      state.error = null;
      state.currentCity = null;
    });
    builder.addCase(getCityByGeoLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentCity = action.payload;
    });
    builder.addCase(getCityByGeoLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.currentCity = null;
    });
  },
});

export const {
  setCurrentCity,
  updateFavoriteCities,
  setIgnoreGeoLocation,
  setGeoLoading,
} = search.actions;
export default search.reducer;
