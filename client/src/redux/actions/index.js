
/**
 * @author Eloy Ramirez Hernanz
 * This file shows all the actors of Redux, which execute an action for modifying the state of Redux.
 * All of the actions defined in this file returns a string for modifying the state with this string.
 */

export const switchDisplayLongest = () => {
    return{
        type: 'LONGEST'
    };
};

export const switchDisplayShortest = () => {
    return{
        type: 'SHORTEST'
    };
};

export const switchDisplayNewest = () => {
    return{
        type: 'NEWEST'
    };
};

export const switchDisplayOldest = () => {
    return{
        type: 'OLDEST'
    };
};

export const switchDisplayMultipleDirectors = () => {
    return{
        type: 'MULTIPLE_DIRECTORS'
    };
};

export const switchDisplayNoFilter = () => {
    return{
        type: 'NO_FILTER'
    };
};

export const switchDisplayAlphabetically = () => {
    return{
        type: 'ALPHABETICALLY'
    };
};

export const switchDisplayAlphabeticallyInverse = () => {
    return{
        type: 'ALPHABETICALLY_INVERSE'
    };
};

