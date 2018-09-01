const validateEmail = require('../utils/validate-email')
const validateUrl = require('../utils/validate-url')
const { Product, Story, User } = require('../data/models')
const cloudinary = require('cloudinary')

cloudinary.config({
    presentname: "dli7dinrn",
    cloudname: "293695636911358",
    apikey: "6stBHNaJhgExbsCr_8ZlTmE-L0Q"
})

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.trim().length || value === '/n') throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateDateField(name, field) {
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

    // uploadPhoto(userId, base64Image) {

    //     return Promise.resolve()
    //     .then(() => {

    //         this._validateStringField("userId", userId)
    //         this._validateStringField("base64Image", base64Image)

    //         return new Promise((resolve, reject) => {
    //             return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
    //                 if (err) return reject(err)
    //                 resolve(data.url)
    //             })
    //         })
    //         .then(urlCloudinary => {
    //                 return User.findByIdAndUpdate(idUser, { photoProfile: urlCloudinary }, {new: true})
    //                     .then(user => {
    //                         return user.photoProfile
    //                 })
    //         })
    //     })
    // },

    addProduct(email, title, photo, link, date) {
        return Promise.resolve()
            .then(() => {
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

    removeProduct(email, productId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Product.findOne({ _id: productId })
                    .then(product => {
                        if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                        if (product.user.toString() !== user.id) throw new LogicError('product does not belong to user')

                        const pos = user.products.indexOf(productId)

                        user.products.splice(pos, 1)

                        return user.save()
                    })
            })
            .then(() => {
                return Product.deleteOne({ _id: productId })
            })
            .then(() => {
                return true
            })
    },


    listProducts(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                return Product.find({ user: user._id }, { __v: 0 }).lean()
            })
            .then(products => {
                if (products) {
                    products.forEach(product => {
                        product.id = product._id.toString()

                        delete product._id

                        delete product.user
                    })
                }
                return products || []
            })
    },

    addStory(email, text, like, date, product) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateDateField('date', date)
                this._validateStringField('text', text)
                this._validateNumber('like', like)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const story = { date, text, like, product, user: user.id }

                return Story.create(story)
            })
            .then(() => true)
    },

    removeStory(email, storyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Story.findOne({ _id: storyId })
                    .then(story => {
                        if (!story) throw new LogicError(`story with id ${storyId} does not exist`)

                        if (story.user.toString() !== user.id) throw new LogicError('story does not belong to user')

                        const pos = user.stories.indexOf(storyId)

                        user.stories.splice(pos, 1)

                        return user.save()
                    })
            })
            .then(() => {
                return Story.deleteOne({ _id: storyId })
            })
            .then(() => {
                return true
            })
    },

    listStories(email, productId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                return Product.find({ user: user._id }, { __v: 0 }).lean()
            })
            .then(products => {
                if (!products) throw new LogicError(`product with ${productId} product does not exist`)
                return Story.find({ product: product._id }, { __v: 0 }).lean()
            })

            .then(stories => {
                if (stories) {
                    stories.forEach(story => {
                        story.id = story._id.toString()

                        delete story._id

                        delete product._id

                        delete story.user

                    })
                }
                return stories || []
            })
    },

    addLikeToStory(email, productId, storyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                
                let _user, _story

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)    
                _user = user

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with ${productId} product does not exist`)
                return Story.findById(storyId)
            })
            .then(story => {
                if (!story) throw new LogicError(`story with ${storyId} story does not exist`)
                
                _story = story
                let isLiked = false

                _user.liked.forEach(story => {
                    if(story._id.toString() === storyId.toString()) {
                        isLiked = true
                    }
                })

                if(isLiked) {
                    story.like --

                    const pos = _user.liked.indexOf(storyId)
                    _user.liked.splice(pos, 1)
                }
                else {
                    story.like ++
                    _user.liked.push(storyId)
                }

                return _user.save()
            })
            .then(() => {
                return _story.save()
            })
            .then(() => true)
    },

    // addLiketToStory(email, productId, storyId) {
    //     return Promise.resolve()
    //         .then(() => {
    //             this._validateEmail(email)
                
    //             let _user, _story

    //             return User.findOne({ email })
    //         })
    //         .then(user => {
    //             if (!user) throw new LogicError(`user with ${email} email does not exist`)    
    //             _user = user

    //             return Product.findById(productId)
    //         })
    //         .then(product => {
    //             if (!product) throw new LogicError(`product with ${productId} product does not exist`)
    //             return Story.findById(storyId)
    //         })
    //         .then(story => {
    //             if (!story) throw new LogicError(`story with ${storyId} story does not exist`)
                
    //             _story = story

    //             let isLiked = false
    //             _user.liked.forEach(story => {
    //                 if(story._id.toString() === storyId.toString()) {
    //                     isLiked = true
    //                 }
    //             })

    //             if(isLiked) {
    //                 story.like --

    //                 const pos = _user.liked.indexOf(storyId)
    //                 _user.liked.splice(pos, 1)
    //             }
    //             else {
    //                 story.like ++
    //                 _user.liked.push(storyId)
    //             }

    //             return _user.save()
    //         })
    //         .then(() => {
    //             return _story.save()
    //         })
    //         .then(() => true)
    // },

    searchWord(email, word, productId){
        return Promise.resolve()
        .then(() => {
            this._validateEmail(email)
            return User.findOne({ email })
        })

        .then(user => {
            if (!user) throw new LogicError(`user with ${email} email does not exist`)
            return Product.find({ user: user._id }, { __v: 0 }).lean()
        })

        .then(products => {
            if (!products) throw new LogicError(`product with ${productId} product does not exist`)
            return Story.find({ product: product._id }, { __v: 0 }).lean()
        })
        return Product.title.find(word)                                                               
    }
}


class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}


module.exports = { logic, LogicError }