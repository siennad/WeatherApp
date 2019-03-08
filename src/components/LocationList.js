import React, { Component } from 'react';
import localForage from 'localforage';
import cloneDeep from 'lodash/cloneDeep';
class LocationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedLocations: []
    };

    localForage
      .iterate((cityDataFromDb, key, iterationNumber) => {
        let currentCities = cloneDeep(this.state.savedCities);
        currentCities.push(cityDataFromDb);
        this.setState({ savedLocations: currentCities });
      })
      .then(function() {
        console.log('DB initial load has completed');
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}

export default LocationList;
