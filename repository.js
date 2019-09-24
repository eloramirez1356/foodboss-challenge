
const {Pool} = require('pg')
const dbConfig = require('./config.json')
// pools will use environment variables
// for connection information
const pool = new Pool(dbConfig)

async function executeQuery(query){
    try{
        await pool.connect()
        console.log("previo a movies")
        const movies = await pool.query(query);
        console.log(movies)
        //await pool.end()
        return movies.rows
    }catch(err){
        console.log(err)
    }
    
}

async function getPaginationMovies(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
    
}

async function getPaginationMoviesAscendingOrder(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' ORDER BY title LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}

async function getPaginationMoviesDescendingOrder(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' ORDER BY title DESC LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}

async function getPaginationMoviesByAscendingYear(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}

async function getPaginationMoviesByDescendingYear(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}

async function getPaginationMoviesByAscendingDuration(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}

async function getPaginationMoviesByDescendingDuration(page){
    const pageNumber = page
    const pageSize = 10
    const query = "SELECT titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titles.titleid, titlebasics.runtimeMinutes, string_agg(DISTINCT namebasics.primaryName, ',') " +  
    "FROM (SELECT titleid FROM titleakas WHERE isoriginaltitle='1' LIMIT " + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize + " ) AS titles " + 
    "INNER JOIN titlebasics ON titles.titleid = titlebasics.tconst " + 
    "INNER JOIN titlecrew ON titlecrew.tconst = titles.titleid " +
    "INNER JOIN namebasics ON namebasics.nconst = titlecrew.directors " + 
    "GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes, titles.titleid";
    const movies = await executeQuery(query)
    return movies
}



module.exports.getPaginationMovies = getPaginationMovies;
module.exports.getPaginationMoviesAscendingOrder = getPaginationMoviesAscendingOrder;
module.exports.getPaginationMoviesDescendingOrder = getPaginationMoviesDescendingOrder;
module.exports.getPaginationMoviesByAscendingYear = getPaginationMoviesByAscendingYear;
module.exports.getPaginationMoviesByDescendingYear = getPaginationMoviesByDescendingYear;
module.exports.getPaginationMoviesByAscendingDuration = getPaginationMoviesByAscendingDuration;
module.exports.getPaginationMoviesByDescendingDuration = getPaginationMoviesByDescendingDuration;