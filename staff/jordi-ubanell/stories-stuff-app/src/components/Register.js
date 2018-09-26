import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'
import Menu from './Menu'

class Register extends Component {

    state = {
        email: null,
        password: null,
        name: null, 
        surname: null
    }

    saveEmail = (event) => this.setState({ email: event.target.value })
    saveName = (event) => this.setState({ name: event.target.value })
    saveSurname = (event) => this.setState({ surname: event.target.value })
    savePassword = (event) => this.setState({ password: event.target.value })

    onSubmitRegister = e => {
        e.preventDefault()

        const { email, password, name, surname } = this.state

        logic.register(email, password, name, surname)
            .then(message => {
                // alert(message)
                alert("Correctly registered! Now login to enter at the application");

                this.props.history.push('/login')
            })
            .catch(({ message }) => {
                // TODO: mostrar un panel de error o un toast
                alert(message)
            })
    }

    render() {
        const { onSubmitRegister, saveEmail, saveName, saveSurname, savePassword } = this

        return (<main>
            {/* <Menu /> */}
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Register</h1>
                            <form onSubmit={onSubmitRegister}>
                                <input className="input--border" type="text" placeholder="email (private)" onChange={saveEmail}></input>
                                <input className="input--border" type="text" placeholder="name" onChange={saveName}></input>
                                <input className="input--border" type="text" placeholder="surname" onChange={saveSurname}></input>
                                <input className="input--border" type="password" placeholder="password" onChange={savePassword}></input>
                                <button type="submit">register</button>
                                <h5>Go to <Link to="/login" >login</Link></h5>
                            </form>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default withRouter(Register)