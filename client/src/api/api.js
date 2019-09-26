/**
 * Author: Eloy Ramirez Hernanz
 * 
 * This file contains the functions called from the Front-end for sending a request to the server after clicking a button or refreshing the page.
 * 
 */

/**
 * Function for sending a request of a certain page of movies to the server. These movies are not filtered by order or other kind of filters.
 * @param {number} page 
 */
export const getMovies = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

/**
 * Function for sending a request of a certain page of movies to the server, ordered alphabetically. Both the page and the order (ascending or descending) are 
 * determined in the parameters of the function.
 * @param {number} page 
 * @param {string} order 
 */
export const getMoviesAlphabetically = async (page, order='DESC') => {
	try{
        const resp = await fetch('http://localhost:3001/alphabetically/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}

/**
 * Function for sending a request of a certain page of movies to the server, ordered by year. Both the page and the order (ascending or descending) are 
 * determined in the parameters of the function.
 * @param {number} page 
 * @param {string} order 
 */
export const getMoviesByYear = async (page, order) => {
	try{
        const resp = await fetch('http://localhost:3001/year/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}

/**
 * Function for sending a request of a certain page of movies to the server, ordered by duration. Both the page and the order (ascending or descending) are 
 * determined in the parameters of the function.
 * @param {number} page 
 * @param {string} order 
 */

export const getMoviesByDuration = async (page, order) => {
	try{
        const resp = await fetch('http://localhost:3001/duration/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}
/**
 * Function for sending a request of a certain page of movies to the server, ordered by duration. The page is determined in the parameter of the function.
 * @param {string} page 
 */
export const getMoviesWithMultipleDirectors = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/multipleDirectors/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}