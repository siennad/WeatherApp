import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import NavBar from './NavBar';
import LoadingPage from './LoadingPage';

import * as Actions from '../actions';

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }

    this.renderPage = this.renderPage.bind(this)

  }

  componentDidMount() {
    this.props.actions.selectLocation(this.props.location.state.location)
  }

  componentWillReceiveProps(props) {
    console.log(props)
    console.log(this.props)
  }

  renderPage() {
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
    );
  }

  render() {
    
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

    const page = () => this.renderPage();
    return this.state.isLoaded ? {page} : <LoadingPage />
  }
}

function mapStateToProps(state, props) {
  console.log(props)
  return {
    ...state.locations[props.match.params.id]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPage);
