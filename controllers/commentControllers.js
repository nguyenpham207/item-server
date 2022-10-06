
const express = require("express")
const Car = require("../models/car")


const router = express.Router()


router.post("/:carId", (req, res) => {
    const carId = req.params.carId

    if (req.session.loggedIn) {
        
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    
    Car.findById(carId)
        
        .then(car => {
            
            car.comments.push(req.body)
            
            return car.save()
        })
        .then(car => {
            res.status(200).json({ car: car })
        })
        
        .catch(error => console.log(error))
})


router.delete('/delete/:carId/:commId', (req, res) => {
  
    const carId = req.params.carId 
    const commId = req.params.commId
    
    Car.findById(carId)
        .then(car => {
           
            const theComment = car.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            
            if (req.session.loggedIn) {
               
                if (theComment.author == req.session.userId) {
                    
                    theComment.remove()
                    car.save()
                    res.sendStatus(204)
                    
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
       
        .catch(error => console.log(error))

})


module.exports = router