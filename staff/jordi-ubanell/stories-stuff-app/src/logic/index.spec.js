'use strict'

require('dotenv').config()

const {
    expect
} = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

require('isomorphic-fetch')

const {
    env: {
        JWT_SECRET
    }
} = process

describe('Logic', () => {

    describe("Register, Authenticate, Update, Unregister and Logout of the users account", () => {

        describe("register of the user", () => {

            const email = `persona-${Math.random()}@mail.com`,
                password = "12345678"

            it("should register the mail and password of the user correctly", () => {
                return logic.register(email, password)
                    .then(res => {
                        expect(res).to.be.true
                    })
            })
        })

        false && describe("authenticate of the user", () => {

            const email = `persona-${Math.random()}@mail.com`,
                password = "12345678"

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
                        const {
                            sub
                        } = jwt.verify(logic._userToken(), JWT_SECRET)
                        expect(sub).to.equal(email)
                    })
            })
        })

        false && describe("update the password of the user", () => {

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
                        const {
                            sub
                        } = jwt.verify(logic._userToken(), JWT_SECRET)
                        expect(sub).to.equal(email)
                    })
            })
        })

        false && describe("delete the users account, unregister", () => {

            const email = `persona-${Math.random()}@mail.com`,
                password = "12345678"

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

            const email = `persona-${Math.random()}@mail.com`,
                password = "12345678"

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

    describe('Product', () => {
        let email
        const password = "12345678"

        const title = 'my post about Lambretta',
            photo = "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg",
            link = "https://es.wallapop.com/item/lambretta-229672803"

        beforeEach(() => {
            email = `persona-${Math.random()}@mail.com`
            return logic.register(email, password)
                .then(() => logic.authenticate(email, password))
        })

        it('should create a product correctly', () => {
            return logic.addProduct(title, photo, link)
                .then(res => {
                    expect(res).to.exist
                    expect(res.message).to.equal('product added correctly')
                    expect(res.id.length).to.equal(24)
                })
        })
    })

    describe('Story', () => {
        let email
        const password = "12345678"
        let id

        const title = 'my post about Lambretta',
            photo = "https://assets.catawiki.nl/assets/2017/1/23/e/e/8/ee8f1666-e145-11e6-9f7b-06c7bf37e663.jpg",
            link = "https://es.wallapop.com/item/lambretta-229672803",
            text = 'hola que tal pim pam lldskjf skdjf sldkfj d',
            like = 0
        
        beforeEach(() => {
            email = `persona-${Math.random()}@mail.com`
            return logic.register(email, password)
                .then(() => logic.authenticate(email, password))
        })

        it('should create a product correctly', () => {
            return logic.addProduct(title, photo, link)
                .then(res => {
                    id = res.id
                    expect(res).to.exist
                    expect(res.message).to.equal('product added correctly')
                    expect(res.id.length).to.equal(24)
                })
        })

        it('should create a story correctly', () => {
            return logic.addStory(text, like, id)
            .then(storyId => {
                expect(storyId).to.be.a('string')
            })
        }) 
    })

})