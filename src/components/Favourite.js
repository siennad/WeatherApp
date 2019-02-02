import React, {Component} from 'react';
import {connect} from 'react-redux';
//import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';

import { addFav, removeFav } from '../actions';
import IconButton from '@material-ui/core/IconButton';
import { FavoriteBorder, Favorite } from  '@material-ui/icons';


class Favourite extends Component {

  constructor(props) {
    super(props);

    this.addToFavourite = this.addToFavourite.bind(this);
    this.removeFromFavourite = this.removeFromFavourite.bind(this);

    this.state = {
      isFavourite: props.isFavourite
    }
  }

  addToFavourite() {
    this.setState({
      isFavourite: true
    })
  }
  
  removeFromFavourite() {
    this.setState({
      isFavourite: false
    })
  }

  componentWillUnmount() {
    (this.state.isFavourite) ? addFav(this.props.id) : removeFav(this.props.id);
  }

  render() {

    const { classes } = this.props;

    if (!this.state.isFavourite) {
      return (
        <IconButton color="inherit" aria-label="AddToFavourite" onClick={() => this.addToFavourite()}>
          <FavoriteBorder />
        </IconButton> 
      );
    } else {
      return (
        <IconButton color="inherit" aria-label="RemoveFromFavourite" onClick={() => this.removeFromFavourite()}>
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