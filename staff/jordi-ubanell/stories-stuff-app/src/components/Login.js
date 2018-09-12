import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'
import Menu from './Menu'

class Login extends Component {

    state = {
        email: null,
        password: null
    }

    saveEmail = (event) => this.setState({ email: event.target.value })

    savePassword = (event) => this.setState({ password: event.target.value })

    onSubmitLogin = e => {
        e.preventDefault()

        const { email, password } = this.state

        logic.authenticate(email, password)
            .then(() => {
                this.props.history.push('/')
            })
            .catch(({ message }) => {
                // TODO: mostrar un panel de error o un toast
                alert(message)
            })
    }

    render() {
        const { onSubmitLogin, saveEmail, savePassword } = this

        return (<main>
            {/* <Menu /> */}

            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Login</h1>
                            <form onSubmit={onSubmitLogin}>
                                <input className="input--border" type="text" placeholder="email" onChange={saveEmail}></input>
                                <input className="input--border" type="password" placeholder="password" onChange={savePassword}></input>
                                <button type="submit">login</button>
                                <h5>Go to <Link to="/register">register</Link></h5>
                            </form>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}


export default withRouter(Login)