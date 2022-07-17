import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Weather/Weather';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
