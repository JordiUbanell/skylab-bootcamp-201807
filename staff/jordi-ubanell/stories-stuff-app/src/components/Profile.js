import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

// import { logic } from '../logic'
import '../css/App.css'
import Menu from './Menu'

class Profile extends Component {

    state = {
        email: null,
        password: null,
        name: null,
        surname: null
    }

    savePassword = (event) => this.setState({ password: event.target.value })

    saveUserName = (event) => this.setState({ name: event.target.value })

    saveUserSurname = (event) => this.setState({ surname: event.target.value })

    save = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onUpdateProfile(email, password)
    }

    linkToUploadPhoto = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {
        const { save, savePassword, saveUserName, saveUserSurname, linkToUploadPhoto } = this

        return (<main>
            {/* <Menu /> */}
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Profile</h1>
                            <form onSubmit={save}>
                                <h5>persona@email.com</h5>
                                <input className="input--border" type="text" placeholder="name" onChange={saveUserName}></input>
                                <input className="input--border" type="text" placeholder="surname" onChange={saveUserSurname}></input>
                                <h5>Upload <a href="/#" onClick={linkToUploadPhoto}>profile photo</a></h5>
                                <button type="submit">upload photo</button>
                                <button type="submit">SAVE</button>
                            </form>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default Profile