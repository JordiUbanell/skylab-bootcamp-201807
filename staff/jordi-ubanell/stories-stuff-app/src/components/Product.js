import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

// import { logic } from '../logic'
import '../css/App.css'

class Product extends Component {

    state = {

        title: null,
        text: null
    }


    saveUserName = (event) => this.setState({ name: event.target.value })

    saveUserSurname = (event) => this.setState({ surname: event.target.value })

    save = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onUpdateProduct(email, password)
    }

    linkToUploadPhoto = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {
        const { save, saveUserName, saveUserSurname, linkToUploadPhoto } = this

        return (<main>
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Product</h1>
                            <form onSubmit={save}>
                                <input className="input--border, input--height" type="text" placeholder="title (max 90 char)" onChange={saveUserName}></input>
                                <input className="input--border, input--height--text" type="text" placeholder="text (max 1000 char)" onChange={saveUserSurname}></input>
                                <h5>Upload <a href="/#" onClick={linkToUploadPhoto}>object photo</a></h5>
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

export default Product