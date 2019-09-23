let repo = require('./repository.js')

const express = require('express')
const app = express()



//api

app.get('/', (req, res)=>{
    res.send('Hello World');
    repo.getPaginationMovies()
})

app.listen(3001, ()=>console.log('Listening port 3001'))