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

    console.log(this.props)
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

function mapStateToProps(state, props) {
  console.log(state);
  console.log(props);
 // console.log(this.props);
 // console.log(props);
 console.log(state.locations[props.match.params.originId])
  return {
    ...state.locations[state.viewLocation]
  }
}

export default connect(mapStateToProps, undefined)(LocationPage)