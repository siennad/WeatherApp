import fetch from 'isomorphic-fetch';
import Promise from 'promise';

const API_KEY = 'eedb2d2eed11268a3e405ede2dfc862d'
const API_URL = 'https://api.openweathermap.org/data/2.5'

const C_UNIT = 'Celsius'
const F_UNIT = 'Fahrenheir'
const K_UNIT = 'Kelvin'
let  DEFAULT_UNIT = C_UNIT

const CITY_URL = '../../www/dataList/cityList.json'

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

export const queryLocation = (val) => {
    let data;

    return apiCall(`${CITY_URL}`)
        .then(respond => {
            console.log(respond);
            respond.filter(res => res.name.includes(val) || res.country.includes(val))
        })
        .then(res => {
            console.log(res);
            data = {
                name: res.name,
                country: res.country,
                id: res.id
            }
            console.log(data)
            return data
        })
}