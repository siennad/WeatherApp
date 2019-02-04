import { v4 as generateId } from 'node-uuid';
import { queryWeather } from './../api/index';

export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const VIEW_LOCATION = 'VIEW_LOCATION';

export const ADD_FAV = 'ADD_FAVOURITE';
export const REMOVE_FAV = "REMOVE_FAVOURITE";

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVED_WEATHER = 'RECEIVED_WEATHER';

export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

export const addLocation = (location) => ({
  type: ADD_LOCATION,
  name: location.name,
  id: location.id
})

export const addFav = (id) => ({
  type: ADD_FAV,
  id
})

export const removeFav = (id) => ({
  type: REMOVE_FAV,
  id
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
  return (dispatch, getState) => {
    dispatch(requestWeather(location.id))
    dispatch(forceUpdateWeather(location))
  }
}

export const forceUpdateWeather = (location) => {
  return (dispatch) => {
    console.log('force update')
    queryWeather(location.name)
      .catch(() => dispatch(setFetchError(location.id)))
      .then((data) =>  {
        console.log(data);
        dispatch(receiveWeather(location.id, data)) 
      })
  }
}

export const selectLocation = (location) => {

  return (dispatch, getState) => {
    let isLocationExist = (getState().locations[location.id]) ? true : false;
    if (!isLocationExist) {
      dispatch(addLocation(location))
      dispatch(fetchWeatherInNewLocation(location))
    } else {
      dispatch( fetchWeatherInSavedLocation(location.id) )
    }
  }
}