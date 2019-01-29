import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { KeyboardBackspace } from  '@material-ui/icons';
import { Favourite } from './Favourite';

const NavBar = ({
  title = "Forecast Weather", 
  history = null, 
  onLocationPage = false, 
  isFavourite = false, 
  locationId = null
}) => (
  <AppBar position="static">
    <Toolbar>
      <Gird container direction="row" justify="space-around" alignItems="center" spacing={24}>
        <Grid item xs>
        {
          (onLocationPage) ?
            <IconButton color="inherit" aria-label="Back" onClick={() => {history.replace("/")}}>
              <KeyboardBackspace />
            </IconButton>           
            : null
        }
        </Grid>

        <Grid item xs-6>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Grid>
        
        <Grid item xs-6>
        {
          (onLocationPage) ?
            <Favourite isFavourite={isFavourite} id={locationId} />
            : null
        }
        </Grid>
      </Gird>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(NavBar)