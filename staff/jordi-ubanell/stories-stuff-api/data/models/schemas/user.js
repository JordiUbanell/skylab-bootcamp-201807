const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Story = require('./story')

function validatePassword(password) {
    if (password.length < 6) throw Error('password length is too short')
}

module.exports = new Schema({
    email: {
        type: String,
        required: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },

    password: {
        type: String,
        required: true,
        validate: validatePassword
    },

    name: {
        type: String
    },

    surname: {
        type: String
    },

    photo: {
        type: String
    },

    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    
    stories: [{
        type: ObjectId,
        ref: 'Story'
    }],

    liked: [{
            type: ObjectId,
            ref: 'Story'

    }]
})