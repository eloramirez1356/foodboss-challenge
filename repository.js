
const {Pool} = require('pg')
const dbConfig = require('./config.json')
const pool = new Pool(dbConfig)

async function executeQuery(query){
    try{
        await pool.connect()
        console.log("previo a movies")
        const movies = await pool.query(query);
        console.log(movies)
        return movies.rows
    }catch(err){
        console.log(err)
    }
    
}

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