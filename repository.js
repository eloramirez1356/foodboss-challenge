
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
        await pool.end()
    }catch(err){
        console.log(err)
    }
}

async function getPaginationMovies(){
    const pageNumber = 1
    const pageSize = 10
    const query = 'SELECT DISTINCT titlebasics.primaryTitle, titlebasics.titleType,titlebasics.startYear, titlebasics.runtimeMinutes, array_agg(DISTINCT namebasics.primaryName) ' +
    'FROM titleakas ' + 
    'INNER JOIN titlebasics ON titleakas.titleid = titlebasics.tconst ' + 
    'INNER JOIN titlecrew ON titlecrew.tconst = titleakas.titleid ' + 
    'INNER JOIN namebasics ON namebasics.knownfortitles = titleakas.titleid ' + 
    'GROUP BY titlebasics.primaryTitle, titlebasics.titleType, titlebasics.startYear, titlebasics.runtimeMinutes ' +
    'LIMIT ' + pageSize + ' OFFSET ' + (pageNumber-1) * pageSize;
    executeQuery(query)
    
}

module.exports.getPaginationMovies = getPaginationMovies;