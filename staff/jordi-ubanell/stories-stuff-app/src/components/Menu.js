import React, { Component } from 'react'
import minicon_search from '../images/minicon_search.svg'
import icon_profile from '../images/icon_profile.svg'

import '../css/App.css'

class Menu extends Component {

    linkToRegister = (event) => {
        event.preventDefault()
        this.props.linkToRegister()
    }

    linkToLogin = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    linkToObjects = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {
        const { linkToObjects, linkToAbout, linkToLogin, linkToRegister } = this
        return (<main>
            {/* <div className="section__instructions">
                <div className="section__instructions__form">
                    <div className="section__instructions__form-half">
                        <div className="section__instructions__text">
                            <h1>About</h1>
                            <p>We live surrounded by objects, some are fixed in our memory with an emotional bond for our experiences, pleasure or desire.
                                <br />
                                <br />
                                On this site you can share your stories about certain vintage objects and create a community around this iconic objects.</p>
                        </div>
                    </div>
                </div>
            </div> */}

            <header>
                <div className="container">
                    <nav>
                        <div className="nav__block__logo">
                            <h2>
                                Story <br />
                                & Stuff
                        </h2>
                        </div>
                        <div className="nav__block__warp">
                            <div className="nav__block__warp__search">
                                <img src={minicon_search} width="30em" />
                            </div>
                            <div className="nav__block__warp__menu">
                                <ul>
                                    <li><h5><a href="/#" onClick={linkToObjects}>stories</a></h5></li>
                                    <li><h5><a href="/#" onClick={linkToAbout}>about</a></h5></li>
                                    <li><h5><a href="/#" onClick={linkToLogin}>login</a></h5></li>
                                    <li><h5><a href="/#" onClick={linkToRegister}>register</a></h5></li>
                                </ul>
                            </div>

                            <div className="nav__block__warp__profile">
                                <img src={icon_profile} width="50em" />

                                <div className="nav__block__warp__profile__text">
                                    <h5><a href="/#" onClick={linkToRegister}>logout</a></h5>
                                </div>
                            </div>



                        </div>
                    </nav>
                </div>
            </header>
        </main >

        )
    }
}

export default Menu