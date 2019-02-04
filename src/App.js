import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from './components/MainPage';
import LocationPage from './components/LocationPage';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>  
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/location/:id" render = {props => <LocationPage {...props} /> }  />
        </Switch>    
      </Router>
    )
  }
}

export default (App)