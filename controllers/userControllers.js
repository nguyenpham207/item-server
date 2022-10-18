////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

//GEt route for signup
router.get('/signup',(req,res) => {
    res.render('users/signup')
})


//sign up
router.post('/signup', async (req, res) => {
    // this route will receive a req.body
    console.log('this is our initial req.body', req.body)
    // first step, is to encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('req.body after hash', req.body)

    // create a new user
    User.create(req.body)
        // if successful, console log the user(for now)
        .then(user => {
            console.log(user)
            res.redirect('/users/login')
        })
        // if an error occurs, log the error
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for login
router.get('/login', (req, res) => {
    res.render('users/login')
})


// a route for log in
router.post('/login', async (req, res) => {
    // get our data from the req body, saved as separate variables
    const { username, password } = req.body

    // search the db for a user with that username
    User.findOne({ username })
        .then(async (user) => {
            // check if they exist
            if (user) {
                // compare the password
                // bcrypt.compare -> evals to a truthy or a falsy
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // this is where we use the session object
                    // session object lives in our request
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id 

                    console.log('this is req.session', req.session)
                    res.redirect('/cars')
                } else {
                    res.redirect('/error?error=username%20or%20password%20incorrect')
                }
            } else {
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {res.redirect(`/error?error=${err}`)})
})

router.get('/logout', (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render('users/logout', {username,loggedIn,userId})
})

//DELETE
// a route for log out 
router.delete('/logout', (req, res) => {
    // destroy the session(eventually we'll redirect)
    req.session.destroy(err => {
        console.log('req.session after logout', req.session)
        console.log('err on logout?', err)

        res.redirect('/')
    })
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router