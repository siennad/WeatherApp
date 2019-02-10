import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import { KeyboardBackspace } from '@material-ui/icons';
import Favourite from './Favourite';

const NavBar = ({
  title = 'Forecast Weather',
  history = null,
  onLocationPage = false,
  isFavourite = false,
  locationId = null
}) => (
  <AppBar
    position="sticky"
    style={{ backgroundColor: '#ff9234', color: '#951555' }}
  >
    <Toolbar style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={24}
      >
        <Grid item xs={3} style={{ textAlign: 'left' }}>
          {onLocationPage ? (
            <IconButton
              color="inherit"
              aria-label="Back"
              onClick={() => {
                history.goBack();
              }}
            >
              <KeyboardBackspace />
            </IconButton>
          ) : null}
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="title"
            color="inherit"
            align="center"
            style={{ wordWrap: 'noWrap', fontWeight: '600' }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid item xs={3} style={{ textAlign: 'right' }}>
          {onLocationPage ? (
            <Favourite isFavourite={isFavourite} id={locationId} />
          ) : null}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default NavBar;
