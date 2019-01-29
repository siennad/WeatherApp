import React, { Component } from 'react';
import MainPage from './components/MainPage';
import LocationPage from './components/LocationPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
    render () {
        return (
          <Router>  
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/location/:id" component={LocationPage} />
            </Switch>    
          </Router>
        )
    }
}

export default App