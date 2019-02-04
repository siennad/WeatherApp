import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CircularProgress, List, ListItem, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    padding: '4px 4px',
    display: 'block',
    alignItems: 'center',
    width: '100%',
    margin: 'auto'
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
      console.log(`${key} : ${r.name}`);
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
          <Paper>
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
