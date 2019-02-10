import React, { Component } from 'react';
import { connect } from 'react-redux';

import  Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'block',
    alignItems: 'center',
    width: '100%',
  },
  anchorStyle: {
    color: 'black',
    textDecoration: 'none'
  }
});

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(location) {
    this.props.history.push({
      pathname: `/location/${location.id}`,
      state: { location: location }
    });
  }

  render() {
    const { classes } = this.props;

    const res = this.props.list;

    const items = res.map((r, key) => {
      return (
        <ListItem key={r.id} button onClick={() => this.navigateTo(r)}>
          <span className={classes.anchorStyle}>
            {r.name}, {r.country}
          </span>
        </ListItem>
      );
    });

    if (this.props.isFetching) {
      return (
        <div className={classes.container}>
          <Paper
            elevation={0}
            square={true}
            style={{ textAlign: 'center', alignItem: 'center', height: '50px' }}
          >
            <CircularProgress size={40} disableShrink />
          </Paper>
        </div>
      );
    } else if (this.props.list.length == 0) {
      return <div />;
    } else {
      return (
        <div className={classes.container}>
          <Paper elevation={0}>
            <List>{items}</List>
          </Paper>
        </div>
      );
    }
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SearchResult));
