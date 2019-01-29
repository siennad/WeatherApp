import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

class MainPage extends Component {
    render () {
        return (
            <div>
                <NavBar />
                <SearchBar />
            </div>
        )
    }
}

export default withRouter(MainPage)