import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: null,
  forecast: null,
};

export const WAETHER_API_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API_KEY = 'f85ff568e8ba28d905955bac34c62309';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (searchData, { rejectWithValue }) => {
    const [lat, long] = searchData.split(' ');

    const CurrentWeatherFetch = fetch(
      `${WAETHER_API_URL}/weather?lat=${lat}&lon=${long}&APPID=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFecth = fetch(
      `${WAETHER_API_URL}/forecast?lat=${lat}&lon=${long}&APPID=${WEATHER_API_KEY}&units=metric`
    );
    const [CurrentWeather, forecastData] = await Promise.all([
      CurrentWeatherFetch,
      forecastFecth,
    ]);
    if (CurrentWeather.status !== 200) {
      return rejectWithValue({ error: 'Error fetching weather' });
    }
    if (forecastData.status !== 200) {
      return rejectWithValue({ error: 'Error fetching forecast' });
    }
    const [weather, forecast] = await Promise.all([
      CurrentWeather.json(),
      forecastData.json(),
    ]);
    return { weather, forecast };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action.payload.weather;
      state.forecast = action.payload.forecast;
    });
  },
});

export default weatherSlice.reducer;
