import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import SearchResult from './SearchResult';

const CITY_URL = '../../www/dataList/cityList.json'

const styles = theme => ({
    formWrap: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "80%",
        margin: "auto"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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

  async searchLocation(val) {
    console.log(this.state)
    await fetch(`${CITY_URL}`)
        .then(res => res.json())
        .then(respond => {
            return respond.filter(res => res.name.toLowerCase().includes(val.toLowerCase()) || 
              res.country.toLowerCase().includes(val.toLowerCase()))
        })
        .then(res => {
          const data = res.map((d) => ({
            name: d.name,
            country: d.country,
            id: d.id
            })
          )
          this.setState =  {
            searchResult: data,
            isFetching: false
          }
          console.log(this.state)
        })
  }

  handleChangeSearchBox(event) {
    let val = event.target.value;
    this.setState = {
      input: val,
      isFetching: true
    }
    this.searchLocation(val) ;
  }

  searchBtnClicked() {     
    this.setState = {
      isFetching: true
    } 
    this.searchLocation(this.state.input);
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
              value={this.state.input} 
              onChange={this.handleChangeSearchBox.bind(this)}
            />
            <IconButton 
              className={classes.iconButton} 
              aria-label="Search"
              onClick={this.searchBtnClicked}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        <SearchResult isFetching={this.state.isFetching||false} list={this.state.searchResult||[]} />
      </div>            
    )
  }
}


SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    fetchLocation: val => dispatch(fetchLocation(val))
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(SearchBar));