// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db 
const { Op } = require('sequelize')
   
// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'ascending_date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC EVENTS
events.get('/:id', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A EVENTS
events.post('/', async (req, res) => {
    try {
        const newEvents = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newEvents
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A EVENTS
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                events_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A EVENTS
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                events_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events