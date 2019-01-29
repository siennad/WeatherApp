import React, { Component } from 'react';
import {connect} from 'react-redux';

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

    this.state = {
      isFavourite
    }
  }


  render() {

  }

}

function mapStateToProps(state) {
  return {
    ...state.locations[this.props.params.originId]
  }
}


LocationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, undefined)(LocationPage))
