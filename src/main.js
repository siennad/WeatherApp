import React from 'react';
import ReactDom from 'react-dom';
import Redux, {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {platform} from 'onsenui';

import reducers from './reducers'
import App from './App';

const store = createStore(reducers, 
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger()))
const reactTarget = document.getElementById('react-target');

const startApp = () => {
    console.log(window.cordova)
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <App 
                    cordova={window.cordova ? true : false} 
                    platform={platform.isAndroid() ? 'Android' : 'default'}/>
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
console.log("webpack bundle works");
