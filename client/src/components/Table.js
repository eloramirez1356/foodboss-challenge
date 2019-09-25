import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

class Table extends Component {
    constructor (props){
        super(props);
        this.state = {
            hasError:false
        }
    }

    render() {
        const {dataMovies, nextPage, prevPage, alfAsc, alfDsc, isOrderedAsc, isLongestDuration, isNewest, yearAsc, yearDsc, longstDuration, shortstDuration, hasMultipleDirectors, noFilter, multipleDirectors} = this.props;
        console.log("Datamovies va");
        console.log(dataMovies);
        return (<div className="tableMovies">
        <h1>IMDB Movies Table</h1>
        <div className="buttons">
            {isOrderedAsc ? <input type="button" onClick={alfDsc} value="Z-A" className="detail-button"/> : <input type="button" onClick={alfAsc} value="A-Z" className="detail-button"/>}
            {isLongestDuration ? <input type="button" onClick={shortstDuration} value="Shortest Duration" className="detail-button"/> : <input type="button" onClick={longstDuration} value="Longest Duration" className="detail-button"/>}
            {isNewest ? <input type="button" onClick={yearAsc} value="Oldests" className="detail-button"/> : <input type="button" onClick={yearDsc} value="Newests" className="detail-button"/>}
            {hasMultipleDirectors ? null : <input type="button" onClick={multipleDirectors} value="Multiple directors" className="detail-button"/>}
            <input type="button" onClick={noFilter} value="No filter" className="detail-button"/>
        </div>
        <table id="simple-board">
            <tbody>
            <tr id="row0">
                <th>Primary Title</th>
                <th>Directors</th>
                <th>Duration (Minutes)</th>
                <th>Year</th>
            </tr>
            {
                dataMovies.map((movie,i) => {
                    return (<Row key={i} data={movie}/>)
                })
            }
            </tbody>
        </table>
        <div className="buttons">
            <input type="button" onClick={prevPage} value="Prev" className="detail-button"/>
            <input type="button" onClick={nextPage} value="Next" className="detail-button"/>
        </div>
        
    </div>);
    }
}

Table.propTypes = {
    dataMovies: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired,
    alfAsc: PropTypes.func.isRequired,
    alfDsc: PropTypes.func.isRequired,
    yearAsc: PropTypes.func.isRequired,
    yearDsc: PropTypes.func.isRequired,
    isOrderedAsc: PropTypes.bool.isRequired,
    isLongestDuration: PropTypes.bool.isRequired,
    hasMultipleDirectors: PropTypes.bool.isRequired,
    noFilter: PropTypes.func.isRequired,
    multipleDirectors: PropTypes.func.isRequired
};

export default Table;