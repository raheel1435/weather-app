function WeatherDisplay ({ data }) {
    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.main.temp}°C</p>
            <p>{data.weather[0].description}</p>
            <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
            />
        </div>
    );
}

export default WeatherDisplay;