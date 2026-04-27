import { useState } from 'react';
import SearchBar from './Components/SearchBar';
import WeatherDisplay from './Components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('');

  const fetchBackground = async (cityName, condition) => {
    const query = encodeURIComponent(`${cityName} ${condition}`);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      setBgImage(data.results[0].urls.full);
    }
  };

  const fetchWeather = async (cityName) => {
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWeather(null);
      setBgImage('');

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      setWeather(data);
      await fetchBackground(cityName, data.weather[0].main);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`App${bgImage ? ' has-bg' : ''}`}
      style={bgImage ? { '--bg-image': `url(${bgImage})` } : {}}
    >
      <h1 className="app-title">Weather</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherDisplay data={weather} />}
    </div>
  );
}

export default App;
