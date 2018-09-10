import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

// import { logic } from '../logic'
import '../css/App.css'

class Login extends Component {

    state = {
        email: null,
        password: null
    }

    saveEmail = (event) => this.setState({ email: event.target.value })

    savePassword = (event) => this.setState({ password: event.target.value })

    login = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onLogin(email, password)
    }

    linkToRegister = (event) => {
        event.preventDefault()
        this.props.linkToRegister()
    }

    render() {
        const { login, saveUsername, savePassword, linkToRegister } = this

        return (<main>
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Login</h1>
                            <form onSubmit={login}>
                                <input className="input--border" type="text" placeholder="email" onChange={saveUsername}></input>
                                <input className="input--border" type="password" placeholder="password" onChange={savePassword}></input>
                                <button type="submit">login</button>
                                <h5>Go to <a href="/#" onClick={linkToRegister}>register</a></h5>
                            </form>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}






export default Login