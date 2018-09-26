import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import icon_vote from '../images/icon_vote.svg'
import minicon_close from '../images/minicon_close.svg'
import minicon_edit from '../images/minicon_edit.svg'
import icon_profile from '../images/icon_profile.svg'

import '../css/App.css'

import logic from '../logic'

class StoriesList extends Component {

    state = {
        stories: []
    }

    // componentDidMount() {
    //     logic.getProductWithStories()
    //         .then(({stories: stories}) => {
    //             this.setState({stories})
    //         })
    // }

    // componentDidMount(){
    //     logic.listAllProducts()
    //         .then(({ products: products }) => {
    //             this.setState({ products })            
    //         })
    // }


    //     Transform numeric data in a 11/11/2018 data  
    //     var myObj = $.parseJSON('{"date_created":"1273185387"}'),
    //     myDate = new Date(1000*myObj.date_created);
    // console.log(myDate.toLocaleString());


    render() {
        return (<div>{this.state.stories.length > 0 &&  this.state.stories.map(story => {
            return (
                <article>
                <div className="container__list-stories">
                    <div className="container__list__story">
                        <div className="container__list__story__block--auto">
                            <div className="container__list__story--counter">
                                <div className="counter__warp">

                                    <div className="section_instructions__icon__box">
                                        <Link to="/search"><img src={icon_vote} /></Link>
                                    </div>
                                    <span className="span__counters"><h4> {this.state.story.like} </h4></span>
                                </div>
                            </div>
                        </div>
                        <div className="container__list__story__block--content">
                            <div className="container__list__story__block--content__text">

                                <p>{this.state.product.story.text}
                                    </p>

                            </div>
                            <div className="container__list__story__block--content__profile">
                                <div className="section_instructions__icon__box"><img src={icon_profile} />
                                </div>
                                <div className="container__list__story__block--content__profile__name-date">
                                    {/* <h5>{this.state.story.user.name} {this.state.story.user.surname}<br />
                                        {this.state.story.date}</h5> */}
                                </div>
                                <div className="warp__edit__close">
                                    <div className="section_instructions__icon--minibox">
                                        {/* {logic.loggedIn() && <li><h5><Link to="/product">new story</Link></h5></li>} */}
                                        {logic.loggedIn() && <Link to="/search"><img src={minicon_edit} /></Link>}
                                    </div>
                                    <div className="section_instructions__icon--minibox">
                                        {logic.loggedIn() && <Link to="/search"><img src={minicon_close} /></Link>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </article>
            )
            })
            }
            </div>
        )
    }

}

export default StoriesList