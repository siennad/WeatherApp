import React from 'react';
import ReactDom from 'react-dom';
import Redux, { createStore, applyMiddleware, compose } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import reducers from './reducers'
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, 
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : composeEnhancers(applyMiddleware(thunk, createLogger())))
const reactTarget = document.getElementById('react-target');

const startApp = () => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <App cordova={window.cordova ? true : false} />
            </Provider>
        </AppContainer>,
        reactTarget
    );
}

if(!window.cordova) {
    startApp()
 } else {
    document.addEventListener('deviceready', startApp, false)
}