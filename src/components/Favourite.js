import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';

import { addFav, removeFav } from '../actions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Favorite  from  '@material-ui/icons/Favorite';
import FavoriteBorder from  '@material-ui/icons/FavoriteBorder';

class Favourite extends Component {

  constructor(props) {
    super(props);

    this.addToFavourite = this.addToFavourite.bind(this);
    this.removeFromFavourite = this.removeFromFavourite.bind(this);

    this.state = {
      isFavourite: props.isFavourite,
      openSnackbar: false
    }
  }

  addToFavourite() {
    this.setState({
      isFavourite: true,
      openSnackbar: true,
      msg: 'Added to Favourite'
    })
  }
  
  removeFromFavourite() {
    this.setState({
      isFavourite: false,
      openSnackbar: true,
      msg: 'Removed from Favourite'
    });
  }

  closeSnackbar() {
    this.setState({
      openSnackbar: false
    });
  }

  componentWillUnmount() {
    (this.state.isFavourite) ? addFav(this.props.id) : removeFav(this.props.id);
  }

  render() {
    const { classes } = this.props;
    let FavButton;
    const extraBtn = <Button onClick={()=>{}}>extra</Button>

    if (!this.state.isFavourite) {        
      FavButton = <IconButton color="inherit" aria-label="AddToFavourite" onClick={() => this.addToFavourite()}>
        <FavoriteBorder />
      </IconButton>        
    } else {
      FavButton = <IconButton color="inherit" aria-label="RemoveFromFavourite" onClick={() => this.removeFromFavourite()}>
          <Favorite />
        </IconButton> 
    }

    return (
      <React.Fragment>  
        {FavButton}    
        <Snackbar
              open={this.state.openSnackbar}
              onClose={this.closeSnackbar.bind(this)}
              ContentProps={{
                'aria-describedby': 'noti-id',
              }}
              message={<span id="noti-id">{this.state.msg}</span>}
              autoHideDuration={2000}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFav: val => dispatch(addFav(val)),
  removeFav: val => dispatch(removeFav(val))
})

export default connect(null, mapDispatchToProps)(Favourite);
