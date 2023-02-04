// DEPENDENCIES
const meetGreets = require('express').Router()
const db = require('../models')
const { MeetGreets } = db 
const { Op } = require('sequelize')
   
// FIND ALL BANDS
meetGreets.get('/', async (req, res) => {
    try {
        const foundMeetGreets = await MeetGreets.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundMeetGreets)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND
meetGreets.get('/:id', async (req, res) => {
    try {
        const foundMeetGreets = await MeetGreets.findOne({
            where: { meet_greet_id: req.params.id }
        })
        res.status(200).json(foundMeetGreets)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
meetGreets.post('/', async (req, res) => {
    try {
        const newMeetGreets = await MeetGreets.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new meet and greet',
            data: newMeetGreets
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
meetGreets.put('/:id', async (req, res) => {
    try {
        const updatedMeetGreets = await MeetGreets.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedMeetGreets} meet and greet(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
meetGreets.delete('/:id', async (req, res) => {
    try {
        const deletedMeetGreets = await MeetGreets.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedMeetGreets} meet and greet(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = meetGreets