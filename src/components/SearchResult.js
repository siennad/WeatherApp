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
  }

  render() {
    const { classes } = this.props;

    const res = this.props.list;

    const items = res.map((r) => (
      <div>
        <ListItem button>
          <Link to={`/location/${r.id}`} className={classes.anchorStyle}>{r.name}, {r.country}</Link>
        </ListItem>
      </div>      
    ))
  
    if (this.props.isFetching){
      return (
        <div className={classes.container}>
          <Paper style={{textAlign: "center", alignItem: "center", height:"50px"}}>
            <CircularProgress size={40} />
          </Paper>   
        </div>
      )   
    } else if (this.props.list != []) {
      return (
        <div className={classes.container}>
          <Paper style={{minHeight:"100px"}}>
            <List>
              {items}
            </List>
          </Paper>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResult)