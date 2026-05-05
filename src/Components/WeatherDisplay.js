import "./WeatherDisplay.css";

// REVIEW: Nice job using destructuring at the top much easier to read than
// REVIEW: writing `data.main.temp`, `data.weather[0].description` etc. throughout.
// REVIEW:
// REVIEW: One bigger architectural idea worth thinking about: this component is
// REVIEW: tightly COUPLED to the OpenWeatherMap API's exact response shape. If you
// REVIEW: ever swapped to a different weather API (e.g. Weatherstack or Open-Meteo),
// REVIEW: every line in here would break. The fix is sometimes called an
// REVIEW: "anti-corruption layer": in App.js (or a separate file), reshape the API
// REVIEW: response into your OWN clean shape:
// REVIEW:   { city, country, tempC, feelsLikeC, humidity, windMs, iconUrl, ... }
// REVIEW: Then this component takes THAT shape, and the API-specific code lives in
// REVIEW: one place. Bonus: the component becomes much easier to test.
function WeatherDisplay({ data }) {
  // REVIEW: This destructure assumes `weather`, `sys`, `main`, and `wind` ALL exist
  // REVIEW: on `data`. If the API ever returns a partial response (or you swap APIs),
  // REVIEW: any missing field crashes the component with "Cannot read 'country' of
  // REVIEW: undefined". Two ways to guard:
  // REVIEW:   1) Add PropTypes (or TypeScript later) so the contract is explicit.
  // REVIEW:   2) Use optional chaining: `sys?.country`, `weather?.[0]?.icon`, etc.
  // REVIEW: Lesson: every property you read is a quiet assumption. Make assumptions
  // REVIEW: explicit, especially with data that comes from outside your code (APIs).
  const { name, sys, main, weather, wind } = data;

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h2>
          {name}, {sys.country}
        </h2>
      </div>

      <div className="weather-main">
        {/* REVIEW: Good thinking using `weather[0].description` for alt text */}
        {/* REVIEW: gives screen reader users meaningful info ("light rain"). */}
        {/* REVIEW: One subtle point: the description and the temperature are also */}
        {/* REVIEW: shown as visible text just below. That means screen readers will */}
        {/* REVIEW: announce "light rain" twice once from the icon, once from the */}
        {/* REVIEW: paragraph. When an icon is decorative (the meaning is already in */}
        {/* REVIEW: nearby text), use alt="" instead. Lesson: alt text isn't always */}
        {/* REVIEW: about describing the image sometimes it's about NOT duplicating */}
        {/* REVIEW: information. Search "MDN decorative images alt" for more. */}
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        {/* REVIEW: The temperature shows just "°" with no "C" or "F". Anyone seeing */}
        {/* REVIEW: "22°" might wonder which scale you're using. Easy fix: write "°C". */}
        {/* REVIEW: Bigger feature idea for later: a unit toggle so users can switch */}
        {/* REVIEW: between Celsius and Fahrenheit. */}
        <span className="weather-temp">{Math.round(main.temp)}°</span>
      </div>

      <p className="weather-description">{weather[0].description}</p>

      <div className="weather-details">
        {/* REVIEW: Notice you have FOUR very similar `<div className="detail">` blocks */}
        {/* REVIEW: that only differ by label and value. That's a sign there's a small */}
        {/* REVIEW: helper component hiding inside. Try extracting: */}
        {/* REVIEW:   function Detail({ label, value }) { ... } */}
        {/* REVIEW: Then this section becomes 4 short lines: */}
        {/* REVIEW:   <Detail label="Feels like" value={`${Math.round(main.feels_like)}°C`} /> */}
        {/* REVIEW: Lesson: spotting and removing repetition is one of the most */}
        {/* REVIEW: valuable habits in programming. Three similar blocks = think about */}
        {/* REVIEW: extracting. (But only AFTER the third — extracting too early is */}
        {/* REVIEW: also a trap. The "Rule of Three" is a useful heuristic.) */}
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
          {/* REVIEW: Inconsistency to notice: temperature has a unit suffix ("°C"), */}
          {/* REVIEW: humidity has one ("%"), and wind has one ("m/s") but the main */}
          {/* REVIEW: temp at the top has no suffix at all. Either always include */}
          {/* REVIEW: units or never. Consistency matters more than which one you pick. */}
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span className="detail-label">H / L</span>
          <span className="detail-value">
            {Math.round(main.temp_max)}° / {Math.round(main.temp_min)}°
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
