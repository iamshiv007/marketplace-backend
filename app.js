const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// ConnectDb
const connectDb = require('./connection/connect')
connectDb()

// Routes
const routes = require('./routes/router')
app.use("/api", routes)

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`Server is running on PORT http://localhost:${port}`)
})

// Test 
app.get('/', (req, res) => {
    res.status(200).json({ message: "Test Success" })
})