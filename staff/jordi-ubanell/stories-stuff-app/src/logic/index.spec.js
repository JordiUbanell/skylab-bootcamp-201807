'use strict'

const {expect} = require('chai')
const {logic, LogicError} = require('.')
const jwt = require('jsonwebtoken')

describe("Register, Authenticate, Update, Unregister and Logout of the users account", () => {

    describe("register of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "123"
        
        it("should register the mail and password of the user correctly", () => {

            logic.register(email, password)
                .then(res => {
                    expect(res).to.be.true()

                })
        })
    })

    describe("authenticate of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "123"
        let userId

        beforeEach(() => {
            return logic.register(email, password)
                .then(id => userId = id)
        })

        it("should login correctly", () => {

            return logic.login(email, password)
                .then((result) => {
                    expect(result).toBeTruthy()
                    expect(logic.userEmail).toBeDefined()
                    expect(logic.userEmail).toBe(email)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(password)
                    expect(logic._userToken).toBeDefined()
                })
        })
    })

    describe("update the password of the user", () => {

        let email
        const password = "123"

        beforeEach(() => {
            email = `persona-${Math.random()}@mail.com`
            return logic.register(email, password)
                .then(() => logic.login(email, password))
        })

        it('should update password correctly', () => {

            const newPassword = password + '-' + Math.random()

            return logic.update(password, undefined, newPassword)
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(newPassword).toBeDefined()
                    expect(logic._userPassword).toBe(newPassword)
                    return logic.login(email, newPassword)
                })
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic.userEmail).toBeDefined()
                    expect(logic.userEmail).toBe(email)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(newPassword)
                    expect(logic._userToken).toBeDefined()
                })
        })
    })

    describe("delete the users account, unregister", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "123"

        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.login(email, password))
        })

        it("should delete the users account correctly", () => {

            return logic.delete(password)
                .then((result) => {
                    expect(result).toBeTruthy()
                    expect(logic.userEmail).toBeNull()
                    expect(logic._userPassword).toBeNull()
                    expect(logic._userToken).toBeNull()
                })
        })
    })

    describe("logout of the user", () => {

        const email = `persona-${Math.random()}@mail.com`, password = "123"

        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.login(email, password))
        })
        it("should logout the user correctly", () => {

            expect(logic.userEmail).toBeDefined()
            expect(logic._userPassword).toBeDefined()
            expect(logic._userToken).toBeDefined()

            logic.logout()

            expect(logic.userEmail).toBeNull()
            expect(logic._userPassword).toBeNull()
            expect(logic._userToken).toBeNull()
        })
    })
})
