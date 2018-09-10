const logic = {

    /**
     * SESSION STORAGE FOR THE USER ACCOUNT
     * 
     * @property {set} param sets the param on sessionStorage
     * @property {get} param gets the param from sessionStorage
     */

    set _userEmail(userEmail) {
        sessionStorage.setItem('userEmail', userEmail)
    },

    get userEmail() {
        return sessionStorage.getItem('userEmail')
    },

    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },

    get _userToken() {
        return sessionStorage.getItem('userToken')
    },

    set _userLikes(userLikes) {
        sessionStorage.setItem('userLikes', JSON.stringify(userLikes))
    },

    get _userLikes() {
        return JSON.parse(sessionStorage.getItem('userLikes')) || []
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
    _callApiStory(path, method = 'get', body, token) {

        const config = {
            method
        }
        const noGet = method !== 'get'
        if (noGet || token) {
            config.headers = {}
            if (noGet) config.headers['content-type'] = 'application/json'
            if (token) config.headers.authorization = 'Bearer ' + this._userToken
        }
        if (body) config.body = JSON.stringify(body)

        return fetch('http://localhost:8080/api' + path, config)
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
        return 
        
        this._callApiStory('register', 'post', { email, password })
            .then(res => res.data.id)
    },

    /**
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise} the email, token of the logged user and saves in sessionStorage
     */
    authenticate(email, password) {
        return this._callApiStory('/authenticate', 'post', { email, password })
            .then(({ data: { token } }) => {
                this._userEmail = email
                this._userToken = token
                return true
            })
    },

    /**
     * @param {string} password
     * @param {string} newPassword
     * 
     * @returns {Promise} the newPassword replaced the old one
     */
    updatePassword(email, password, newPassword) {
        const data = {
            email: this.userEmail,
            password
        }
        if (newPassword) data.newPassword = newPassword

        return this._callApiStory(`/user/${this._userEmail}`, 'put', data, true)
            .then(() => {
                if (newPassword) this._userPassword = newPassword
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
                sessionStorage.clear()
                return true
            })
    },

    /**
     * @returns {status} the email, token and id status to convert to null and to clear the sessionStorage
     */
    logout() {
        this._userEmail = null
        this._userToken = null
        sessionStorage.clear()
    },

    /**
     * @returns {status} the email, token status to know if the user is logged
     */
    get loggedIn() {
        return this.userEmail && this._userToken
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