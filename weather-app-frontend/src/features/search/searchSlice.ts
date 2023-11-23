import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// interface City {
//   name: string;
//   originCountry: string;
//   key: string;
// }
interface SearchState {
  loading: boolean;
  error: string | null;
  // cities: City[] | null;
  cities: object[] | null;
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
      const response = await axios.get(
        `http://localhost:5000/api/cities/${city}`
      );
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
      // state.cities = [{ label: "loading...", value: "loading..." }];
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

export default search.reducer;
