require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Product, Story, User } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `persona-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connection
    let usersCount = 0

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
        })
    })

    true && describe('register user', () => {
        beforeEach(() =>
            Promise.all([
                Product.deleteMany(),
                User.deleteMany()
            ])
                .then(() => {
                    let count = Math.floor(Math.random() * 100)

                    const creations = []

                    while (count--) creations.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                    if (usersCount = creations.length)
                        return User.create(creations)
                })
        )

        after(() => Promise.all([
            User.deleteMany()
        ]))

        it('should register correctly', () =>
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    return User.find()
                })
                .then(users => expect(users.length).to.equal(usersCount + 1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password })
                .then(() => logic.register(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('authenticate user', () => {
        beforeEach(() => User.create({ email, password }))

        after(() => Promise.all([
            User.deleteMany()
        ]))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('update user', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => User.create({ email, password }))

        after(() => Promise.all([
            User.deleteMany()
        ]))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    true && describe('unregister user', () => {
        beforeEach(() => User.create({ email, password }))

        after(() => Promise.all([
            User.deleteMany()
        ]))

        it('should unregister user correctly', () =>
            logic.unregisterUser(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it('should fail on trying to unregister user with an undefined email', () =>
            logic.unregisterUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an empty email', () =>
            logic.unregisterUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with a numeric email', () =>
            logic.unregisterUser(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an undefined password', () =>
            logic.unregisterUser(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with an empty password', () =>
            logic.unregisterUser(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with a numeric password', () =>
            logic.unregisterUser(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add product', () => {
        const date = new Date(), title = 'my post about Lambretta', photo = "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg", link = "https://es.wallapop.com/item/lambretta-229672803"

        beforeEach(() => User.create({ email, password }))

        after(() => Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ]))

        it('should succeed on correct data', () =>
            logic.addProduct(email, title, photo, link, date)
                .then(res => {
                    expect(res).to.be.true
                    return User.findOne({ email })
                })
                .then(user => {
                    return Product.find({ user: user.id })
                })
                .then(products => {
                    expect(products.length).to.equal(1)

                    const [product] = products

                    expect(product.title).to.equal(title)
                    expect(product.photo).to.equal(photo)
                    expect(product.link).to.equal(link)
                    expect(product.date).to.deep.equal(date)

                })
        )

        it('should fail on trying to add product with an undefined mail', () =>
            logic.addProduct(undefined, title, photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add product with an empty email', () =>
            logic.addProduct('', title, photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add product with a numeric email', () =>
            logic.addProduct(123, title, photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add product with an undefined date', () =>
            logic.addProduct(email, title, photo, link, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add product with an empty date', () =>
            logic.addProduct(email, title, photo, link, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add product with a numeric date', () =>
            logic.addProduct(email, title, photo, link, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add product with an undefined title', () =>
            logic.addProduct(email, undefined, photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid title'))
        )

        it('should fail on trying to add product with an empty title', () =>
            logic.addProduct(email, '', photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid title'))
        )

        it('should fail on trying to add product with a numeric title', () =>
            logic.addProduct(email, 123, photo, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid title'))
        )

        it('should fail on trying to add product with an undefined photo', () =>
            logic.addProduct(email, title, undefined, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add product with an empty photo', () =>
            logic.addProduct(email, title, '', link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add product with a numeric photo', () =>
            logic.addProduct(email, title, 123, link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add product with an incorrect url photo', () =>
            logic.addProduct(email, title, 'kjsdfsk sdksdfj . ks', link, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add product with an undefined link', () =>
            logic.addProduct(email, title, photo, undefined, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid link`))
        )

        it('should fail on trying to add product with an empty link', () =>
            logic.addProduct(email, title, photo, '', date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid link`))
        )

        it('should fail on trying to add product with a numeric link', () =>
            logic.addProduct(email, title, photo, 123, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid link`))
        )

        it('should fail on trying to add product with an incorrect url link', () =>
            logic.addProduct(email, title, photo, 'kjsdfsk sdksdfj . ks', date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid link`))
        )

    })

    true && describe('remove product', () => {
        let products = [
            { date: new Date(), title: 'text 1', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date(), title: 'text 2', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date(), title: 'text 3', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date(), title: 'text 4', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" }
        ]

        let productId

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    const userId = user.id

                    const productsPromises = products.map(product => {
                        product.user = ObjectId(userId)

                        return Product.create(product)
                    })

                    return Promise.all(productsPromises)
                        .then(products => {
                            productId = products[0]._id.toString()

                            products.forEach(({ _id }) => {
                                user.products.push(_id)
                            })

                            return user.save()
                        })
                })
        )

        it('should succeed to delete on correct product id', () => {
            return logic.removeProduct(email, productId)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user.products.length).to.equal(products.length - 1)

                    // expect(user.products).to.deep.equal(products)
                })
        })

        it('should fail on non existing product', () => {
            const nonExistingId = ObjectId().toString()
            return logic.removeProduct(email, nonExistingId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`product with id ${nonExistingId} does not exist`))
        })

        after(() => Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ]))

    }),

    true && describe('list products', () => {
        let products = [
            { date: new Date('2018-08-20T12:10:15.474Z'), title: 'primer titular 1', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date('2018-08-23T13:00:00.000Z'), title: 'cumple jordi', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date('2018-08-24T13:15:00.000Z'), title: 'pizza', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date('2018-08-24T13:19:00.000Z'), title: 'la china', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" },
            { date: new Date('2018-08-24T13:21:00.000Z'), title: 'party hard', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" }
        ]

        beforeEach(() =>
            User.create({ email, password })
                .then(user => {
                    const userId = user.id

                    products.forEach(product => product.user = userId)

                    return Product.insertMany(products)
                })
                .then(_products => products = _products.map(product => product._doc))
        )

        after(() => Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ]))

        it('should list all user products', () => {
            return logic.listProducts(email)
                .then(_products => {

                    expect(_products.length).to.equal(products.length)

                    const normalizedProducts = products.map(product => {
                        product.id = product._id.toString()

                        delete product._id

                        delete product.user

                        delete product.__v

                        return product
                    })

                    expect(_products).to.deep.equal(normalizedProducts)
                })
        })


    })

    true && describe('add story', () => {
        const date = new Date(), text = 'explaining something about lambretta', like = 12
        const product = { title: 'my post about Lambretta', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg", link: "https://es.wallapop.com/item/lambretta-229672803" }
        let productId

        beforeEach(() => {
            return User.create({ email, password })
                .then(user => {
                    const userId = user._id
                    return Product.create({ ...product, user: userId, date })
                })
                .then(product => {
                    productId = product._id
                })
        })

        after(() => Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ]))

        it('should succeed on correct data', () => {
            return logic.addStory(email, text, like, date, productId)
                .then(res => {
                    expect(res).to.be.true

                    return Story.find()
                })
                .then(stories => {
                    expect(stories.length).to.equal(1)

                    expect(stories[0].product.toString()).to.equal(productId.toString())
                    expect(stories[0].text).to.equal(text)
                    expect(stories[0].like).to.equal(like)
                    expect(stories[0].date).to.deep.equal(date)
                })
        })

        it('should fail on trying to add story with an undefined mail', () =>
            logic.addStory(undefined, text, like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add story with an empty email', () =>
            logic.addStory('', text, like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add story with a numeric email', () =>
            logic.addStory(123, text, like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add story with an undefined date', () =>
            logic.addStory(email, text, like, undefined, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add story with an empty date', () =>
            logic.addStory(email, text, like, '', productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add story with a numeric date', () =>
            logic.addStory(email, text, like, 123, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add story with an undefined text', () =>
            logic.addStory(email, undefined, like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add story with an empty text', () =>
            logic.addStory(email, '', like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add story with a numeric text', () =>
            logic.addStory(email, 123, like, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add story with an undefined like', () =>
            logic.addStory(email, text, undefined, date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid like`))
        )

        it('should fail on trying to add story with an empty like', () =>
            logic.addStory(email, text, '', date, productId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid like`))
        )
    })

    // const date = new Date(), text = 'explaining something about lambretta', like = 12
    // const product = { title: 'my post about Lambretta', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg", link: "https://es.wallapop.com/item/lambretta-229672803" }
    // let productId

    // beforeEach(() => {
    //     return User.create({ email, password })
    //         .then(user => {
    //             const userId = user._id
    //             return Product.create({ ...product, user: userId, date })
    //         })
    //         .then(product => {
    //             productId = product._id
    //         })
    // })


    !true && describe('list stories', () => {
        let product = { date: new Date(), title: 'text 1', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" }
            
        let stories = [
            {text: 'Story 1', like: 1, date: new Date()},
            {text: 'Story 2', like: 2, date: new Date()}
        ]

        let productId, userId

        beforeEach(() =>
            User.create({ email, password })
                .then(user => {
                    userId = user.id
    
                    return Product.create({...product, user: ObjectId(userId)})
                })
                .then(product => {
                    productId = product._id

                    stories.forEach(story => {
                        story.user = userId
                        story.product = productId
                    })
                    
                    debugger
                    return Story.insertMany(stories)
                })
        )

        after(() => Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ]))

        it('should list all stories of one product', () => {
            debugger
            return logic.listStories(email, productId)
                .then(stories => {
                    debugger
                })
            })
        })

    !!true && describe('add likes to stories', () => {
        let product = { date: new Date(), title: 'text 1', photo: "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg" }
            
        let stories = [
            {text: 'Story 1', like: 1, date: new Date()},
            {text: 'Story 2', like: 2, date: new Date()}
        ]

        let productId, userId, storyId

        beforeEach(() => {
            return User.create({ email, password })
                .then(user => {
                    userId = user.id
    
                    return Product.create({...product, user: ObjectId(userId)})
                })
                .then(product => {
                    productId = product._id

                    stories.forEach(story => {
                        story.user = userId
                        story.product = productId
                    })

                    return Story.insertMany(stories)
                })
                .then(stories => {
                    storyId = stories[0]._id
                })
        })

        it('should toggle correctly', () => {
            return logic.addLikeToStory(email, productId, storyId)
                .then(res => {
                    expect(res).to.be.true
                    //TODO: Que la historia tiene 2 likes

                    return logic.addLikeToStory(email, productId, storyId)
                })

                .then(res => {
                    debugger
                    return User.findById(userId)
                })

                // TODO: que el usuario tiene los likes que tocan
                
                .then((user) => {
                    debugger
                    expect(user.liked.length).to.equal(2)
                })
        })
    })

    after(() =>
        Promise.all([
            Product.deleteMany(),
            Story.deleteMany(),
            User.deleteMany()
        ])
        .then(() => _connection.disconnect())
    )
})