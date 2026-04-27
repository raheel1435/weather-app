import './WeatherDisplay.css';

function WeatherDisplay({ data }) {
  const { name, sys, main, weather, wind } = data;

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h2>{name}, {sys.country}</h2>
      </div>

      <div className="weather-main">
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <span className="weather-temp">{Math.round(main.temp)}°</span>
      </div>

      <p className="weather-description">{weather[0].description}</p>

      <div className="weather-details">
        <div className="detail">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span className="detail-label">H / L</span>
          <span className="detail-value">{Math.round(main.temp_max)}° / {Math.round(main.temp_min)}°</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
