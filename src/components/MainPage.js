import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import SearchBar from './SearchBar';
import NavBar from './NavBar';

class MainPage extends Component {
    render () {
        return (
            <Paper>
                <NavBar />
                <SearchBar />
            </Paper>
        )
    }
}

export default MainPage