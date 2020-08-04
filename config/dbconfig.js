const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = async () => {
  try {
    console.log("MongoDB Atlas Connecting...")
    await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log("MongoDB Atlas Connected...")
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = dbConnect
