'use strict'

require('dotenv').config()

const {expect} = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

require('isomorphic-fetch')

const { env: { JWT_SECRET } } = process

describe("Register, Authenticate, Update, Unregister and Logout of the users account", () => {

    describe("register of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "12345678"
        
        it("should register the mail and password of the user correctly", () => {
            return logic.register(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    describe("authenticate of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "12345678"

        beforeEach(() => {
            return logic.register(email, password)
        })

        it("should login correctly", () => {

            return logic.authenticate(email, password)
                .then((result) => {
                    expect(result).to.true.true

                    expect(logic._userEmail()).to.exist
                    expect(logic._userEmail()).to.equal(email)

                    expect(logic._userToken()).to.exist
                    
                    // Check if token is valid
                    const { sub } = jwt.verify(logic._userToken(), JWT_SECRET)
                    expect(sub).to.equal(email)
                })
        })
    })

    describe("update the password of the user", () => {

        let email
        const password = "12345678"

        beforeEach(() => {
            email = `persona-${Math.random()}@mail.com`
            return logic.register(email, password)
                .then(() => logic.authenticate(email, password))
        })

        it('should update password correctly', () => {

            const newPassword = password + '-' + Math.random()

            return logic.updatePassword(password, newPassword)
                .then(res => {
                    expect(res).to.be.true
                    
                    return logic.authenticate(email, newPassword)
                })
                .then(result => {
                    expect(result).to.true.true

                    expect(logic._userEmail()).to.exist
                    expect(logic._userEmail()).to.equal(email)

                    expect(logic._userToken()).to.exist
                    
                    // Check if token is valid
                    const { sub } = jwt.verify(logic._userToken(), JWT_SECRET)
                    expect(sub).to.equal(email)
                })
        })
    })

    false && describe("delete the users account, unregister", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "12345678"

        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.authenticate(email, password))
        })

        it("should delete the users account correctly", () => {

            return logic.deleteUser(password)
                .then((result) => {
                    expect(result).to.be.true

                    debugger
                    expect(logic._userEmail()).to.be.null
                    expect(logic._userToken()).to.be.null
                })
        })
    })

    describe("logout of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "12345678"

        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.authenticate(email, password))
        })
        it("should logout the user correctly", () => {

            expect(logic._userEmail()).to.exist
            expect(logic._userToken()).to.exist

            logic.logout()

            expect(logic._userEmail()).to.be.null
            expect(logic._userToken()).to.be.null
        })
    })
})
