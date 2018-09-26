import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'

class Product extends Component {
    state = {
        title: '',
        link: '',
        photo: '',
        text: '',
        productId: ''
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
                debugger
                return logic.addStory(text, undefined, product.id)
            })
            // .then(productId => {
            //     this.setState({productId: productId})
            // })
            .then(product => {
                //TODO: Redirecto user to the product/productId "page"
                return <Redirect to = {`/post/${product.id}`} />
            })
            .catch(({ message }) => {
                //TODO: show error on panel...
                alert(message)
            })
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
                                <textarea className="input--border, input--height" type="text" placeholder="title, maximum 100 characters" name="title" onChange={saveTitle} />
                                <textarea className="input--border, input--height" type="text" placeholder="object link" name="link" onChange={saveLink} />
                                <textarea className="input--border, input--height" type="text" placeholder="photo link" name="photo" onChange={savePhoto} />
                                <textarea className="input--border, input--height--text" type="text" placeholder="text, maximum 1000 characters" name="text" onChange={saveText} />
                                <button type="submit">save</button>
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