const express = require('express')
const app = express();

const db = require('./data/database')

const todoRoutes = require('./routes/todo-routes')

app.use(express.json())

app.use('/todos', todoRoutes)

app.use(function(error, req, res, next){
    res.status(500).json({
        message: 'Something went wrong!'
    })
})

db.initDb().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log(error)
})