
const mongoose = require('./connection')
const Car = require('./car')

const db = mongoose.connection

db.on('open', () => {
    const startCars = [
        { name: "Rx7", color: "white", electric: false },
        { name: "evo 8", color: "grey", electric: false },
        { name: "Nsx", color: "red", electric: false },
        { name: "Wrx", color: "blue ", electric: false },
        { name: "s2000", color: "black", electric: false },
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