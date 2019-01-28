import {v4 as generateId} from 'node-uuid';
import { queryLocation } from './../api/index';

export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION ='REMOVE_LOCATION';
export const SELECT_LOCATION ='SELECT_LOCATION';

export const SEARCH_LOCATION ='SEARCH_LOCATION';
export const RECEIVED_LOCATION = 'RECEIVED_LOCATTION';

export const REQUEST_WEATHER='REQUEST_WEATHER';
export const RECEIVED_WEATHER='RECEIVED_WEATHER';

export const SET_FETCH_ERROR='SET_FETCH_ERROR';

export const searchLocation = (val) => ({
    type: SEARCH_LOCATION,
    val: val
})

export const receiveLocation = (data) => ({
    type: RECEIVED_LOCATION,
    ...data
})

export const setFetchError = (id = null) => ({
    type: SET_FETCH_ERROR
})
// func to fetch location from api
export const fetchLocation = (val) => {
    console.log('fetching locations...')
    return (dispatch, getState) => {
        dispatch(searchLocation(val));
        queryLocation(val)
            .catch(() => dispatch(setFetchError))
            .then((data) => {
                dispatch(receiveLocation(data))
                console.log(data);                
            })
    }
}