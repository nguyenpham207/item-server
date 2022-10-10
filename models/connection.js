

//dependencies
require("dotenv").config()
const mongoose = require("mongoose")

// Database connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true, // need these to connect and run mongoose
  useUnifiedTopology: true,
}

// Establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do with certain events
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

  module.exports= mongoose