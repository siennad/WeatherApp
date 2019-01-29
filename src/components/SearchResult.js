import React, { Component } from 'react';
import { 
  CircularProgress, 
  Link, 
  List, 
  ListItem,
  Paper,
  Divider
} from '@material-ui/core';

class SearchResult extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;

    const res = this.props.list;

    const items = res.map(r => (
      <div>
        <ListItem button>
          <Link to={`/location/${r.id}`}>{r.name}</Link>
        </ListItem>
        <Divider />
      </div>      
    ))
  
    if (this.props.isFetching){
      return (
        <Paper style={{textAlign: "center", alignItem: "center"}}>
          <CircularProgress size={20} />
        </Paper>   
      )   
    } else {
      return (
        <List>
          {items}
        </List>
      )
    }
  }
}


export default (SearchResult)