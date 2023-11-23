import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const CLIENT_URI = import.meta.env.VITE_REACT_CLIENT_URI as string;

interface City {
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
}

const initialState: SearchState = {
  loading: false,
  error: null,
  cities: null,
  currentCity: { value: "215854", label: "Tel Aviv" },
};

export const getCity = createAsyncThunk<
  City[],
  string,
  { rejectValue: string }
>("search/getCity", async (city, thunkAPI) => {
  try {
    const response = await axios.get(`${CLIENT_URI}/api/cities/${city}`);
    console.log("response", response.data);

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

export const { setCurrentCity } = search.actions;
export default search.reducer;
