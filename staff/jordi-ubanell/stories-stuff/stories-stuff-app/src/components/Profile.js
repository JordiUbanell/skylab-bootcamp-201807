import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'
import Menu from './Menu'

const defaultState = {
        name: undefined,
        surname: undefined,
        password: undefined,
        newPassword: undefined,
        newName: undefined,
        newSurname: undefined,
        message: undefined
}

class Profile extends Component {

    state = defaultState

    componentDidMount(){

       logic._retrieveUser()
        .then(user => {
            this.setState({name:user.name,surname:user.surname})
        })
    }

    savePassword = (event) => this.setState({ password: event.target.value })

    saveUserName = (event) => this.setState({ name: event.target.value })

    saveUserSurname = (event) => this.setState({ surname: event.target.value })

    saveUserNewPassword = (event) => this.setState({ newPassword: event.target.value })

    saveUserNewSurname = (event) => this.setState({ newSurname: event.target.value })

    saveUserNewName = (event) => this.setState({ newName: event.target.value })

    save = (event) => {
        event.preventDefault()
        const { password,newName,newSurname,newPassword } = this.state
        return logic.updateProfile(password,newName,newSurname,newPassword)
        .then(() => logic._retrieveUser()
            .then(user => {
                this.setState({...defaultState,name:user.name,surname:user.surname})                
            }))
            .catch(({message}) => this.setState({message}))

    }


    linkToUploadPhoto = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {
        const { save, savePassword, saveUserName,saveUserNewPassword,saveUserNewName,saveUserNewSurname, saveUserSurname, linkToUploadPhoto } = this

        return (<main>
            {/* <Menu /> */}
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Profile</h1>
                            <form onSubmit={save}>
                                {/* {this.state._userEmail}email @ */}
                                <h5><br/>{this.state.name}
                                 <br/>{this.state.surname}</h5>
                                <input className="input--border" type="text" placeholder="new name" value={this.state.newName || ""} onChange={saveUserNewName}></input>
                                <input className="input--border" type="text" placeholder="new surname" value={this.state.newSurname || ""} onChange={saveUserNewSurname}></input>
                                <input className="input--border" type="password" placeholder="password (required)" value={this.state.password || ""} onChange={savePassword}></input>
                                <input className="input--border" type="password" placeholder="new password" value={this.state.newPassword || ""} onChange={saveUserNewPassword}></input>
                                <button type="submit">save</button>
                            </form>

                            <h4 className='color__red'>{this.state.message && this.state.message}</h4>

                        </nav>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default withRouter(Profile)


{/* <h5>Upload <a href="/#" onClick={linkToUploadPhoto}>profile photo</a></h5> <button type="submit">upload photo</button> */}