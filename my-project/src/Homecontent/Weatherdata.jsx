import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import search from "./Images/search.png";
import humidity from "./Images/humidity.png";
import wind from "./Images/wind.jpg";
import Clouds from "./Images/Clouds.jpg";
import Clear from "./Images/Clear.jpg";
import Rain from "./Images/Rain.jpg";
import Mist from "./Images/Mist.jpg";
import Drizzle from "./Images/Drizzle.jpg";

function Weather() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    weatherCondition: 'Clouds',
    weatherdescription: "",
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState({
    colors: ['red', 'orange', 'teal'],
    clothing: 'Wear casual clothing with layers to stay warm.',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/clothingSuggestions')
      .then((res) => {
        setSuggestion(res.data[data.weatherCondition]);
      })
      .catch((err) => {
        console.error('Error fetching clothing suggestions:', err);
      });
  }, [data.weatherCondition]); 
  

  const fetchDataByCityName = (cityName) => {
    axios.get(`http://localhost:3000/weather/${cityName}`)
      .then((res) => {
        const weatherData = res.data;
        const imagePath = getWeatherImage(weatherData.weather[0].main);
        setData({
          ...data,
          celcius: weatherData.main.temp,
          name: weatherData.name,
          humidity: weatherData.main.humidity,
          speed: weatherData.wind.speed,
          weatherCondition: weatherData.weather[0].main,
          weatherdescription: weatherData.weather[0].description,
        });
        setError('');
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Invalid City Name');
        } else {
          setError('Error fetching weather data');
        }
      });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Your browser is not supported by the geolocation API");
    }
  };

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    fetchDataByLocation(latitude, longitude);
  };

  const onError = (error) => {
    alert("Error getting geolocation: " + error.message);
  };

  const fetchDataByLocation = (latitude, longitude) => {
    axios.get(`http://localhost:3000/weather/coordinates/${latitude}/${longitude}`)
      .then((res) => {
        const weatherData = res.data;
        const imagePath = getWeatherImage(weatherData.weather[0].main);
        setData({
          ...data,
          celcius: weatherData.main.temp,
          name: weatherData.name,
          humidity: weatherData.main.humidity,
          speed: weatherData.wind.speed,
          weatherCondition: weatherData.weather[0].main,
          weatherdescription: weatherData.weather[0].description,
        });
        setError('');
      })
      .catch((err) => {
        setError('Error fetching weather data');
        console.error(err);
      });
  };

  const handleClick = () => {
    if (name !== "") {
      fetchDataByCityName(name);
    }
  };

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clouds':
        return Clouds;
      case 'Clear':
        return Clear;
      case 'Rain':
        return Rain;
      case 'Drizzle':
        return Drizzle;
      case 'Mist':
        return Mist;
      default:
        return Clouds;
    }
  };

  return (
      <div className='wea-container'>
        <div className='weather'>
        <h2>Choose the dress color based on your Weather Data</h2>
          <div className='search'>
            <input type="text" placeholder='Enter your city' value={name} onChange={e => setName(e.target.value)} />
            <button><img src={search} alt="" onClick={handleClick} /></button>
          </div>
          <div className='error'>
            <p>{error}</p>
          </div>
          <div className='separator'></div>
          <button className='wea-button' onClick={handleLocation}>Get Device Location</button>
          <div className='winfo'>
          <img src={getWeatherImage(data.weatherCondition)} alt="" />
            <h2>{Math.round(data.celcius)}°C</h2>
            <h3>{data.name}</h3>
            <h4>{data.weatherdescription}</h4>
            <div className='details-container'>
              <div className='col'>
                <img src={humidity} alt="" />
                <div className='humidity'>
                  <p>{data.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className='col'>
                <img src={wind} alt="" />
                <div className='wind'>
                  <p>{Math.floor(data.speed)}km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
            <div className='suggested-dress'>
              <span className="color-suggestion">Dress Colors: <span className="color-names">{suggestion.colors.join(', ')}</span></span>
              <span className="clothing-suggestion">Clothing: <span className="clothing-names">{suggestion.clothing}</span></span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Weather;

