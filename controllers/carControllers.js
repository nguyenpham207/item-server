
const express = require("express")
const Car = require("../models/car")


const router = express.Router()


router.get("/", (req, res) => {
   
    req.body.owner = req.session.userId
   
    Car.find({})
        .then(cars => {
          
            res.json({ cars: cars })
        })
        .catch(err => console.log(err))
})

router.get('/mine', (req, res) => {
    
    Car.find({ owner: req.session.userId })
   
        .then(cars => {
            res.status(200).json({ cars: cars })
        })
    
        .catch(error => res.json(error))
})

router.post("/", (req, res) => {

    req.body.owner = req.session.userId
    
    Car.create(req.body)
        .then(car => {
            
            res.status(201).json({ car: car.toObject() })
        })
        .catch(error => console.log(error))
})



router.put("/:id", (req, res) => {
 
    const id = req.params.id
    Car.findById(id)
        .then(car => {
            if (car.owner == req.session.userId) {
                res.sendStatus(204)
                return car.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .catch(error => res.json(error))
})

router.delete("/:id", (req, res) => {
    
    const id = req.params.id
   
    Car.findById(id)
        .then(car => {
           
            if (car.owner == req.session.userId) {
                
                res.sendStatus(204)
                return car.deleteOne()
            } else {
               
                res.sendStatus(401)
            }
        })
        
        .catch(err => res.json(err))
})


router.get("/:id", (req, res) => {
    const id = req.params.id

    Car.findById(id)
        
        .populate("comments.author", "username")
        .then(car => {
            res.json({ car: car })
        })
        .catch(err => console.log(err))
})


module.exports = router