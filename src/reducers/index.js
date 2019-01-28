import {
    ADD_LOCATION,
    REMOVE_LOCATION,
    SEARCH_LOCATION,
    REQUEST_WEATHER,
    RECEIVED_WEATHER,
    SET_FETCH_ERROR,    
    RECEIVED_LOCATION
} from '../actions';

const initState = {
    isLocated: false,
    isFetching: false,
    isInvalid: true,
    temp: 0,
    icon: -1,
    humidity: 0
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case SEARCH_LOCATION:
            return {
                ...state,
                isFectching: true,
                isInvalid: false,
            }
        case RECEIVED_LOCATION:
            return {
                ...state,
                isFetching: true,
                isInvalid: false,
                ...action,
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isInvalid: true,
                isFetching: false
            }
    }
}

export default reducers;