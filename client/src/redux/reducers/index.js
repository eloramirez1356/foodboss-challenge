import moviesDisplayed from './ShowButtonsForSearch';
import {combineReducers} from 'redux';
const allReducers = combineReducers({
    moviesDisplayed: moviesDisplayed,
});

export default allReducers;