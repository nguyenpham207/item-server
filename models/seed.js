
const mongoose = require('./connection')
const Cars = require('./cars')

const db = mongoose.connection

db.on('open', () => {
    const startCars = [
        { name: "Rx7", color: "white", electric: false },
        { name: "evo 8", color: "grey", electric: false },
        { name: "Nsx", color: "red", electric: false },
        { name: "Wrx", color: "blue ", electric: false },
        { name: "s2000", color: "black", electric: false },
    ]
   
    Cars.deleteMany({})
        .then(deletedCars => {
            console.log('this is what deleteMany returns', deletedCars)

            // create a bunch of new cars from cars
            // use create or deleteMany
            Cars.create(startCars)
                .then(data => {
                    console.log('here are new cars', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})