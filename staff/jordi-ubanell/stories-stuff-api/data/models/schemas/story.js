'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({

    text: String,
    
    likes: Number,

    date: {
        type: Date,
        required: true
    },

    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})