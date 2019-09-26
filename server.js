/**
 * 
 * Author: Eloy Ramirez Hernanz
 * 
 * This document contains the functions for interacting with the database when the server receives a request. 
 * Once received, executes one of the functions from the file repository.js, which send queries to the database, and after receiving the information from the database
 *  the server sent this information as reponse to the client who made the request. 
 * These urls are called from the frontend when the users interact with the webpage, concretely with the buttons over and below the table, which acts as a filter.
 * Each button represents a call to a url which execute one of these functions, executing a query in the database and returning the information retrieved.
 */

let repo = require('./repository.js')
const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())

//Return the movies without any filter, determining the page for the pagination
app.get('/:page',async (req, res)=>{
    const paginatedMovies = await repo.getPaginationMovies(req.params.page)
    res.send(paginatedMovies);
})

//Return the movies ordered alphabetically by title, determining the page for the pagination and the order
app.get('/alphabetically/:page/:order', async (req, res)=>{
    const paginatedMoviesAlphabetically = await repo.getPaginationMoviesAlphabetically(req.params.page, req.params.order)
    res.send(paginatedMoviesAlphabetically);
})

//Return the movies ordered by year, determining the page for the pagination and the order
app.get('/year/:page/:order', async (req, res)=>{
    const paginatedMoviesByYear = await repo.getPaginationMoviesByYear(req.params.page, req.params.order)
    res.send(paginatedMoviesByYear);
})

//Return the movies ordered by duration in minutes, determining the page for the pagination and the order
app.get('/duration/:page/:order', async (req, res)=>{
    const paginatedMoviesByDuration = await repo.getPaginationMoviesByDuration(req.params.page, req.params.order)
    res.send(paginatedMoviesByDuration);
})

//Return the movies that has more than one director, determining the page for the pagination
app.get('/multipleDirectors/:page', async (req, res)=>{
    const paginatedMoviesMultipleDirectors = await repo.getPaginationMoviesMoreThanOneDirector(req.params.page)
    res.send(paginatedMoviesMultipleDirectors);
})


//Server listening in the port 3001
app.listen(3001, ()=>console.log('Listening port 3001'))