import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import icon_vote from '../images/icon_vote.svg'
import minicon_close from '../images/minicon_close.svg'
import minicon_edit from '../images/minicon_edit.svg'
import icon_profile from '../images/icon_profile.svg'

import '../css/App.css'

import logic from '../logic'
import StoriesList from './StoriesList';

class ProductDetail extends Component {
    state = {
        product: {},
        user: {},
        story: [],
        storyUser: {},
        likes: 0,
        totalLikes: 0
    }

    componentDidMount() {
        this.getProductWithStories()
    }

    getProductWithStories() {
        const { productId } = this.props.match.params

        logic.listAllStoriesByProductId(productId)
            .then(product => {
                this.setState({
                    product
                })
                this.setState({
                    user: product.user
                })
                this.setState({
                    story: product.story
                })
                this.setState({
                    storyUser: product.story.user
                })
                console.log(product.story)
            })
    }

    saveText = (event) => this.setState({ text: event.target.value })

    onLinkNewStory = e => {
        e.preventDefault()

        this.props.history.push('/product')
    }

    onLinkToRegister = e => {
        e.preventDefault()

        this.props.history.push('/register')
    }

    onSaveStory = (event) => {
        event.preventDefault()

        const { productId } = this.props.match.params
        const { text } = this.state

        logic.addStory(text, undefined, productId)
            .then(() => {
                this.getProductWithStories()
            })
            .catch(({ message }) => {
                //TODO: show error on panel...
                alert(message)
            })
    }

    onAddLikeToStory = (storyId) => {
        const { productId } = this.props.match.params
        const email = logic._userEmail()
        debugger
        return logic.AddLikeToStory(email, productId, storyId)
        .then(() =>  {
            debugger
            this.getProductWithStories()})

    }

    getGlobalVote(reviews) {
        return reviews && reviews.length ? reviews.reduce((accum, review) => accum + review.vote, 0) / reviews.length : 0
    }

    // getGlobalVote(reviews) {
    //     return reviews && reviews.length ? reviews.reduce((accum, review) => accum + review.vote, 0) / reviews.length : 0
    // }


        // sumAllLikes = () => {return this.state.story.like.reduce(add, 0)
        // return add(a, b){
        //     a + b
        // }

        // const posts = [
        //     {id: 1, upVotes: 2},
        //     {id: 2, upVotes: 89},
        //     {id: 3, upVotes: 1}
        //   ];
        //   const totalUpvotes = posts.reduce((totalUpvotes, currentPost) =>     
        //     totalUpvotes + currentPost.upVotes, // reducer function
        //     0 // initial accumulator value
        //   );
        //   // now totalUpvotes = 92






    render() {
        const { onLinkToRegister, onSaveStory, saveText, onAddLikeToStory } = this
        return (
            <div className="App">

                {/* <Menu /> */}

                <section>

                    <div className="container__list-products">
                        <div className="container__list__one-product">
                            <div className="figure__warp">
                                <div className="figure__warp__image">
                                    <div className="figure_image">
                                        <img src={this.state.product.photo} />
                                    </div>
                                </div>

                            </div>

                            <div className="section__object__article__text-block">

                            </div>

                            <div className="object__article__warp">
                                <div className="object__article__title-block">
                                    <h2>“{this.state.product.title}”</h2>
                                </div>
                                <div className="object__article__author-block ">
                                    <h3>- {this.state.user.name} {this.state.user.surname} -</h3>
                                </div>
                                <div className="counter_block">
                                    <span className="span__counters"> {this.state.story.length} {this.state.story.length > 1 ? 'stories' : 'story'} </span>
                                    <span className="span__counters"> {this.state.totalLikes}  </span>
                                    {/* {this.state.story.votes.length > 1 ? 'votes' : 'vote' } */}
                                    <br />
                                    <a href={this.state.product.link} target="_blank"> <span className="span__counters">reference link</span></a>
                                    {/* <span className="span__counters"> link to the original </span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section>
                    {
                        this.state.story.map(story => {
                            return (
                                <article>
                                    <div className="container__list-stories">
                                        <div className="container__list__story">
                                            <div className="container__list__story__block--auto">
                                                <div className="container__list__story--counter">
                                                    <div className="counter__warp">

                                                        <div className="section_instructions__icon__box">
                                                            {/* <a href="#/" ><img src={icon_vote} /></a> */}
                                                            {/* <a onClick={function () { onAddLikeToStory(story.id) }}><img src={icon_vote} /></a> */}

                                                            {logic.loggedIn() ? <a onClick={function () { onAddLikeToStory(story.id) }}><img src={icon_vote} /></a> : <img src={icon_vote} />}
                                                        </div>
                                                        <span className="span__counters"><h4> {story.like} votes</h4></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container__list__story__block--content">
                                                <div className="container__list__story__block--content__text">

                                                    <p>{story.text}
                                                    </p>

                                                </div>
                                                <div className="container__list__story__block--content__profile">
                                                    <div className="section_instructions__icon__box"><img src={icon_profile} />
                                                    </div>
                                                    <div className="container__list__story__block--content__profile__name-date">
                                                        <h5>{story.user.name} {story.user.surname}<br />
                                                            {new Date(story.date).toISOString().substring(10, 0).split("-").reverse().join('/')}</h5>
                                                    </div>
                                                    <div className="warp__edit__close">
                                                        <div className="section_instructions__icon--minibox">
                                                            {/* {logic.loggedIn() && <li><h5><Link to="/product">new story</Link></h5></li>} */}
                                                            {logic.loggedIn() && <Link to="/search"><img src={minicon_edit} /></Link>}

                                                            {/* && {story.user._id ==} */}

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
                </section>


                <section>
                    <div className="container__list-stories">
                        <div className="container__list__story">
                            <div className="container__list__story__block--auto">

                            </div>
                            <div className="container__list__story__block--content">
                                <div className="container__list__story__block--content__text">
                                    <form onSubmit={onSaveStory}>
                                        <textarea className="input--border, input--height--text" type="text" placeholder="text, maximum 1000 characters" name="text" onChange={saveText} />

                                        {/* {!logic.loggedIn() && <button type="submit">register</button>} */}
                                        {/* {logic.loggedIn() && <button type="submit">add new story</button>} */}

                                        {!logic.loggedIn() ? <button onClick={onLinkToRegister}> register </button> : ''}
                                        {logic.loggedIn() ? <button type="submit">add new story</button> : <button onClick={onLinkToRegister}> write new story </button>}

                                        {/* {!logic.loggedIn() && <button onClick={onLinkToRegister}> register </button>} */}
                                        {/* {!logic.loggedIn() && <button onClick={onLinkNewStory}> add new story </button>} */}

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* <Detail /> */}
                <StoriesList />

            </div >
        );
    }
}

export default ProductDetail;