const validateEmail = require('../utils/validate-email')
// const emailToId = require('../utils/email-to-id')
const validateUrl = require('../utils/validate-url')
const {
    Product,
    Story,
    User
} = require('../data/models')
const cloudinary = require('cloudinary')



const { CLOUDINARY_CLOUD_NAME , CLOUDINARY_API_KEY , CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});



const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.trim().length || value === '/n') throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateDateField(name, value) {
        if (typeof value !== 'number' || value !== value) throw new LogicError(`invalid ${name}`)
    },


    _validateNumber(name, value) {
        if (typeof value !== 'number') throw new Error(`invalid ${name}`)
    },

    _validateUrl(name, url) {
        if (!validateUrl(url)) throw new LogicError(`invalid ${name}`)
    },

    register(email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({
                    email,
                    password,
                    name,
                    surname
                })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return true
            })
    },

    _retrieveUser(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({
                    email
                }).lean()
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                delete user.__v
                delete user._id
                delete user.password
                delete user.liked
                delete user.products
                delete user.stories
        
                return user
            })
    },


    updateProfile(email,password,newName = undefined,newSurname = undefined,newPassword = undefined) {
        return Promise.resolve()
            .then(() => {
                if(newName)this._validateStringField('new name', newName)
                if(newSurname)this._validateStringField('new surname', newSurname)
                if(newPassword)this._validateStringField('new password', newPassword)
                return User.findOne({
                    email
                })
            })
            .then(user => {
                debugger
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                if(newPassword !== undefined && newPassword.length)user.password = newPassword

                if(newName !== undefined) user.name = newName

                if(newSurname !== undefined) user.surname = newSurname

                return user.save()
            })
            .then(() => true)
    },

    deleteUser(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({
                    _id: user._id
                })
            })
            .then(() => true)
    },

    addProduct(email, title, photo, link, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateDateField('date', date)
                this._validateStringField('title', title)
                this._validateUrl('link', link)
                this._validateUrl('photo', photo)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                date = new Date(date)

                const product = {
                    date,
                    title,
                    photo,
                    link,
                    user: user.id
                }

                return Product.create(product)
            })
            .then(product => product.id)
    },

    // registerUser(registerData) {    
    //     if(registerData.photoProfile) return axios.patch(`${API_URL}/uploadPhoto`,{base64Image:registerData.photoProfile})
    //       .then(({data}) => {
    //         return axios
    //         .post(`${API_URL}/users/`,{...registerData,...{photoProfile:data.photo}})
    //           .then(res => res)
    //       })
    //     else {
    //       return axios
    //         .post(`${API_URL}/users/`,{...registerData})
    //           .then(res => res)
    //     }    
    //   },

    updateProduct(email, title, photo, link, productId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)
                this._validateUrl('photo', photo)
                this._validateUrl('link', link)

                return User.findOne({
                    email
                })
            })

            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Product.findById(productId)
            })

            .then(product => {
                if (!product) throw new LogicError(`product with ${productId} does not exist`)

                product.title = title
                product.photo = photo
                product.link = link

                return product.save()
            })
            .then(() => true)
    },

    // .then(user => {
    //     if (!user) throw new LogicError(`user with ${email} email does not exist`)

    //     if (user.password !== password) throw new LogicError(`wrong password`)

    //     if (password === newPassword) throw new LogicError('new password must be different to old password')

    //     user.password = newPassword

    //     return user.save()
    // })
    // .then(() => true)


    removeProduct(email, productId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField("productId", productId)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Product.findOne({
                    _id: productId
                })
                    .then(product => {
                        if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                        if (product.user.toString() !== user.id) throw new LogicError('product does not belong to user')

                        const pos = user.products.indexOf(productId)

                        user.products.splice(pos, 1)

                        return user.save()
                    })
                    .then(() => {
                        return Product.deleteOne({
                            _id: productId
                        })
                    })
            })
            .then(() => {
                return true
            })
    },

    listAllProducts() {
        return Promise.resolve()
            .then(() => {
                return Product.find({}, {
                    __v: 0
                }).sort({ date: -1 }).populate([
                    {
                        path:'user',
                        select:{name:1,surname:1,_id:0}
                    },
                    {
                        path:'story',
                        select:{like:1,_id:0}
                    }
                ]).lean()
            })
            .then(products => {
                console.log(products)
                if (products) {
                    products.forEach(product => {
                        product.id = product._id.toString()

                        delete product._id
                        delete product.story._id
                    })
                }
                return products || []
            })
    },

    listProducts(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                // return Product.find({ user: user._id }, { __v: 0 }).lean()

                return Product.find({
                    user: user._id
                }, {
                        __v: 0
                    }).lean()
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

    // return Product.findById(productId)
    //     .populate([
    //         {
    //             path: 'user',
    //             select: 'name surname -_id'
    //         },
    //         {
    //             path: 'story',
    //             select: 'text like date',
    //             options: { sort: { like: -1 }, lean: true },
    //             populate: {
    //                 path: 'user',
    //                 select: 'name surname -_id',
    //                 options: {  lean: true }
    //             }
    //         }
    //     ])
    //     .lean()




    //TODO: Retrieve product by id !!!!!!!!!!!

    // populate({
    //     path: 'user'
    //     , select: 'email name surname photo products reviews'
    //     , options: { lean: true}
    //     , populate: {
    //         path: 'products'
    //         , select: 'state'
    //         , where: { 'state': { '$in': ['sold', 'reserved', 'pending']}}
    //         , options: { lean: true}
    //     }
    // }).
    // lean()

    retrieveProductById(productId) {
        return Promise.resolve()
            .then(() => {
                return Product.findById(productId).populate([
                    {
                        path: 'user',
                        options: { lean: true }
                    },
                    {
                        path: 'story',
                        options: { lean: true },
                        populate: {
                            path: 'user',
                            options: { lean: true }
                        }
                    }
                ]).lean()
            })
            .then(product => {
                delete product.user.__v
                delete product.user._id
                delete product.user.email
                delete product.user.password
                delete product.user.products
                delete product.user.stories
                delete product.user.liked

                return product
            })
            .then(product => {
                product.story.forEach(story => {
                    story.id = story._id.toString()

                    delete story.__v
                    delete story._id
                    delete story.product

                })

                return product
            })
    },

    // .then(stories => {

    //     if (stories) {
    //         debugger
    //         stories.forEach(story => {
    //             story.id = story._id.toString()

    //             delete story._id
    //             delete story.__v
    //         })
    //     }
    //     return stories || []
    // })

    addStory(email, text, like, date, product) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateDateField('date', date)
                this._validateStringField('text', text)
                this._validateNumber('like', like)
                if (text.length < 5 ) throw Error('Text too short') 

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const story = {
                    date,
                    text,
                    like,
                    product,
                    user: user.id
                }

                return Story.create(story)
            })
            .then(story => {
                //TODO: Save created story to the product
                // 1. story create devuelve un story, de ahí sacas el story id
                // 2. buscas el producto por el "product"
                // 3. El producto encontrado: product.history.push(historyId)
                // 4. return product.save()
                // 5. return true

                const storyId = story.id

                return Product.findById(product)
                    .then(product => {
                        if (!product) throw Error('Product not found')

                        product.story.push(storyId)

                        return product.save()
                    })
                    .then(() => {
                        return storyId
                    })
            })
    },

    removeStory(email, storyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Story.findOne({
                    _id: storyId
                })
                    .then(story => {
                        if (!story) throw new LogicError(`story with id ${storyId} does not exist`)

                        if (story.user.toString() !== user.id) throw new LogicError('story does not belong to user')

                        const pos = user.stories.indexOf(storyId)

                        user.stories.splice(pos, 1)

                        return user.save()
                    })
            })
            .then(() => {
                return Story.deleteOne({
                    _id: storyId
                })
            })
            .then(() => {
                return true
            })
    },

    updateStory(email, text, productId, storyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('text', text)

                return User.findOne({
                    email
                })
            })

            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Product.findById(productId)
            })

            .then(product => {
                if (!product) throw new LogicError(`product with ${productId} does not exist`)

                return Story.findById(storyId)
            })

            .then(story => {
                if (!story) throw new LogicError(`story with ${storyId} does not exist`)

                story.text = text

                return story.save()
            })

            .then(() => storyId)


        // const storyId = story.id

        // return Product.findById({
        //     _id: product
        // })
        // .then(product => {
        //     product.story.push(storyId)
        //     product.save()
        // })
        // .then(() => storyId)

    },


    // listAllStoriesByProductId(productId) {
    //     return Promise.resolve()
    //         .then(() => {
    //             return Product.findById(productId).populate({
    //                 path: 'story',
    //                 options: { sort: { like: -1  } }
    //             })
    //             .lean()
    //         })
    //         .then(product => {
    //             if (!product) throw new LogicError(`product with ${productId} product does not exist`)

    //             const stories = product.story

    //             if (stories) {
    //                 stories.forEach(story => {
    //                     story.id = story._id.toString()

    //                     delete story._id
    //                     delete story.__v
    //                 })
    //             }

    //             return stories || []
    //         })
    // },

    // listAllProducts() {
    //     return Promise.resolve()
    //         .then(() => {
    //             return Product.find({}, {
    //                 __v: 0
    //             }).populate('user').sort({ date: -1 }).lean()
    //         })
    //         .then(products => {
    //             if (products) {
    //                 products.forEach(product => {
    //                     product.id = product._id.toString()

    //                     delete product._id
    //                 })
    //             }
    //             return products || []
    //         })
    // },

    listAllStoriesByProductId(productId) {
        return Promise.resolve()
            .then(() => {
                return Product.findById(productId)
                    .populate([
                        {
                            path: 'user',
                            select: 'name surname -_id'
                        },
                        {
                            path: 'story',
                            select: 'text like date',
                            options: { sort: { like: -1 }, lean: true },
                            populate: {
                                path: 'user',
                                select: 'name surname email -_id',
                                options: { lean: true }
                            }
                        }
                    ])
                    .lean()
            })
            .then(product => {
                if (!product) throw new LogicError(`product with ${productId} product does not exist`)

                product.id = product._id.toString()

                delete product._id
                delete product.__v

                const stories = product.story

                if (stories) {
                    stories.forEach(story => {
                        story.id = story._id.toString()

                        delete story._id
                        delete story.__v
                    })
                }

                return product || []
            })
    },

    addLikeToStory(email, productId, storyId) {
        let _user, _story
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({
                    email
                })
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

                _user.liked.forEach(id => {
                    if (id.toString() === storyId.toString()) {
                        isLiked = true
                    }
                })

                if (isLiked) {
                    story.like--
                    const pos = _user.liked.indexOf(storyId)
                    _user.liked.splice(pos, 1)
                } else {
                    story.like++
                    _user.liked.push(storyId)
                }

                return _user.save()
            })
            .then(() => {
                return _story.save()
            })
            .then(() => true)
    },

    saveImage(base64Image) {
        return new Promise((resolve, reject) => cloudinary.v2.uploader.upload(base64Image, (err, data) => {
            if (err) return reject(err)
            resolve(data.url)
        }))
    },

    searchWord(word) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('word', word)
                return Product.find(({
                    "title": {
                        $regex: `.*${word}.*`
                    }
                }))
            })
            .then(products => {
                if (!products || !products.length) throw new LogicError(`no stories with "${word}"`)
                return products.map(ele => {
                    const {
                        title,
                        date,
                        photo,
                        _id,
                        user
                    } = ele._doc
                    const id = _id.toString()
                    return {
                        title,
                        date,
                        photo,
                        id,
                        user: user.toString()
                    }
                })
            })
    }
}




class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}


module.exports = {
    logic,
    LogicError
}