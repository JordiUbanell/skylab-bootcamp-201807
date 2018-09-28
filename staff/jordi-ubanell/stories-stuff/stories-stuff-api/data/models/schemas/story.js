'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({

    text: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 1000
    },
    
    like: Number,

    date: {
        type: Number,
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