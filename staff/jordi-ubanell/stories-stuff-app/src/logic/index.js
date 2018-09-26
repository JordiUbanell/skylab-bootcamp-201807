const validateEmail = require('./../utils/validate-email')
const validateUrl = require('./../utils/validate-url')

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.trim().length || value === '/n') throw Error(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw Error('invalid email')
    },

    _validateDateField(name, value) {
        if (typeof value !== 'number' || value !== value) throw Error(`invalid ${name}`)
    },


    _validateNumber(name, value) {
        if (typeof value !== 'number') throw Error(`invalid ${name}`)
    },

    _validateUrl(name, url) {
        if (!validateUrl(url)) throw Error(`invalid ${name}`)
    },

    /**
     * Set / Get userMail
     * 
     * @example - logic._userMail() // Returns the token
     * @example - logic._userMail(mail) // Saves the token
     * 
     * @param {*} userEmail 
     */
    _userEmail(userEmail) {
        debugger
        if (userEmail !== undefined) {
            this.userEmail = userEmail
            return
        }

        return this.userEmail
    },

    /**
     * Set / Get userToken
     * 
     * @example - logic._userToken() // Returns the token
     * @example - logic._userToken(token) // Saves the token
     * 
     * @param {String} userToken
     */
    _userToken(userToken) {
        if (userToken !== undefined) {
            this.userToken = userToken
            return
        }

        return this.userToken
    },

    /**
     * Set / Get userLikes
     * 
     * @example - logic._userLikes() // Returns true
     * @example - logic._userLikes(number of likes) // Update the value
     * 
     * @param {Number} userLikes 
     */
    _userLikes(userLikes) {
        if (userLikes !== undefined) {
            this.userLikes = userLikes
            return
        }

        return this.userLikes
    },

    /**
     * User API to register, login, update, unregister or logout an user account
     * 
     * @param {string} path 
     * @param {string} method 
     * @param {object} body 
     * @param {string} token 
     * 
     * @returns {Promise} a result of what we ask for
     * 
     * @throws {Promise} if there is an error throws an error message
     */
    _callApiStory(path, method = 'get', body, token, expectedStatus = 200) {

        const config = {
            method
        }
        const noGet = method !== 'get'
        if (noGet || token) {
            config.headers = {}
            if (noGet) config.headers['content-type'] = 'application/json'
            if (token) config.headers.authorization = 'Bearer ' + this._userToken()
        }
        if (body) config.body = JSON.stringify(body)

        // https://powerful-thicket-52138.herokuapp.com/api/ 
        //http://localhost:8080/api/

        return fetch('http://localhost:8080/api/' + path, config)
            .then(res => {
                debugger
                if (res.status === expectedStatus)
                    return res.json()
                else {
                    return res.json()
                        .then(({
                            message
                        }) => {
                            throw Error(message)
                        })
                }
            })
    },

    /**
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise} the id of the registered user
     */
    register(email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)

                if (password.length < 6) throw Error('Password must be at least 6 characters')

                return this._callApiStory('register', 'post', {
                    email,
                    password,
                    name, 
                    surname
                }, false, 201)
                    .then(() => {
                        return true
                    })
            })
    },

    /**
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise} the email, token of the logged user and saves in sessionStorage
     */
    authenticate(email, password) {
        return Promise.resolve().then(() => {
            this._validateEmail(email)
            this._validateStringField('password', password)

            return this._callApiStory('/authenticate', 'post', {
                email,
                password
            })
                .then(({
                    token
                }) => {
                    this._userEmail(email)
                    this._userToken(token)

                    return true
                })
        })
    },

    /**
     * @param {string} password
     * @param {string} newPassword
     * 
     * @returns {Promise} the newPassword replaced the old one
     */
    updatePassword(password, newPassword) {
        const data = {
            email: this._userEmail(),
            password
        }
        if (newPassword) data.newPassword = newPassword

        return this._callApiStory(`user/${this._userEmail()}/updatepassword`, 'PATCH', data, true)
            .then(() => {
                return true
            })
    },

    /**
     * @param {string} password
     * 
     * @returns {Promise} the user account deleted and the sessionStorage cleared
     */
    deleteUser(email, password) {
        return this._callApiStory(`/unregister`, {
            email: this.userEmail,
            password
        }, true)
            .then(() => {
                this.userEmail = null
                this.userToken = null

                return true
            })
    },

    /**
     * @returns {status} the email, token and id status to convert to null and to clear the sessionStorage
     */
    logout() {
        this.userEmail = null
        this.userToken = null
    },

    /**
     * @returns {status} the email, token status to know if the user is logged
     */
    // get loggedIn() {
    //     const res = this._userEmail() && this._userToken()
    //     return res
    // },


    
    // writeByUser() {
    //     const res = this._userEmail() && this._userToken() &&         
    // }

    loggedIn() {
        const res = this._userEmail() && this._userToken()

        return !!res
    },

    /**
     * @param {string} query
     * 
     * @returns {Promise} an ingredients list using a query
     */
    searchWord(query) {
        return this._callApiStory('user/search/instant?query=' + query)
            .then((res) => res)
    },

    addProduct(title, photo, link) {
        return Promise.resolve().then(() => {
            // TODO: Validaciones de los campos
            this._validateStringField('title', title)
            this._validateUrl('photo', photo)
            this._validateUrl('link', link)

            const date = Date.now()

            return this._callApiStory(`user/${this._userEmail()}/products`, 'POST', {
                title,
                photo,
                link,
                date
            }, {
                    authorization: `bearer ${this._userToken()}`,
                    'content-type': 'application/json'
                }, 201)

        })
    },
    
    updateProduct(title, photo, link, productId) {
        return Promise.resolve().then(() => {
            
            this._validateStringField('title', title)
            this._validateUrl('photo', photo)
            this._validateUrl('link', link)
            
            const date = Date.now()
            
            return this._callApiStory(`user/${this._userEmail()}/${productId}/update`, 'PATCH'
            )
        })
    },
    
    deleteProduct(_userEmail, productId) {
        return Promise.resolve().then(() =>
            this.removeProduct(`user/${this._userEmail()}/product/${productId}`)
            .then(products => products )
            )
    },

    listAllProducts() {
        return Promise.resolve().then(() => {          
            return this._callApiStory(`listallproducts`, 'GET', undefined, undefined, 200)
                .then((products) => {
                    return products
                })
                
        })
    },

    retrieveProductById(productId) {
        return Promise.resolve().then(() => {

            return this._callApiStory(`/product/${productId}`, 'GET', undefined, undefined, 201)
                .then((product) => product)

        })
    },

    addStory(text, like = 0, productId) {
        return Promise.resolve().then(() => {
            // TODO: Validaciones de los campos

            this._validateStringField('text', text)
            this._validateNumber('like', like)

            const date = Date.now()

            return this._callApiStory(`user/${this._userEmail()}/product/${productId}/stories`, 'POST',
                {
                    text,
                    like,
                    date
                },
                {
                    authorization: `bearer ${this._userToken()}`, 'content-type': 'application/json'
                }, 201)
                .then(storyId => storyId)
        })
    },

    listAllStoriesByProductId(productId) {
        return Promise.resolve().then(() =>
            this._callApiStory(`products/${productId}/listallstories`))
            .then(stories => stories)
    },

    updateStory(_userEmail, text, productId, storyId) {
        return Promise.resolve().then(() => {
            
            this._validateStringField('text', text)
            
            const date = Date.now()
            
            return this._callApiStory(`user/${this._userEmail()}/product/${productId}/story/${storyId}/update`, 'PATCH'
            )
        })
    },

    deleteStory(email, storyId) {
        return Promise.resolve().then(() =>
            this.removeStory(`user/${email}/stories/${storyId}`)
            .then(stories => stories )
            )
    },

    // /user/:email/stories/:storyId
    
    searchWord(word) {
        return Promise.resolve().then(() => {
            
            this._callApiStory(`user/search/${word}`)
            .then(result => result)

        })
    },
    
    AddLikeToStory(email, productId, storyId) {

        return Promise.resolve().then(() => {
            
            this._callApiStory(`/user/${email}/products/${productId}/stories/${storyId}/like`, 'POST',
            undefined,
            {
                authorization: `bearer ${this._userToken()}`, 'content-type': 'application/json'
            }, 201)
            .then(()=> true)
        })
    }
}



if (typeof module !== 'undefined') module.exports = logic;



    // addLikeToStory(email, productId, storyId) {
    //     return Promise.resolve().then(() =>
    
    //         this._callApiStory(`user/${email}/products/${productId}/stories/${storyId}/like`, 'POST',                 {
    //             {authorization: `bearer ${this._userToken()}`, 'content-type': 'application/json'
    //         }, 201)
    
    //             .then(() => true)
    //     )
    // },
    
    // router.post('/user/:email/products/:productId/stories/:storyId/like', [validateJwt,jsonBodyParser], (req, res) => {
    //     const { params: { email, productId, storyId } } = req