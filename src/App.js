import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ReduxThunk from 'redux-thunk';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import localForage from 'localforage';
import MainPage from './components/MainPage';
import LocationPage from './components/LocationPage';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);

    //init db
    localForage.config({
      driver: localForage.INDEXEDDB,
      name: 'ForecastWeatherStorage',
      version: 1.0,
      storeName: 'WeatherStorage', // Should be alphanumeric, with underscores.
      description: 'db to store location name'
    });
    console.log('Database init complete');
  }

  
  render() {
    
    const btn = <Button>sth here</Button>
    return (
      <>
      {true && btn}
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route
            path="/location/:id"
            render={props => <LocationPage {...props} />}
          />
        </Switch>
      </Router>
      </>
    );
  }
}

export default App;
