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