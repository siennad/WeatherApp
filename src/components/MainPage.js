import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SearchBar from './SearchBar';
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