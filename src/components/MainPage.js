import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import SearchBar from './SearchBar';
import NavBar from './NavBar';
import LocationList from './LocationList';

class MainPage extends Component {
  render() {
    return (
      <Paper style={{ backgroundColor: '#fdf0f6', height: '100vh' }}>
        <NavBar />
        <SearchBar />
        <LocationList />
      </Paper>
    );
  }
}

export default MainPage;
