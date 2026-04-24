import {useState} from 'react';
import searchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';


function App() {
const [city,setCity] = useState('');
const [weather, setWeather] = useState(null);
const [loading, setLoading] = setState(false);
const [error, setError] = useState('');

const fetchWeather = async (cityName) => {
  if (!cityName) {
    setError('Please enter a city name');
    return;
  }

  try {
    setLoading(true);
    setError('');
    setWeather(null);

    const res = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    
    if (!res.ok) {
      throw new Error('city not found');
    }

    const data = await res.json();
    setWeather(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="App">
    <searchBar onSearch= {fetchWeather} />

    {loading && <Loader />}
    {error && <ErrorMessage message={error} />}
    {weather && <WeatherDisplay data={weather} />}
  </div>
);
}