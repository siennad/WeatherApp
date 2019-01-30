import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import NavBar from './NavBar';

class LocationPage extends Component {
  constructor(props) {
    super(props);

    const { locationName, 
      country, 
      isFetching, 
      isInvalid, 
      tempNow, 
      iconCodeNow, 
      windNow,
      forecast,
      updatedTime, 
      id,
      isFavourite
    } = this.props;

  }

  render() {
    return (
      <Paper>
        <NavBar 
          onLocationPage={true} 
          title={this.props.locationName} 
          locationId={this.props.id}  
          history={this.props.history}
          isFavourite={this.props.isFavourite}
        />
      </Paper>
    )
  }

}

function mapStateToProps(state) {
  return {
    ...state.locations[this.props.params.originId]
  }
}

export default withRouter(connect(mapStateToProps, undefined)(LocationPage))