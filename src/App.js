import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import localForage from 'localforage';
import MainPage from './components/MainPage';
import LocationPage from './components/LocationPage';

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
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route
            path="/location/:id"
            render={props => <LocationPage {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
