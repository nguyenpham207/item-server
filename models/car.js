
const mongoose = require('./connection')
const User = require('./user')


const commentSchema = require('./comment')


const { Schema, model } = mongoose


const carSchema = new Schema({
    name: String,
    color: String,
    brandNew: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

const Car = model("Car", carSchema)

module.exports = Car