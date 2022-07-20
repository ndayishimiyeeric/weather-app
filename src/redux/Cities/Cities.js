import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: null,
  isLoading: false,
};

export const Geoptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '05fb592477msh7ead4be030b6b24p12fd34jsn0cdaa3c381e8',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (payload) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?limit=10&minPopulation=1000000&namePrefix=${payload}`,
      Geoptions
    );

    if (response.status !== 200) {
      throw new Error('Error fetching cities');
    }

    const cities = await response.json();
    const options = cities.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));
    return options;
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      });
  },
});

export default citiesSlice.reducer;
