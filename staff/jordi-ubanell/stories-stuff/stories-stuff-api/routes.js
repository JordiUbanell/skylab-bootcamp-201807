require('dotenv').config()

const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()
const jsonBodyParser = bodyParser.json({limit: '3mb'});

// router.post("/user/:email/products/create", [validateJwt, fileUpload()], (req: Request | any, res: Response) => {
//     const { params: { email }, files } = req;
//    ​
//     if (files && files.image) {
//      const { image } = files;
//    ​
//      logic.post.uploadTest(email, image.name, image.data)
//       .then(() => res.status(201).json({ message: "post saved" }))
//       .catch((err: any) => {
//        const { message } = err;
//    ​
//        res.status(err instanceof LogicError ? 400 : 500).json({ message });
//       });
//     } else {
//      res.status(418).json({ message: "no image received" });
//     }
//    });


// register
router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name, surname} } = req

    logic.register(email, password, name, surname)
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// unregister
router.delete('/unregister', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.register(email, password)
        .then(() => res.status(201).json({ message: 'user unregistered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// retrieve user

router.get('/user/:email', validateJwt, (req, res) => {
    const { params: { email } } = req

    logic._retrieveUser(email)
        .then(data => res.status(201).json({ message: 'OK', data }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


// authenticate
router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.status(200).json({ message: 'user authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

// update password
router.patch('/user/:email/update', [validateJwt, jsonBodyParser], (req, res) => {
    let { params: { email }, body: { password, newName, newSurname, newPassword } } = req
    debugger
    logic.updateProfile(email, password,newName, newSurname, newPassword )
        .then(() => res.json({ message: 'user updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// // update profile
// router.patch('/user/:email/updateprofile', [validateJwt, jsonBodyParser], (req, res) => {
//     const { params: { email }, body: { password, newPassword } } = req

//     logic.updatePassword(email, password, newPassword, name, surname, photo, products)
//         .then(() => res.json({ message: 'user updated' }))
//         .catch(err => {
//             const { message } = err

//             res.status(err instanceof LogicError ? 400 : 500).json({ message })
//         })
// })

// list products (by user)
router.get('/user/:email/listproducts', validateJwt, (req, res) => {
    const { params: { email } } = req

    logic.listProducts(email)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// list all products from everybody
router.get('/listallproducts', (req, res) => {

    logic.listAllProducts()
        .then(products => res.json({ products }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// list all stories of one product from everybody
router.get('/products/:productId/listallstories', (req, res) => {
    const { params: { productId } } = req

    logic.listAllStoriesByProductId(productId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// list stories of one user
router.get('/user/:email/products/:productId/liststories', validateJwt, (req, res) => {
    const { params: { email, productId } } = req

    logic.listStories(email, productId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// add product
router.post('/user/:email/products',  [validateJwt,jsonBodyParser], (req, res) => {
    const { params: { email}, body: { title, photo, link, date } } = req

    return logic.addProduct(email, title, photo, link, date)
        .then(id => res.status(201).json({message:'product added correctly',id}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// delete product
router.delete('/user/:email/products/:productId', validateJwt, (req, res) => {
    const { params: { email, productId } } = req

    logic.removeProduct(email,productId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// update product
router.patch('/user/:email/product/:productid/update', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, productId }, body: { title, photo, link }} = req

    logic.updateProduct(email, title, photo, link, productId)
        .then(() => res.json({ message: 'product updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// retrieve product by id

router.get('/products/:productId', (req, res) => {
    const { params: { productId } } = req

    logic.retrieveProductById(productId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// add story
router.post('/user/:email/product/:productId/stories', [validateJwt,jsonBodyParser], (req, res) => {
    const { body: {text, like, date}, params: { email, productId} } = req

    logic.addStory(email,text, JSON.parse(like), date, productId)
        .then(storyId => res.status(201).json(storyId))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// delete story
router.delete('/user/:email/stories/:storyId', validateJwt, (req, res) => {
    const { params: { email, storyId } } = req

    logic.removeStory(email, storyId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// update story
router.patch('/user/:email/product/:productId/story/:storyId/update', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, productId, storyId }, body: { text }} = req

    logic.updateStory(email, text, productId, storyId)
        .then(() => res.json({ message: 'story updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// add like
router.post('/user/:email/products/:productId/stories/:storyId/like', validateJwt, (req, res) => {
    const { params: { email, productId, storyId } } = req

    logic.addLikeToStory(email, productId, storyId)
        .then(res.status(201).json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// search by word
router.get('/search/:query', (req, res) => {
    const { params: { query } } = req

    logic.searchWord(query)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// upload image
router.post('/user/:email/saveimage', validateJwt, (req, res) => {
    const { params: { email }, body: { base64Image } } = req

    logic.saveImage(email, base64Image)
        .then(url => res.json({ message: 'Save image correctly', url }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


// router.post('/saveimage', jsonBodyParser, (req, res) => {
//     const { body: { base64Image } } = req

//     logic.saveImage(base64Image)
//         .then(url => res.json({ message: 'Save image correctly', url }))
//         .catch(err => {
//             const { message } = err
//             res.status(err instanceof LogicError ? 400 : 500).json({ message })
//         })
// })


module.exports = router
