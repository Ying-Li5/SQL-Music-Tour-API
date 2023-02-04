// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

app.get('/events', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API Events Listing'
    })
})

app.get('/stages', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API Stages Listing'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)