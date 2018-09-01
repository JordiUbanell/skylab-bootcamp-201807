'use strict'

const { Schema, Schema: { Types: { ObjectId } }} = require('mongoose')

module.exports = new Schema({

    title: {
        type: String,
        required: true, 
        minlength: 4,
        maxlength: 90
    },

    photo: { 
        type: String,
        required: true
    },
    
    link: String,

    date: {
        type: Date,
        required: true
    },

    story: [{
        type: ObjectId,
        ref: 'Story'
    }],

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})