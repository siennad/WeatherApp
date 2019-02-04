import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Location extends Component {
  constructor(props) {
    super(props);

    this.showWeather = this.showWeather.bind(this);
  }

  showWeather(id) {}

  render() {
    const locationName = this.props.locationName;
    const locationID = this.props.locationID;
    const locationCountry = this.props.locationCountry;
    const weatherTemp = this.props.weatherTempNow;
    const weatherIcon = this.props.weatherIconNow;

    const { classes } = props;

    return (
      <div className={classes.root}>
        <Paper onClick={this.showWeather(locationID)}>
          <Grid container spacing={12}>
            <Grid item xs={6}>
              {locationName}, {locationCountry}
            </Grid>
            <Grid item xs={6}>
              {weatherTemp}
            </Grid>
          </Grid>
        </Paper>
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
