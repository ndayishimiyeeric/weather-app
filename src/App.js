import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchWeather } from './redux/Weather/Weather';
import Search from './components/search/Search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import './App.css';

function App() {
  const [Data, setData] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (searchData) => {
    setData(searchData);
    console.log(searchData);
  };

  useEffect(() => {
    if (Data) {
      dispatch(fetchWeather(Data.value));
    }
  }, [Data, dispatch]);

  const weather = useSelector((state) => state.weather);
  console.log(weather);

  return (
    <div className="container">
      <Search onSearch={handleChange} />
      {weather.weather && <CurrentWeather data={weather.weather} />}
      {weather.forecast && <Forecast data={weather.forecast} />}
    </div>
  );
}

export default App;
