import fetch from 'isomorphic-fetch';
import Promise from 'promise';

const API_KEY = 'eedb2d2eed11268a3e405ede2dfc862d';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';

const C_UNIT = 'Celsius';
const F_UNIT = 'Fahrenheir';
const K_UNIT = 'Kelvin';
let DEFAULT_UNIT = C_UNIT;

// func to convert unit of temps
const kelvinToCelsius = kelvin => kelvin - 273.15;
const kelvinToFahrenheir = kelvin => ((kelvin - 273.15) * 9) / 5 + 32;
const converter = (type, val) => {
  switch (type) {
    case C_UNIT:
      return kelvinToCelsius(val);
    case F_UNIT:
      return kelvinToFahrenheir(val);
    case K_UNIT:
    default:
      return val;
  }
};

const round = (value, decimals = 1) => {
  const x = Math.pow(10, decimals);
  return Math.round(x * value) / x;
};

const getdate = val => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayInWeek = days[new Date(val * 1000).getDay()];

  const dayInMonth = new Date(day * 1000).getDate();
  const month = new Date(day * 1000).getMonth() + 1;
  const year = new Date(day * 1000).getFullYear();

  const date = `${dayInWeek}, ${dayInMonth}/${month}/${year}`;
  return date;
};

const gethour = hour => {
  return `${hour}:00`;
};

const apiCall = async url => {
  return await fetch(url)
    .then(res => {
      return res.status >= 400 ? Promise.reject('Invalid respond') : res.json();
    })
    .then(json => {
      return parseInt(json.cod) !== 200
        ? Promise.reject('Invalid respond')
        : json;
    });
};

export const queryWeather = city => {
  let data;

  return apiCall(`${WEATHER_URL}/weather?q=${city.trim()}&appid=${API_KEY}`)
    .then(respond => {
      data = {
        tempNow: round(converter(DEFAULT_UNIT, respond.main.temp), 0),
        iconCodeNow: respond.weather[0].icon,
        weatherNow: respond.weather[0].main,
        locationName: respond.name,
        locationID: respond.id,
        country: respond.sys.country,
        windNow: round(respond.wind.speed, 0),
        updatedTime: `${new Date().getHours()}:${new Date().getMinutes()}`
      };

      return apiCall(
        `${WEATHER_URL}/forecast?q=${city.trim()},${data.country.toLowerCase()}&appid=${API_KEY}`
      );
    })
    .then(respond => {
      console.log(respond);
      return {
        ...data,
        forecast: respond.list.slice(0, 10).map(d => ({
          day: new Date(d.dt * 1000).toDateString(), //getdate(d.dt),
          hour: gethour(new Date(d.dt * 1000).getHours()),
          icon: d.weather[0].icon,
          weather: d.weather[0].main,
          temp: round(converter(DEFAULT_UNIT, d.main.temp), 0),
          wind: round(d.wind.speed, 0)
        }))
      };
    });
};
