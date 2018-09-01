'use strict'

module.exports = id((email) => {
    return Promise.resolve()
        .then(() => {
            this._validateEmail(email)

            return User.findOne({
                email
            })

        })
        .then(user => {
            if (!user) throw new LogicError(`user with ${email} email does not exist`)

            const product = {
                user: user.id
            }
            
            return Product.create(user.id)
        })
})