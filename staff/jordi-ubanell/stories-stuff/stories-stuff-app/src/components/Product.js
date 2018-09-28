import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'

class Product extends Component {
    state = {
        title: '',
        link: '',
        photo: '',
        text: '',
        productId: '',
        base64: null,
        message: ''
    }

    saveTitle = (event) => this.setState({ title: event.target.value })
    saveLink = (event) => this.setState({ link: event.target.value })
    savePhoto = (event) => this.setState({ photo: event.target.value })
    saveText = (event) => this.setState({ text: event.target.value })

    onSaveProduct = (event) => {
        event.preventDefault()

        const { title, link, photo, text } = this.state
        logic.addProduct(title, photo, link)
            .then(product => {
                return logic.addStory(text, undefined, product.id)
                    .then(() => this.props.history.push(`/post/${product.id}`))
            })
            .catch(({message}) => this.setState({message}))
        
    }

    render() {
        const { onSaveProduct, savePhoto, saveLink, saveTitle, saveText } = this

        return (<main>
            <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <nav>
                            <h1>Write new story</h1>

                            <form onSubmit={onSaveProduct}>
                                <textarea className="input--border, input--height" type="text" placeholder="title, maximum 100 characters (required)" name="title" onChange={saveTitle} />
                                <textarea className="input--border, input--height" type="text" placeholder="object link (required)" name="link" onChange={saveLink} />
                                <textarea className="input--border, input--height" type="text" placeholder="photo link (required)" name="photo" onChange={savePhoto} />
                                {/* <button >upload photo</button> */}
                                <textarea className="input--border, input--height--text" type="text" placeholder="text, maximum 1000 characters (required)" name="text" onChange={saveText} />
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

export default withRouter (Product)