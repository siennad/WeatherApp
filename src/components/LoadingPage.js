import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, Typography } from '@material-ui/core';

const styles = theme => ({
  page: {
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
});

class LoadingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.page}>
        <CircularProgress size={56} disableShrink />
        <br />
        <Typography component="h6" variant="body2">
          Loading ...
        </Typography>
      </Paper>
    );
  }
}

LoadingPage.propsType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingPage);
