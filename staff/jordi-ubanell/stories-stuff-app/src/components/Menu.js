import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import logic from './../logic'

import minicon_search from '../images/minicon_search.svg'
import icon_profile from '../images/icon_profile.svg'

import '../css/App.css'

class Menu extends Component {

    onLogout = e => {
        e.preventDefault()

        logic.logout()
        this.props.history.push('/')
    }

    render() {
        const { onLogout } = this

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
                        <Link to="/">
                            <div className="nav__block__logo">
                                <h2>
                                    Stories <br />
                                    & Stuff
                        </h2>
                            </div>
                        </Link>
                        <div className="nav__block__warp">
                            <div className="nav__block__warp__search">
                                <div className="section_instructions__icon--minibox">
                                    <Link to="/search"><img src={minicon_search} /></Link>
                                </div>
                            </div>


                            <div className="nav__block__warp__menu">
                                <ul>
                                    <li><h5><Link to="/">stories</Link></h5></li>
                                    <li><h5><Link to="/about">about</Link></h5></li>

                                    {!logic.loggedIn() && <li><h5><Link to="/login">login</Link></h5></li>}
                                    {!logic.loggedIn() && <li><h5><Link to="/register">register</Link></h5></li>}
                                    {logic.loggedIn() && <li><h5><Link to="/product">new story</Link></h5></li>}
                                </ul>
                            </div>

                            {logic.loggedIn() && <div className="nav__block__warp__profile"><div className="section_instructions__icon__box"><Link to="/profile"><img src={icon_profile} /> </Link></div>


                                <div className="nav__block__warp__profile__text">
                                    <h5><a href="#" onClick={onLogout}>logout </a></h5>
                                </div>
                            </div>

                            }

                        </div>
                    </nav>
                </div>
            </header>
        </main >

        )
    }
}

export default withRouter(Menu)