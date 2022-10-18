require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import path module
const CarRouter = require('./controllers/carControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require("./utils/middleware")


//Express app object
const app = require('liquid-express-views')(express())

// middleware runs before all the routes, every request is processed through our middleware before mongoose does anything with it.
middleware(app)

//Home Route
app.get("/", (req, res) => {
  res.render('index.liquid')
})

//register routes
app.use('/cars', CarRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)


//Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


//END