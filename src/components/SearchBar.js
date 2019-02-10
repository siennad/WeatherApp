import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import SearchResult from './SearchResult';

const CITY_URL = 'dataList/cityList.json';

const cities = require('../../www/dataList/cityList.json');

const styles = theme => ({
  formWrap: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: 'auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    margin: theme.spacing.unit
  },
  iconButton: {
    padding: 10
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      searchResult: [],
      isFetching: false
    };
    this.handleChangeSearchBox = this.handleChangeSearchBox.bind(this);
    this.searchBtnClicked = this.searchBtnClicked.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.delay = this.delay.bind(this);
  }

  async delay(sec) {
    return new Promise(resolve => {
      setTimeout(resolve, sec*1000)
    })
  }

  async searchLocation(val) {
    let dataToReturn;
    dataToReturn = await cities.filter(res =>
      res.name.toLowerCase().startsWith(val.toLowerCase().trim())
    );
    dataToReturn = (dataToReturn.length < 5 && val.length <= 2)
      ? [
          ...dataToReturn,
          cities.filter(res =>
            res.country.toLowerCase().includes(val.toLowerCase())
          )
        ].slice(0, 5) : dataToReturn.slice(0,5);
    let data;
    data = await dataToReturn.map(d => ({
      name: d.name,
      country: d.country,
      id: d.id
    }));
    this.setState({
      searchResult: data,
      isFetching: false
    });
  }

  async handleChangeSearchBox(event) {
    let val = event.target.value;
    this.setState({
      ...this.state,
      val: val,
      isFetching: true
    });
    await this.delay(0.5);
    if (val && val.length > 0) {
      this.searchLocation(val);
    } else {
      this.setState({
        searchResult: [],
        isFetching: false
      });
    }
  }

  searchBtnClicked() {
    this.setState({
      ...this.state,
      isFetching: true
    });

    if (this.state.val && this.state.val.length > 0) {
      this.searchLocation(this.state.val);
    } else {
      this.setState({
        searchResult: [],
        isFetching: false
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <Paper className={classes.formWrap} elevation={1}>
            <TextField
              id="standard-with-placeholder"
              label="Search"
              placeholder="City, country..."
              fullWidth={true}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.val}
              onChange={this.handleChangeSearchBox}
            />
            <IconButton
              className={classes.iconButton}
              aria-label="Search"
              onClick={this.searchBtnClicked}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        <SearchResult
          isFetching={this.state.isFetching}
          list={this.state.searchResult}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
