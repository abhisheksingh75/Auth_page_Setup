const express = require("express")
const morgan = require("morgan")
var compression = require("compression")
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbconfig")

const app = express()

// cononect to db
dbConnect()

// middleware
app.use(compression())
app.use(bodyParser.json())
app.use(morgan("combined"))

// apply middleware source to destination mapping of routes
app.use("/api/auth", require("./routes/api/auth"))

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server is listing on port ${port}`)
})
