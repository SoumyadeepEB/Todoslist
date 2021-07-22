const express = require('express')
require('dotenv').config()
require('./connection')
const todosRoute = require('./routes/todos')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', todosRoute)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})