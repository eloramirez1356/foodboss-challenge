let repo = require('./repository.js')
const cors = require('cors')
const express = require('express')
const app = express()

//api
app.use(cors())

app.get('/:page',async (req, res)=>{
    const paginatedMovies = await repo.getPaginationMovies(req.params.page)
    res.send(paginatedMovies);
})

app.get('/alphabetically/:page/:order', async (req, res)=>{
    const paginatedMoviesAlphabetically = await repo.getPaginationMoviesAlphabetically(req.params.page, req.params.order)
    res.send(paginatedMoviesAlphabetically);
})

app.get('/year/:page/:order', async (req, res)=>{
    const paginatedMoviesByYear = await repo.getPaginationMoviesByYear(req.params.page, req.params.order)
    res.send(paginatedMoviesByYear);
})

app.get('/duration/:page/:order', async (req, res)=>{
    const paginatedMoviesByDuration = await repo.getPaginationMoviesByDuration(req.params.page, req.params.order)
    res.send(paginatedMoviesByDuration);
})

app.get('/multipleDirectors/:page', async (req, res)=>{
    const paginatedMoviesMultipleDirectors = await repo.getPaginationMoviesMoreThanOneDirector(req.params.page)
    res.send(paginatedMoviesMultipleDirectors);
})



app.listen(3001, ()=>console.log('Listening port 3001'))