////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Car = require("../models/cars")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////



//POST comments for only loggenIn users
router.post('/:carId', (req,res) => {
    const carId = req.params.carId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }

    //find car
    Car.findById(carId)
    .then(cars => {
        //push comment into array
        cars.comments.push(req.body)
        //saving car
        return cars.save()
    })
    .then(cars => {
        res.redirect(`/cars/${cars.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE only the author of the comment can delete it
router.delete('/delete/:carId/:commentId', (req,res) => {
    const carId = req.params.carId
    const commentId = req.params.commentId
    const err = 'you%20are%20not%20authorized%20for%20this%20action'

    Car.findById(carId)
        .then(cars => {
            //get the comment
            const theComment = cars.comments.id(commentId)
            //console.log('the found comment', theComment)
            if(req.session.loggedIn) {
                // only author can delete it
                if(theComment.author == req.session.userId) {
                    theComment.remove()
                    cars.save()
                    res.redirect(`/cars/${cars.id}`)
                } else {
                    
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                res.redirect(`/error?error=${err}`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router