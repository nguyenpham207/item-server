
const mongoose = require('./connection')
const Car = require('./car')

const db = mongoose.connection

db.on('open', () => {
    const startCars = [
        { name: "Rx7", color: "white", readyToEat: false },
        { name: "evo 8", color: "grey", readyToEat: false },
        { name: "Nsx", color: "red", readyToEat: false },
        { name: "Wrx", color: "blue ", readyToEat: false },
        { name: "s2000", color: "black", readyToEat: false },
    ]
   
    Car.remove({})
        .then(deletedCars => {
            console.log('this is what .remove returns', deletedCars)

            
            Car.create(startCars)
                .then(data => {
                    console.log('here are the newly created cars', data)

                    db.close()
                })
                .catch(error => {
                    console.log(error)

                    db.close()
                })

        })
        .catch(error => {
            console.log(error)
            
            db.close()
        })
})