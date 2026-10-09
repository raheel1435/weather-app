import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import WeatherDisplay from './Components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';
import './App.css';

export function backgroundQueries(data) {
  const city = data.name;
  const condition = data.weather[0].main.toLowerCase();
  const temp = data.main.temp;
  const season = temp <= 0 ? 'winter snow' : temp <= 10 ? 'cold' : temp >= 28 ? 'summer sunshine' : temp >= 20 ? 'summer' : 'mild weather';
  const scene = /snow/.test(condition) ? 'snow winter' : /rain|drizzle|thunderstorm/.test(condition) ? 'rain' : /mist|fog|haze/.test(condition) ? 'fog' : condition === 'clear' ? 'sunny' : 'cloudy';
  return [`${city} landmark ${scene} ${season}`, `${city} ${scene}`, `${city} landmark`];
}

function App() {
  const [target, setTarget] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [locationMessage, setLocationMessage] = useState('');
  const locationRequest = useRef(0);

  const locate = useCallback(() => {
    const request = ++locationRequest.current;
    if (!navigator.geolocation) {
      setLocationMessage('Location is unavailable. Search for a city instead.');
      return;
    }
    setLocationMessage('Finding your location…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (request !== locationRequest.current) return;
        setLocationMessage('');
        setTarget({ lat: coords.latitude, lon: coords.longitude });
      },
      () => {
        if (request !== locationRequest.current) return;
        setLocationMessage('Location could not be accessed. Allow location access or search for a city.');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    locate();
    return () => { locationRequest.current += 1; };
  }, [locate]);

  useEffect(() => {
    if (!target) return;
    const controller = new AbortController();
    const { signal } = controller;
    const fetchBackground = async (data) => {
      const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
      if (!key) return;
      try {
        for (const query of backgroundQueries(data)) {
          const params = new URLSearchParams({ query, per_page: '1', orientation: 'landscape', client_id: key.trim() });
          const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, { signal });
          if (!res.ok) return;
          const results = await res.json();
          const image = results.results?.[0];
          if (!image) continue;
          // Wait for the image before showing its credit or applying the background.
          const url = image.urls.regular || image.urls.full;
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
          });
          if (signal.aborted) return;
          setBgImage(url);
          setPhoto({ name: image.user.name, url: image.user.links.html, imageUrl: image.links.html });
          return;
        }
      } catch {
        // Weather remains usable when photos or the image host are unavailable.
      }
    };
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      setWeather(null);
      setBgImage('');
      setPhoto(null);
      try {
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        if (!key) throw new Error('Weather is not configured. Please contact the site owner.');
        const params = new URLSearchParams({ units: 'metric', appid: key.trim() });
        if (target.city) params.set('q', target.city);
        else { params.set('lat', target.lat); params.set('lon', target.lon); }
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`, { signal });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Weather could not be loaded.');
        if (signal.aborted) return;
        setWeather(data);
        fetchBackground(data);
      } catch (err) {
        if (!signal.aborted) setError(err.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fetchWeather();
    return () => controller.abort();
  }, [target]);

  const handleSearch = (cityName) => {
    const city = cityName.trim();
    if (!city) { setError('Please enter a city name'); return; }
    locationRequest.current += 1;
    setLocationMessage('');
    setTarget({ city });
  };

  const creditUrl = (url) => `${url}${url.includes('?') ? '&' : '?'}utm_source=skycast&utm_medium=referral`;

  return (
    <div className={`App${bgImage ? ' has-bg' : ''}`} style={bgImage ? { '--bg-image': `url(${bgImage})` } : {}}>
      <Header />
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        <button type="button" onClick={locate} style={{ margin: '10px', padding: '8px 14px', borderRadius: '20px', border: '1px solid #ffffff66', background: '#00000033', color: 'white', cursor: 'pointer' }}>Use my location</button>
        {locationMessage && <p role="status">{locationMessage}</p>}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherDisplay data={weather} />}
        {photo && <p style={{ fontSize: '12px', margin: '12px 0' }}>Photo by <a style={{ color: 'white' }} href={creditUrl(photo.url)} target="_blank" rel="noreferrer">{photo.name}</a> on <a style={{ color: 'white' }} href={creditUrl(photo.imageUrl)} target="_blank" rel="noreferrer">Unsplash</a></p>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
