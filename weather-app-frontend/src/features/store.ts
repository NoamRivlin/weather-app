import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search/searchSlice";
import weatherSlice from "./weather/weatherSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    weather: weatherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
