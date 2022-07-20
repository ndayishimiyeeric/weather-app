import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Weather/Weather';
import citiesReducer from './Cities/Cities';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cities: citiesReducer,
  },
});

export default store;
