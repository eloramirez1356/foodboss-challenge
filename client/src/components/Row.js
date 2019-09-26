  
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * @author Eloy Ramirez Hernanz
 * Component Row which shows information of the movies as a row in the table. Each row is a movie.
 */

class Row extends Component {
    render() {
      const {data} = this.props;
      {/** In the return, each columns is obtained from the array of information obtained from the table, passed as property of the component */}
      return (
        <tr id="row">
            <td id="cell1-0">{data.primarytitle}</td>
            <td id="cell1-1">{data.string_agg}</td>
            <td id="cell1-2">{data.runtimeminutes}</td>
            <td id="cell1-3">{data.startyear}</td>
        </tr>
      );
    }
  }

  Row.propTypes = {
      data: PropTypes.object.isRequired
  }

export default Row;

