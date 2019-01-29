import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

class MainPage extends Component {
    render () {
        return (
            <div>
                <h1> Weather Forecast</h1>
                <SearchBar />
            </div>
        )
    }
}

export default MainPage