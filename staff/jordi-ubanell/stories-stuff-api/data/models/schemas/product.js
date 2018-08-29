'use strict'

const { Schema, Schema: { Types: { ObjectId } }} = require('mongoose')

module.exports = new Schema({

    title: String,

    photo: String,
    
    link: String,

    date: {
        type: Date,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})