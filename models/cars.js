
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')
// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema, model } = mongoose
// schema
const carSchema = new Schema({
    name: String,
    color: String,
    eletric: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, {timestamps: true})

// make model
const Car = model("cars", carSchema)

//export model
module.exports = Car