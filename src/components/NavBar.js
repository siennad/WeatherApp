import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { KeyboardBackspace } from  '@material-ui/icons';
import Favourite  from './Favourite';

const NavBar = ({
  title = "Forecast Weather", 
  history = null, 
  onLocationPage = false, 
  isFavourite = false, 
  locationId = null
}) => (
  <AppBar position="static">
    <Toolbar>
      <Grid container direction="row" justify="space-around" alignItems="center" spacing={24}>
        <Grid item xs={3}>
        {
          (onLocationPage) ?
            <IconButton color="inherit" aria-label="Back" onClick={() => {history.replace("/")}}>
              <KeyboardBackspace />
            </IconButton>           
            : null
        }
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Grid>
        
        <Grid item xs={3}>
        {
          (onLocationPage) ?
            <Favourite isFavourite={isFavourite} id={locationId} />
            : null
        }
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)

export default (NavBar)