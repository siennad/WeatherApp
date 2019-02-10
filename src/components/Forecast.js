import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';

import * as _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  tableRoot: {
    width: '95%',
    margin: 'auto'
  },
  headerCell: {
    fontWeight: 'bold',
    padding: '8px',
    fontSize: '18px',
    borderBottom: '0'
  },
  titleCell: {
    fontWeight: 'bold',
    padding: '2px',
    fontSize: '15px',
    borderBottom: '0'
  },
  normalCell: {
    padding: '2px 5px',
    fontSize: '12px',
    borderBottom: '0'
  }
});

class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const listOfForecast = this.props.forecast;
    const listWithKey = _.groupBy(listOfForecast, forecast => forecast.day);
    let render = [];

    _.map(listWithKey, (val, key) => {
      render.push(
        <TableRow key={key}>
          <TableCell
            component="th"
            scope="row"
            className={classes.titleCell}
            colSpan={4}
          >
            {key}
          </TableCell>
        </TableRow>
      );

      val.map((row,key) => {
        render.push(
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.normalCell}
            >
              {row.hour}
            </TableCell>
            <TableCell align="center" className={classes.normalCell}>
              <img
                src={`http://openweathermap.org/img/w/${row.icon}.png`}
                alt={row.weather}
              />
            </TableCell>
            <TableCell align="center" className={classes.normalCell}>
              {row.temp} &#8451;
            </TableCell>
            <TableCell align="right" className={classes.normalCell}>
              {row.wind} m/s
            </TableCell>
          </TableRow>
        );
      });
    });

    return (
      <div style={{ width: '100%' }}>
        <Table className={classes.tableRoot}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Time</TableCell>
              <TableCell
                align="center"
                colSpan={2}
                className={classes.headerCell}
              >
                Weather
              </TableCell>
              <TableCell align="right" className={classes.headerCell}>
                Wind
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{render}</TableBody>
        </Table>
      </div>
    );
  }
}

Forecast.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forecast);
