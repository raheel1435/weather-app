import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import WeatherDisplay from './Components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');
        setWeather(null);
        setBgImage('');

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }

        const data = await res.json();
        setWeather(data);
        fetchBackground(query, data.weather[0].main);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  const fetchBackground = async (cityName, condition) => {
    try {
      const searchQuery = encodeURIComponent(`${cityName} ${condition}`);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setBgImage(data.results[0].urls.full);
      }
    } catch {
      // background image is non-critical, fail silently
    }
  };

  const handleSearch = (cityName) => {
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setQuery(cityName);
  };

  return (
    <div
      className={`App${bgImage ? ' has-bg' : ''}`}
      style={bgImage ? { '--bg-image': `url(${bgImage})` } : {}}
    >
      <Header />
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherDisplay data={weather} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
