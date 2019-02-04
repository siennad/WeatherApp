import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import SearchResult from './SearchResult';

const CITY_URL = 'dataList/cityList.json'

const styles = theme => ({
    formWrap: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        margin: "auto"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing.unit,
    },
    iconButton: {
        padding: 10,
      },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      searchResult: [],
      isFetching: false
    }
    this.handleChangeSearchBox = this.handleChangeSearchBox.bind(this);   
    this.searchBtnClicked = this.searchBtnClicked.bind(this);   
    this.searchLocation = this.searchLocation.bind(this);
  }   

  searchLocation(val) {
    fetch(`${CITY_URL}`)
      .then(res => res.json())
      .then(respond => {
        let dataToReturn;
        dataToReturn = respond.filter(res => res.name.toLowerCase().startsWith(val.toLowerCase().trim()))
        dataToReturn = (dataToReturn.length >= 5) ? dataToReturn : [...dataToReturn, respond.filter(res => res.country.toLowerCase().include(val.toLowerCase()))]
        return dataToReturn.slice(0,5)
      })
      .then((res) => {
        const data = res.map((d) => ({
          name: d.name,
          country: d.country,
          id: d.id
          })
        )
        this.setState({
          ...this.state,
          searchResult: data,
          isFetching: false
        })
      })
    
  }

  handleChangeSearchBox(event) {
    let val = event.target.value;
    this.setState({
      ...this.state,
      val: val,
      isFetching: true
    })
    if (val && val.length > 0) {
      this.searchLocation(val) ;
    } else {
      this.setState({
        input: '',
        searchResult: [],
        isFetching: false
      })
    }
  }

  searchBtnClicked() {     
    this.setState({
      ...this.state,
      isFetching: true,
    })

    if (val && val.length > 0) {
      this.searchLocation(this.state.val);
    } else {
      this.setState({
        input: '',
        searchResult: [],
        isFetching: false
      })
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <Paper className={classes.formWrap} elevation={1}>
            <TextField
              id="standard-with-placeholder"
              label="Search"
              placeholder='City, country...'
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
              onClick={this.searchBtnClicked}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        <SearchResult isFetching={this.state.isFetching} list={this.state.searchResult} />
      </div>            
    )
  }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);