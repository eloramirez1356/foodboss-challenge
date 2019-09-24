  
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({data}) => (
    <tr id="row">
        <td id="cell1-0">{data.primarytitle}</td>
        <td id="cell1-1">{data.string_agg}</td>
        <td id="cell1-2">{data.runtimeminutes}</td>
        <td id="cell1-3">{data.startyear}</td>
     </tr>
    )

Row.propTypes = {
    data: PropTypes.object.isRequired
};

export default Row;