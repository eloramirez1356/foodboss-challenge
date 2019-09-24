let repo = require('./repository.js')
const cors = require('cors')
const express = require('express')
const app = express()

//api
app.use(cors())

app.get('/:page',async (req, res)=>{
    console.log(req.params.page)
    const paginatedMovies = await repo.getPaginationMovies(req.params.page)
    res.send(paginatedMovies);
})

app.get('/ascending/:page', async (req, res)=>{
    const paginatedMoviesAscendingOrder = await repo.getPaginationMoviesAscendingOrder(req.params.page)
    res.send(paginatedMoviesAscendingOrder);
})

app.get('/descending/:page', async (req, res)=>{
    const paginatedMoviesDescendingOrder = await repo.getPaginationMoviesDescendingOrder(req.params.page)
    res.send(paginatedMoviesDescendingOrder);
})

app.get('/ascendingYear/:page', async (req, res)=>{
    const paginatedMoviesAscendingYearOrder = await repo.getPaginationMoviesByAscendingYear(req.params.page)
    res.send(paginatedMoviesAscendingYearOrder);
})

app.get('/descendingYear/:page', async (req, res)=>{
    const paginatedMoviesDescendingYearOrder = await repo.getPaginationMoviesByDescendingYear(req.params.page)
    res.send(paginatedMoviesDescendingYearOrder);
})

app.get('/longests/:page', async (req, res)=>{
    const paginatedLongestsMovies = await repo.getPaginationMoviesByAscendingDuration(req.params.page)
    res.send(paginatedLongestsMovies);
})

app.get('/shortests/:page', async (req, res)=>{
    const paginatedShortestsMovies = await repo.getPaginationMoviesByDescendingDuration(req.params.page)
    res.send(paginatedShortestsMovies);
})



app.listen(3001, ()=>console.log('Listening port 3001'))