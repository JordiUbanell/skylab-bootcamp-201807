const { Schema } = require('mongoose')
const Product = require('./Product')
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

    products: [Product],
    stories: [Story]
})