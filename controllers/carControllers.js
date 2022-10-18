

//Dependencies
const express = require("express")
const Cars = require("../models/cars")



//create router
const router = express.Router()



//ROUTES--v--


 //INDEX, GET request
 router.get("/", (req, res) => {
    Cars.find({})
    .populate('comments.author','username')
    .then(cars => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        res.render('cars/index',{cars,username, loggedIn, userId})
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

//GET for new car
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('cars/new', { username, loggedIn, userId })
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const carId = req.params.id
    Cars.findById(carId)
        .then(cars => {
            res.render('cars/edit', {cars,username,loggedIn,userId})
        })
        .catch(err => { res.redirect(`/error?error=${err}`)})
})

// SHOW owner only get req
router.get('/mine', (req, res) => {
    Cars.find({ owner: req.session.userId })
        .then(cars => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('cars/index', {cars, username, loggedIn, userId})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
  })

// SHOW get req
router.get("/:id", (req, res) => {
    const id = req.params.id
    Cars.findById(id)
      .populate("comments.author","username")
      .then((cars) => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        res.render('cars/show', {cars, username, loggedIn, userId})
      })
      .catch(err => res.redirect(`/error?error=${err}`))
})


//CREATE post req
router.post("/", (req,res) => {
    req.body.inStock = req.body.inStock === 'on' ? true : false
    req.body.owner = req.session.userId
    Cars.create(req.body)
    .then(cars => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        //res.status(201).json({car: car.toObject() })
        res.redirect('/cars')
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})


//UPDATE put req
router.put("/:id", (req,res) => {
    const id = req.params.id
    req.body.inStock = req.body.inStock === 'on' ? true : false
    Cars.findById(id)
    .then(cars => {
        if(cars.owner == req.session.userId) {
            return cars.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
        
    })
    .then(() => {res.redirect(`/cars/${id}`)})
    .catch(err => res.redirect(`/error?error=${err}`)) 
})

//DELETE
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Cars.findByIdAndRemove(id)
    .then(cars => {
        res.redirect('/cars')
    })
    .catch(err => {res.redirect(`/error?error=${err}`) })
})

//Export the router
module.exports = router