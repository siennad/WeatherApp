import {v4 as generateId} from 'node-uuid';
import { queryWeather } from './../api/index';

export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION ='REMOVE_LOCATION';
export const SELECT_LOCATION ='SELECT_LOCATION';
export const VIEW_LOCATION ='VIEW_LOCATION';

export const REQUEST_WEATHER='REQUEST_WEATHER';
export const RECEIVED_WEATHER='RECEIVED_WEATHER';

export const SET_FETCH_ERROR='SET_FETCH_ERROR';

export const addLocation = (location) => ({
  type: ADD_LOCATION,
  name: location.name,
  id: generateId(),
})

export const removeLocation = (id) => ({
  type: REMOVE_LOCATION,
  id
})

export const viewLocation = (id) => ({
  type: VIEW_LOCATION,
  id
})

export const requestWeather = (id) => ({
  type: REQUEST_WEATHER,
  id
})

export const receiveWeather = (id, data) => ({
  type: RECEIVED_WEATHER,
  id,
  ...data
})

export const setFetchError = (id) => ({
  type: SET_FETCH_ERROR,
  id
})

//func to fetch weather from api
export const fetchWeatherInSavedLocation = (id) => {
  return (dispatch, getState) => {
    const location = getState().locations[id];
    // TODO: check if updated time is Over 10 mins so update weather, if not, return ${location} 
    dispatch(forceUpdateWeather(location));
  } 
}

export const fetchWeatherInNewLocation = (location) => {
  return (dispatch) => {
    dispatch(requestWeather(location.id));
    forceUpdateWeather(location)
  }
}

export const forceUpdateWeather = (location) => {
  return (dispatch) => {
    queryWeather(location.name)
    .catch(() => dispatch(setFetchError(location.id)))
    .then((data) => dispatch(receiveWeather(location.id, data)))
  }
}

export const selectLocation = (location) => {
  let isLocationExist = (getState().locations[location.originId]) ? true : false;
  
  if (!isLocationExist) {
    dispatch(addLocation(location));
    dispatch(fetchWeatherInNewLocation(location))
  } else {
    dispatch(fetchWeatherInSavedLocation(location.id))
  }
  
}