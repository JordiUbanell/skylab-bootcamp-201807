import React, { Component } from 'react'
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom'
import icon_object from '../images/icon_object.svg'
import icon_story from '../images/icon_story.svg'
import icon_vote from '../images/icon_vote.svg'

import '../css/App.css'
import logic from './../logic'

class Instructions extends Component {

    onLinkToRegister = e => {
        e.preventDefault()

        this.props.history.push('/register')
    }

    onLinkNewStory = e => {
        e.preventDefault()

        this.props.history.push('/product')
    }

    render() {

        const { onLinkNewStory, onLinkToRegister } = this


        return (<main>
            {/* <div className="section__instructions__form-half">
                        <div className="section__instructions__text">
                            <h1>About</h1>
                            <p>We live surrounded by objects, some are fixed in our memory with an emotional bond for our experiences, pleasure or desire.
                                <br />
                                <br />
                                On this site you can share your stories about certain vintage objects and create a community around this iconic objects.</p>
                        </div>
                    </div> */}
            <section>
                <div className="section__instructions">
                    <div className="container__instructions">
                        <div className="section__instructions-block--flex">
                            <div className="section__instructions-block">
                                <div className="section__instructions__text">
                                    <h4>
                                        Stories and Stuff is a site that collects stories about mythical vintage objects and brands. Share your stories.
                            </h4>
                                </div>
                                <div className="section__instructions__icon ">
                                    <br />

                                    {/* <button type="submit">register</button> */}
                                    {!logic.loggedIn() && <button onClick={this.onLinkToRegister}> register </button>}

                                </div>
                            </div>
                            <div className="section__instructions-block ">
                                <div className="section__instructions__icon ">
                                    <div className="section_instructions__icon__box">
                                        <img src={icon_object} />
                                    </div>
                                </div>
                                <div className="section__instructions__text ">
                                    <h5 className="center__text">
                                        <span className="span__instructions">How it works: </span><br />
                                        anyone can upload an image of a product and tell a story
                            </h5>
                                </div>
                            </div>

                            <div className="section__instructions-block ">
                                <div className="section__instructions__icon ">
                                    <div className="section_instructions__icon__box">
                                        <img src={icon_story} />
                                    </div>
                                </div>
                                <div className="section__instructions__text ">
                                    <h5 className="center__text">
                                        Anyone can add another story about that object
                            </h5>
                                </div>
                            </div>

                            <div className="section__instructions-block ">
                                <div className="section__instructions__icon ">
                                    <div className="section_instructions__icon__box">
                                        <img src={icon_vote} />
                                    </div>
                                </div>
                                <div className="section__instructions__text ">
                                    <h5 className="center__text"> You vote in favor of the best stories and they go up to the top</h5>
                                </div>
                                <div className="section__instructions__text, center__div ">

                                    {/* <button onClick={this.onLinkNewStory}> write new story </button> */}


                                    {logic.loggedIn() ? <button onClick={this.onLinkNewStory}> write new story </button> : <button onClick={this.onLinkToRegister}> write new story </button>}

                                    {/* <Link to="/product">new story</Link> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>

        )
    }
}

export default withRouter(Instructions)