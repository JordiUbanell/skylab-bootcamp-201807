const mongoose = require('mongoose')
const { Story } = require('./schemas')

module.exports = mongoose.model('Story', Story)