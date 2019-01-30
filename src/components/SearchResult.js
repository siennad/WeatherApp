import React, { Component } from 'react';
import {connect} from 'react-redux';

import { 
  CircularProgress, 
  List, 
  ListItem,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { selectLocation } from '../actions';

const styles = theme => ({
  container: {
    padding: '4px 4px',
    display: 'block',
    alignItems: 'center',
    width: "80%",
    margin: "auto"
  },
  anchorStyle: {
    color: "black",
    textDecoration: "none"
  }
});

class SearchResult extends Component {
  constructor(props) {
    super(props)

    this.dispatchThenNavigate = this.dispatchThenNavigate.bind(this)
  }

  dispatchThenNavigate(location) {
    selectLocation(location)
    this.props.history.replace(`/location/${location.originId}`)
  }

  render() {
    const { classes } = this.props;

    const res = this.props.list;

    const items = res.map((r, key) => {
      console.log(`${key} : ${r.name}`)
      return (
      <div>
        <ListItem key={r.id} button>
          <span onClick={this.dispatchThenNavigate(r)} className={classes.anchorStyle}>{r.name}, {r.country}</span>
        </ListItem>
      </div>
      )   
    })
  
    if (this.props.isFetching){
      return (
        <div className={classes.container}>
          <Paper style={{textAlign: "center", alignItem: "center", height:"50px"}}>
            <CircularProgress size={40} />
          </Paper>   
        </div>
      )   
    } else if (this.props.list.length == 0) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className={classes.container}>
          <Paper>
            <List>
              {items}
            </List>
          </Paper>
        </div>
      ) 
    }
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  selectLocation: val => dispatch(selectLocation(val))
})

SearchResult = connect(null, mapDispatchToProps)(withRouter(SearchResult))
export default withStyles(styles)(SearchResult)