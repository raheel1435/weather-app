import {useState} from 'react';
import SearchBar from './Components/SearchBar';
import WeatherDisplay from './Components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';


function App() {
const [city, setCity] = useState('');
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
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
       `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=7376f7d859649396020c0ddeb8d373a3`
    );
    
    if (!res.ok) {
      const errorData = await res.json();
      console.log("Real Error:", errorData);
      throw new Error(errorData.message);
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
    <SearchBar onSearch= {fetchWeather} />

    {loading && <Loader />}
    {error && <ErrorMessage message={error} />}
    {weather && <WeatherDisplay data={weather} />}
  </div>
);
}

export default App;