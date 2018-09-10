const logic = {
     
    /**
     * TODO!!!!!
     * 
     * @param {*} userEmail 
     */
    _userEmail(userEmail) {
        if(userEmail !== undefined) {
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
        if(userToken !== undefined) {
            this.userToken = userToken
            return
        }

        return this.userToken
    },

    /**
     * TODO!!!!!
     * 
     * @param {*} userLikes 
     */
    _userLikes(userLikes) {
        if(userLikes !== undefined) {
            this.userLikes = userLikes
            return
        }

        return this.userLikes
    },

    // set _userEmail(userEmail) {
    //     this.userEmail = userEmail
    //     // sessionStorage.setItem('userEmail', userEmail)
    // },

    // get userEmail() {
    //     return this.userEmail
    //     // return sessionStorage.getItem('userEmail')
    // },

    // set _userToken(userToken) {
    //     sessionStorage.setItem('userToken', userToken)
    // },

    // get _userToken() {
    //     return sessionStorage.getItem('userToken')
    // },

    // set _userLikes(userLikes) {
    //     sessionStorage.setItem('userLikes', JSON.stringify(userLikes))
    // },

    // get _userLikes() {
    //     return JSON.parse(sessionStorage.getItem('userLikes')) || []
    // },

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
    _callApiStory(path, method = 'get', body, token) {

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

        return fetch('http://localhost:8080/api/' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })
    },

    /**
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise} the id of the registered user
     */
    register(email, password) {
        return this._callApiStory('register', 'post', { email, password })
            .then(() => {
                return true
            })
    },

    /**
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise} the email, token of the logged user and saves in sessionStorage
     */
    authenticate(email, password) {
        return this._callApiStory('/authenticate', 'post', { email, password })
            .then(({ token }) => {
                this._userEmail(email)
                this._userToken(token)

                return true
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
        return this._callApiStory(`/unregister`, { email: this.userEmail, password }, true)
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
    get loggedIn() {
        return this._userEmail() && this._userToken()
    },

    /**
     * @param {string} query
     * 
     * @returns {Promise} an ingredients list using a query
     */
    searchWord(query) {
        return this._callApiStory('user/search/instant?query=' + query)
            .then((res) => res)
    }

}

if (typeof module !== 'undefined') module.exports = logic;