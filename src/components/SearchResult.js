import React, { Component } from 'react';

import { 
  CircularProgress, 
  List, 
  ListItem,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

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

  dispatchThenNavigate() {}
  render() {
    const { classes } = this.props;

    const res = this.props.list;

    const items = res.map((r, key) => {
      console.log(`${key} : ${r.name}`)
      return (
      <div>
        <ListItem key={r.id} button>
          <span onClick={this.dispatchThenNavigate} className={classes.anchorStyle}>{r.name}, {r.country}</span>
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

export default withStyles(styles)(SearchResult)