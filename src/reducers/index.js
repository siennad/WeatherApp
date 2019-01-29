import {
  ADD_LOCATION,
  REMOVE_LOCATION,
  REQUEST_WEATHER,
  RECEIVED_WEATHER,
  SET_FETCH_ERROR,    
  SELECT_LOCATION
} from '../actions';

import {combineReducers} from 'redux';

const initState = {
  isFetching: false,
  isInvalid: true,
  temp: 0,
  icon: -1,
}

const location = (state = initState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return {
        id: action.id,
        locationName: action.name,
        ...state
      }
    case REQUEST_WEATHER:
      return {
          ...state,
          isFetching: true,
          isInvalid: false,
      }
    case RECEIVED_WEATHER: 
      return {
        ...state,
        isFetching: false,
        isInvalid: false,
        ...action
      }
    case SET_FETCH_ERROR:
      return {
          ...state,
          isInvalid: true,
          isFetching: false,
      }
    default:
      return state
  }
}

const locations = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return {
        ...state,
        [action.id]: location(undefined, action)
      }
    case REMOVE_LOCATION:
      const {...rest} = state;
      delete rest[action.id];
      return rest;
    case SET_FETCH_ERROR:
    case REQUEST_WEATHER:
    case RECEIVED_WEATHER:
      return {
        ...state,
        [action.id]: location({...state[action.id]}, action)
      }
    default:
      return state
  }
}

const selectedLocation = (state = null, action) => {
  return (action.type === SELECT_LOCATION) ? action.id : state
}

const reducers = combineReducers({locations, selectedLocation})

export default reducers;