import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

 /**
  * Function used for passing the state of Redux to the properties of React components, and making possible reading the state from  React components
  */
const mapStateToProps = store => ({
    moviesDisplayed: store.moviesDisplayed
})

/**
 * Function used for sending the actions of Redux to the properties of the components, and making possible modifiying the state from React Components
 */
const mapDispatchToProps = dispatch =>({
    switchDisplayLongest: ()=>dispatch(actions.switchDisplayLongest()),
    switchDisplayShortest: ()=>dispatch(actions.switchDisplayShortest()),
    switchDisplayNewest: ()=>dispatch(actions.switchDisplayNewest()),
    switchDisplayOldest: ()=>dispatch(actions.switchDisplayOldest()),
    switchDisplayNoFilter: ()=>dispatch(actions.switchDisplayNoFilter()),
    switchDisplayMultipleDirectors: ()=>(actions.switchDisplayMultipleDirectors()),
    switchDisplayAlphabetically: ()=>(actions.switchDisplayAlphabetically()),
    switchDisplayAlphabeticallyInverse: ()=>(actions.switchDisplayAlphabeticallyInverse())
})

/**
 * @author Eloy Ramirez Hernanz
 * Component Table for showing the information in a table.
 */
class Table extends Component {
    constructor (props){
        super(props);
        this.state = {
            hasError:false
        }
    }

    render() {
        {/** This component uses all the properties passed by the parent component List. Concretely, the buttons which appears in this component are displayed
            or hidden depending on the Redux state. In addition, when this buttons are clicked, Redux state is modified. This component has the component child Row, 
            which is part of Table
         */}
        const {dataMovies, nextPage, prevPage, alfAsc, alfDsc, yearAsc, yearDsc, longstDuration, shortstDuration, noFilter, multipleDirectors} = this.props;
        return (<div className="tableMovies">
        <h1>IMDB Movies Table</h1>
        <div className="buttons">
            {this.props.moviesDisplayed === 'ALPHABETICALLY' ? <input type="button" onClick={()=>{alfDsc();this.props.switchDisplayAlphabeticallyInverse()}} value="Z-A" className="detail-button"/> : <input type="button" onClick={()=>{alfAsc();this.props.switchDisplayAlphabetically();}} value="A-Z" className="detail-button"/>}
            {this.props.moviesDisplayed === 'LONGEST' ? <input type="button" onClick={()=>{shortstDuration();this.props.switchDisplayShortest();}} value="Shortest Duration" className="detail-button"/> : <input type="button" onClick={()=>{ longstDuration(); this.props.switchDisplayLongest(); }} value="Longest Duration" className="detail-button"/>}
            {this.props.moviesDisplayed === 'NEWEST' ? <input type="button" onClick={()=>{yearAsc();this.props.switchDisplayOldest();}} value="Oldests" className="detail-button"/> : <input type="button" onClick={()=>{yearDsc(); this.props.switchDisplayNewest();}} value="Newests" className="detail-button"/>}
            {this.props.moviesDisplayed === 'MULTIPLE_DIRECTORS' ? null : <input type="button" onClick={()=>{multipleDirectors();this.props.switchDisplayMultipleDirectors();}} value="Multiple directors" className="detail-button"/>}
            <input type="button" onClick={()=>{noFilter();this.props.switchDisplayNoFilter();}} value="No filter" className="detail-button"/>
        </div>
        <table id="simple-board">
            <tbody>
            <tr id="row0">
                <th>Primary Title</th>
                <th>Directors</th>
                <th>Duration (Minutes)</th>
                <th>Year</th>
            </tr>
            {/** After having the information of the movies, one component Row is added to the component table for showing the information of one movie */}
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
    noFilter: PropTypes.func.isRequired,
    multipleDirectors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);