import fetch from 'isomorphic-fetch';
import Promise from 'promise';

const API_KEY = 'eedb2d2eed11268a3e405ede2dfc862d'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5'

const C_UNIT = 'Celsius'
const F_UNIT = 'Fahrenheir'
const K_UNIT = 'Kelvin'
let  DEFAULT_UNIT = C_UNIT

// func to convert unit of temps
const kelvinToCelsius = (kelvin) => kelvin - 273.15;
const kelvinToFahrenheir = (kelvin) => (kelvin -273.15) * 9 / 5 + 32
const converter = (type, val) => {
    switch (type) {
        case C_UNIT:
            return kelvinToCelsius(val)
        case F_UNIT: 
            return kelvinToFahrenheir(val)
        case K_UNIT:
        default:
            return val
    }
}
const round = (value, decimals = 1) => {
    const x = Math.pow(10, decimals);
    return Math.round(x * value) / x;
}

const apiCall = (url) => {
    return fetch(url)
        .then(res => {
            return (res.status >= 400) ? Promise.reject('Invalid respond') : res.json()
        })
        .then(json => {
            return (parseInt(json.cod) !== 200) ? Promise.reject('Invalid respond') : json
        })
}

export const queryWeather = (city) => {
  let data;

  return apiCall(`${WEATHER_URL}/weather?q=${city.trim()}&appid=${API_KEY}`)
      .then(respond => {
          console.log(respond);
          data = {
            tempNow: round(converter(DEFAULT_UNIT, respond.main.temp), 0),
            iconCodeNow: respond.weather[0].icon,
            locationName: respond.name,
            locationID: respond.id,
            country: respond.sys.country,
            windNow: respond.wind.speed
          }

          return apiCall(`${WEATHER_URL}/forecast?q=${city.trim()},${data.country.toLowerCase()}&appid=${API_KEY}`)
      })
      .then(respond => {
        return {
          ...data,
          forecast: respond.list.slice(0, 8).map((d) => ({
            day: (new Date(d.dt * 1000)).getDay(),
            hour: (new Date(d.dt * 1000)).getHours(),
            icon: d.weather[0].icon,
            temp: round(converter(DEFAULT_UNIT,d.main.temp), 0),
            wind: d.wind.speed
          }))
        }
      });      
}