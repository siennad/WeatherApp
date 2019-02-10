import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import NavBar from './NavBar';
import LoadingPage from './LoadingPage';
import Forecast from './Forecast';

import * as Actions from '../actions';

const styles = theme => ({
  pageWrap: {
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  weatherNow: {
    fontWeight: 'bold',
    fontSize: '28px'
  },
  bigWIconContainer: {
    width: '30%',
    textAlign: 'center',
    margin: 'auto'
  },
  bigWIcon: {
    width: '100%'
  },
  temperature: {
    fontWeight: 'bold',
    fontSize: '22px'
  },
  wind: {
    fontStyle: 'italic'
  },
  updateTime: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)'
  }
});

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };

    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.selectLocation(this.props.location.state.location);
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.isFetching && !nextProps.isInvalid) {
      if (!this.state.isLoaded) {
        this.setState({
          isLoaded: true
        });
      }
      return true;
    } else {
      return false;
    }
  }

  renderPage() {
    return (
      <Paper style={{backgroundColor: '#fdf0f6', height: '100%'}}>
        <NavBar
          onLocationPage={true}
          title={`${this.props.locationName}, ${this.props.country}`}
          locationId={this.props.id}
          history={this.props.history}
          isFavourite={this.props.isFavourite}
        />
        {/* Page content */}
        <div className={this.props.classes.pageWrap}>
          <div className={this.props.classes.weatherNow}>
            {this.props.weatherNow}
          </div>

          <div className={this.props.classes.bigWIconContainer}>
            <img
              src={`http://openweathermap.org/img/w/${
                this.props.iconCodeNow
              }.png`}
              alt={this.props.weatherNow}
              className={this.props.classes.bigWIcon}
            />
          </div>

          <div className={this.props.classes.temperature}>
            {this.props.tempNow} &#8451;
          </div>

          <div className={this.props.classes.wind}>
            Wind: {this.props.windNow} m/s
          </div>

          <Forecast forecast={this.props.forecast} />

          <div className={this.props.classes.updateTime}>
            Updated at: {this.props.updatedTime}
          </div>
        </div>
      </Paper>
    );
  }

  render() {
    const {
      locationName,
      country,
      isFetching,
      isInvalid,
      tempNow,
      iconCodeNow,
      weatherNow,
      windNow,
      forecast,
      updatedTime,
      id,
      isFavourite,
      classes
    } = this.props;

    const page = this.renderPage();
    return this.state.isLoaded ? page : <LoadingPage />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state.locations[props.match.params.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

LocationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocationPage)
);
