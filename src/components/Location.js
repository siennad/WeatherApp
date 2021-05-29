import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Page from '@material-ui/core/Page';

class Location extends Component {
  constructor(props) {
    super(props);

    this.showWeather = this.showWeather.bind(this);
  }

  showWeather(id) {
    //TODO navigate and dispatch action (view and reload)
  }

  render() {
    const locationName = this.props.locationName;
    const locationID = this.props.locationID;
    const locationCountry = this.props.locationCountry;
    const weatherTemp = this.props.weatherTempNow;
    const weatherIcon = this.props.weatherIconNow;

    const { classes } = props;

    return (
      <div className={classes.root}>
        <Card onClick={this.showWeather(locationID)}>
          <Grid container spacing={12}>
            <Grid item xs={6}>
              {locationName}, {locationCountry}
            </Grid>
            <Grid item xs={6}>
              {weatherTemp}
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
});

Location.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Location);
