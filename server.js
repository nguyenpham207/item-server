
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express


const path = require("path")
const CarRouter = require('./controllers/carControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')


const app = express()


middleware(app)


app.get("/", (req, res) => {
    res.send("Your server is running, better go out and catch it")

})


app.use('/cars', CarRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

