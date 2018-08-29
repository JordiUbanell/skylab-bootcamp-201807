const validateEmail = require('../utils/validate-email')
const validateUrl = require('../utils/validate-url')
const moment = require('moment')
const { Product, Story, User } = require('../data/models')

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.trim().length) throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateDateField(name, field) {
        debugger
        if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
    },

    _validateNumber(name, value) {
        if (typeof value !== 'number') throw new Error(`invalid ${name}`)
    },

    _validateUrl(name, url) {
        if (!validateUrl(url)) throw new LogicError(`invalid ${name}`)  
    },

    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return true
            })
    },

    updatePassword(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                user.password = newPassword

                return user.save()
            })
            .then(() => true)
    },

    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    },

    addProduct(email, title, photo, link, date) {
        return Promise.resolve()
        .then(() => {
            debugger
                this._validateEmail(email)
                this._validateDateField('date', date)
                this._validateStringField('title', title)
                this._validateUrl('link', link)
                this._validateUrl('photo', photo)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const product = { date, title, photo, link, user: user.id }

                return Product.create(product)
            })
            .then(() => true)
    },

    listProducts(email, date) {
            return Promise.resolve()
                .then(() => {
                    this._validateEmail(email)

                    return User.findOne({ mail })
                })
                .then(user => {
                    if (!user) throw new LogicError(`user with ${email} email does not exist`)
                    const mDate = moment(date)
                })
    }

    // listNotes(email, date) {
    //     return Promise.resolve()
    //         .then(() => {
    //             this._validateEmail(email)

    //             return User.findOne({ email })
    //         })
    //         .then(user => {
    //             if (!user) throw new LogicError(`user with ${email} email does not exist`)

    //             const mDate = moment(date)

    //             const minDate = mDate.startOf('day').toDate()
    //             const maxDate = mDate.endOf('day').toDate()

    //             return Note.find({ user: user._id, date: { $gte: minDate, $lte: maxDate } }, { __v: 0 }).lean()
    //         })
    //         .then(notes => {
    //             if (notes) {
    //                 notes.forEach(note => {
    //                     note.id = note._id.toString()

    //                     delete note._id

    //                     delete note.user
    //                 })
    //             }

    //             return notes || []
    //         })
    // }
}


class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}


module.exports = { logic, LogicError }