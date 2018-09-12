import React, { Component } from 'react'
import icon_object from '../images/icon_object.svg'
import icon_story from '../images/icon_story.svg'
import icon_vote from '../images/icon_vote.svg'
import { withRouter, Link } from 'react-router-dom'

import '../css/App.css'

class List extends Component {

    render() {

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

                <div className="container__list-products">
                    <div className="container__list__one-product">
                        <div className="figure__warp">
                            <div className="figure__warp__image">
                                <div className="figure_image">
                                    <Link to="post"><img src="https://i.pinimg.com/564x/37/50/1d/37501d0474d0b31e6fab5d6f08806497.jpg" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="section__object__article__text-block">
                        </div>
                        <div className="object__article__warp">
                            <div className="object__article__title-block">
                                <Link to="post">
                                    <h2 className="center__text">“The legendary SEGA Moto Champ just arround the corner”</h2>
                                </Link>
                            </div>
                            <div className="object__article__author-block ">
                                <h3>- John Doe -</h3>
                            </div>
                            <div className="counter_block">
                                <span className="span__counters"> 3 stories </span>
                                <span className="span__counters"> 17 votes </span>
                            </div>
                        </div>
                    </div>


                    <div className="container__list__one-product">
                        <div className="object__article__warp">
                            <div className="object__article__title-block">
                                <h2>“Wooden Coca-Cola boxes painted in yellow, from my childhood”</h2>
                            </div>
                            <div className="object__article__author-block ">
                                <h3>- Quim Monzó -</h3>
                            </div>
                            <div className="counter_block">
                                <span className="span__counters"> 3 stories </span>
                                <span className="span__counters"> 17 votes </span>
                            </div>
                        </div>
                        <div className="figure__warp">
                            <div className="figure__warp__image">
                                <div className="figure_image">
                                    <img src="https://cdn.wallapop.com/images/10420/40/27/__/c10420p241967682/i553237751.jpg?pictureSize=W1024" />

                                </div>
                            </div>

                        </div>

                        <div className="section__object__article__text-block">

                        </div>
                    </div>


                    <div className="container__list__one-product">
                        <div className="figure__warp">
                            <div className="figure__warp__image">
                                <div className="figure_image">
                                    <img src="http://www.designbrasil.org.br/wp-content/uploads/2013/12/343972-400x600-1.jpeg" />
                                </div>
                            </div>
                        </div>

                        <div className="section__object__article__text-block">
                        </div>
                        {/* <img src="https://cdn.wallapop.com/images/10420/40/27/__/c10420p241967682/i553239598.jpg?pictureSize=W640" />
                    <img src="https://cdn.wallapop.com/images/10420/3s/wn/__/c10420p229951185/i519021169.jpg?pictureSize=W640" />
                    <img src="https://museum-gestaltung.ch/wp-content/uploads/2018/01/02_collection_highlights_quer_2-1280x655.jpg" /> 
                             <img src="https://i.pinimg.com/564x/b8/1a/21/b81a21bb49bc3bad45a94e19fb879f75.jpg" />*/}

                        <div className="object__article__warp">
                            <div className="object__article__title-block">
                                <h2>“Hours of fun around the classic danish bar furniture of the 70s”</h2>
                            </div>
                            <div className="object__article__author-block ">
                                <h3>- John Doe -</h3>
                            </div>
                            <div className="counter_block">
                                <span className="span__counters"> 443 stories </span>
                                <span className="span__counters"> 17 votes </span>
                            </div>
                        </div>
                    </div>



                </div>

            </section>
        </main>

        )
    }
}

export default withRouter(List)