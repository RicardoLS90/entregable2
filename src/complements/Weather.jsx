import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = () => {

  const [weather,setWeather]= useState({})
  const [icon,setIcon]= useState({})
  const [temperture,setTemperture]= useState(true)

  useEffect(()=>{
    function success(pos) {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f728b52e952f91b3788d4d6b02d803c6`)
        .then((res)=> setWeather(res.data) )
    }
    navigator.geolocation.getCurrentPosition(success);
  },[])

  const changeTemp=()=>{
    setTemperture(!temperture)
  }


console.log(weather);
  

  return (
    <div className='bigcontainer'>
      <div className='header'>
        <h1>Wheather App</h1>   
        <h2>
          <i className="fa-solid fa-location-dot"></i>{"  "}
          {weather.name}{" "}
          {weather.sys?.country}
          </h2>
      </div>
      <div className='container'>
        <div className='main'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <h3>{temperture ? (weather.main?.temp-273.15).toFixed(2): ((weather.main?.temp-273.15)*9/5 +32).toFixed(2) }
                {" "}{temperture ? "C°" : "F°"}</h3>
            <button onClick={changeTemp}>C°/F°</button>
            <h3 className='description'>"{weather.weather?.[0].description}"</h3>
        </div>

        <div className='second'>  
            <ul>
              <div className='wind weather'>
                <i className="fa-solid fa-wind"></i>
                <h3>Wind speed:   {weather.wind?.speed}</h3>
              </div>
              <div className='cloud weather'>
                <i className="fa-solid fa-cloud"></i>
                <h3>cloud:  {weather.clouds?.all}%</h3>
              </div>
              <div className='pressure weather'>
                <i className="fa-solid fa-gauge-high"></i>
                <h3>Pressure:  {weather.main?.pressure} mb</h3>
              </div>
            </ul>
        </div>
      </div>

    </div>
  );
};

export default Weather;

  

  
