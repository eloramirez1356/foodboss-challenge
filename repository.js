/**
 * 
 * Author: Eloy Ramirez Hernanz
 * 
 * This file contains all the methods for retrieving information from the database, called by the server when receives a request. 
 */
const {Pool} = require('pg')
const dbConfig = require('./config.json')

//Pool with the configuration with the credentials for accessing to the database. These credentials are stored in the JSON file config.json
const pool = new Pool(dbConfig)

/**
 * Function used in all the following functions for executing a query, which connects to the database and executes the query passed as parameter, 
 * returning the rows of the json which contains the information of the database
 * @param {string} query 
 */
async function executeQuery(query){
    try{
        await pool.connect()
        const movies = await pool.query(query);
        return movies.rows
    }catch(err){
        console.log(err)
    }
    
}

/**
 * Function which returns the page of movies without filters. The page is passed to the function as arguments, 
 * and this argument is sent from the Frontend as url variable.
 * @param {number} page 
 */
async function getPaginationMovies(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT tb.primaryTitle, tb.startYear, tb.runtimeMinutes,string_agg(DISTINCT nb.primaryName, ',') FROM titlebasics tb " +  
    "INNER JOIN titlecrew tc ON tc.tconst = tb.tconst " + 
    "CROSS JOIN UNNEST(string_to_array(tc.directors, ',')) AS t (director) " +
    "INNER JOIN namebasics nb ON nb.nconst = director " +
    "GROUP BY tb.primaryTitle, tb.startYear, tb.runtimeMinutes " + 
    " LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    const movies = await executeQuery(query)
    return movies
    
}

/**
 * Functions which returns the page of movies ordered alphabetically, in ascending or descending order. 
 * Both the page and the order are passed to the functions as arguments. These arguments are sent from the Frontend as url variables
 * @param {number} page 
 * @param {string} order 
 */
async function getPaginationMoviesAlphabetically(page, order='DESC'){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT tb.primaryTitle, tb.startYear, tb.runtimeMinutes,string_agg(DISTINCT nb.primaryName, ',') FROM titlebasics tb " +  
    "INNER JOIN titlecrew tc ON tc.tconst = tb.tconst " + 
    "CROSS JOIN UNNEST(string_to_array(tc.directors, ',')) AS t (director) " +
    "INNER JOIN namebasics nb ON nb.nconst = director " +
    "GROUP BY tb.primaryTitle, tb.startYear, tb.runtimeMinutes " + 
    "ORDER BY tb.primaryTitle " + order +
    " LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    const movies = await executeQuery(query)
    return movies
}

/**
 * Functions which returns the page of the movies ordered by year, in ascending or descending order. 
 * Both the page and the order are passed to the function as arguments. These arguments are sent from the Frontend as url variables
 * @param {number} page 
 * @param {string} order 
 */
async function getPaginationMoviesByYear(page, order='DESC'){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT tb.primaryTitle, tb.startYear, tb.runtimeMinutes,string_agg(DISTINCT nb.primaryName, ',') FROM titlebasics tb " +  
    "INNER JOIN titlecrew tc ON tc.tconst = tb.tconst " + 
    "CROSS JOIN UNNEST(string_to_array(tc.directors, ',')) AS t (director) " +
    "INNER JOIN namebasics nb ON nb.nconst = director " +
    "GROUP BY tb.primaryTitle, tb.startYear, tb.runtimeMinutes " + 
    "ORDER BY tb.startYear " + order +
    " LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    const movies = await executeQuery(query)
    return movies
}

/**
 * Function that returns the page of movies ordered by duration in minutes, in ascending or descending order. Both the page and the order are passed to the function
 * as arguments. These arguments are sent from the Frontend as url variables
 * @param {number} page 
 * @param {string} order 
 */
async function getPaginationMoviesByDuration(page, order='DESC'){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT tb.primaryTitle, tb.startYear, tb.runtimeMinutes,string_agg(DISTINCT nb.primaryName, ',') FROM titlebasics tb " +  
    "INNER JOIN titlecrew tc ON tc.tconst = tb.tconst " + 
    "CROSS JOIN UNNEST(string_to_array(tc.directors, ',')) AS t (director) " +
    "INNER JOIN namebasics nb ON nb.nconst = director " +
    "GROUP BY tb.primaryTitle, tb.startYear, tb.runtimeMinutes " +  
    "ORDER BY tb.runtimeMinutes " + order +
    " LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    const movies = await executeQuery(query)
    return movies
}
/**
 * Function that returns the page of movies that have more than one director. The page is passed in the function as argument, sent from the Frontend as url variable
 * @param {number} page 
 */
async function getPaginationMoviesMoreThanOneDirector(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT tb.primaryTitle, tb.startYear, tb.runtimeMinutes,string_agg(DISTINCT nb.primaryName, ',') FROM titlebasics tb " +  
    "INNER JOIN titlecrew tc ON tc.tconst = tb.tconst " + 
    "CROSS JOIN UNNEST(string_to_array(tc.directors, ',')) AS t (director) " +
    "INNER JOIN namebasics nb ON nb.nconst = director " +
    "GROUP BY tb.primaryTitle, tb.startYear, tb.runtimeMinutes " + 
    "HAVING COUNT (DISTINCT nb.nconst) > 1 " + 
    " LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    const movies = await executeQuery(query)
    return movies
}


module.exports.getPaginationMovies = getPaginationMovies;
module.exports.getPaginationMoviesAlphabetically = getPaginationMoviesAlphabetically;
module.exports.getPaginationMoviesByYear = getPaginationMoviesByYear;
module.exports.getPaginationMoviesByDuration = getPaginationMoviesByDuration;
module.exports.getPaginationMoviesMoreThanOneDirector = getPaginationMoviesMoreThanOneDirector;