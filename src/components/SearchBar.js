import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import { fetchLocation } from './../actions/index';


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

        this.state = {}     

        this.handleChangeSearchBox = this.handleChangeSearchBox.bind(this);   
        this.searchBtnClicked = this.searchBtnClicked.bind(this);   
        this.searchLocation = this.searchLocation.bind(this);
    }   

    handleChangeSearchBox(event) {
        let val = event.target.value;
        this.setState = {
            input: val
        }
        this.searchLocation(val) ;
    }

    searchBtnClicked() {
        console.log('clicked');
        
        this.searchLocation(this.state.input);
    }

    searchLocation(val) {
        this.props.fetchLocation(val);
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