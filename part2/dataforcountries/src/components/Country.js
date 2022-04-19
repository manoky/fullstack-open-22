import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const WEATHER_API = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const IMG_URL = "https://openweathermap.org/img/wn";

const CountryWeather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`${IMG_URL}/${weather.weather[0].icon}@2x.png`} alt="" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(WEATHER_API(country.capital[0]))
      .then((res) => setWeather(res.data))
      .catch((err) => console.error(err));
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png || country.flags.svg} alt="" />
      </div>

      {weather && <CountryWeather weather={weather} />}
    </div>
  );
};

export default Country;
