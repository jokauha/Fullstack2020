import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {

    const [ weather, setWeather ] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const api_request = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital

    useEffect(() => {
        axios
          .get(api_request)
          .then(response => {
              console.log(response.data.current)
              setWeather(response.data.current)
          })
      }, [api_request])

    console.log(country)
    return (
        <div>
            <h1>{country.name}</h1>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => {
                    return <li key={language.iso639_1}>{language.name}</li>
                })}
            </ul>
            <img src={country.flag} alt="flag" width="200"></img>
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt="weather_icon" width="50"></img>
            <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>

        </div>
    )
}

export default Country