import React, {Component} from 'react';
import {connect} from 'react-redux';

import { addFav, removeFav } from '../actions';
import { IconButton } from '@material-ui/core';
import { FavoriteBorder, Favorite } from  '@material-ui/icons';

class Favourite extends Component {

  state = {
    isFavourite: props.isFavourite
  }

  constructor(props) {
    super(props);

    this.addToFavourite = this.addToFavourite.bind(this);
    this.removeFromFavourite = this.removeFromFavourite.bind(this);
  }

  addToFavourite() {
    this.setState({
      isFavourite: true
    })
  }
  
  removeFromFavourite() {
    this.setState({
      isFavourite: true
    })
  }

  componentWillUnmount() {
    (this.state.isFavourite) ? addFav(this.props.id) : removeFav(this.props.id);
  }

  render() {

    if (!this.state.isFavourite) {
      return (
        <IconButton color="inherit" aria-label="AddToFavourite" onClick={this.addToFavourite}>
          <FavoriteBorder />
        </IconButton> 
      );
    } else {
      return (
        <IconButton color="inherit" aria-label="RemoveFromFavourite" onClick={this.removeFromFavourite}>
          <Favorite />
        </IconButton> 
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFav: val => dispatch(addFav(val)),
  removeFav: val => dispatch(removeFav(val))
})

export default connect(null, mapDispatchToProps)(Favourite);