import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

// import { logic } from '../logic'
import '../css/App.css'

class Register extends Component {

    state = {
        email: null,
        password: null
    }

    saveEmail = (event) => this.setState({ email: event.target.value })

    savePassword = (event) => this.setState({ password: event.target.value })

    login = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onRegister(email, password)
    }

    linkToLogin = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {
        const { login, saveUsername, savePassword, linkToLogin } = this

        return (<main>
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Register</h1>
                            <form onSubmit={login}>
                                <input className="input--border" type="text" placeholder="email" onChange={saveUsername}></input>
                                <input className="input--border" type="password" placeholder="password" onChange={savePassword}></input>
                                <button type="submit">register</button>
                                <h5>Go to <a href="/#" onClick={linkToLogin}>login</a></h5>
                            </form>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default Register