
/**
 * Reducer for determining the state of redux depending on the action received, concretely the ones described in the index.js file inside the actions folder.
 * When the actions are executed, the reducer change the state depending on this action. In this case is modified with the string value obtained.
 * The string determines the state, and in this case, the movies searched, because this string indicates the movies searched.
 */
const moviesDisplayed = (state = 'NO_FILTER', action) => {
    switch(action.type){
        case 'LONGEST':
            return 'LONGEST';
        case 'SHORTEST':
            return 'SHORTEST';
        case 'NO_FILTER':
            return 'NO_FILTER';
        case 'NEWEST':
            return 'NEWEST';
        case 'OLDEST':
            return 'OLDEST';
        case 'ALPHABETICALLY':
            return 'ALPHABETICALLY';
        case 'ALPHABETICALLY_INVERSE':
            return 'ALPHABETICALLY_INVERSE';
        case 'MULTIPLE_DIRECTORS':
            return 'MULTIPLE_DIRECTORS';
            default:
                return state;
    }
}





export default moviesDisplayed;