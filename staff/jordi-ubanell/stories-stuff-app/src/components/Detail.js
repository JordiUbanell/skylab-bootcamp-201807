import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import minicon_close from '../images/minicon_close.svg'
import minicon_edit from '../images/minicon_edit.svg'
import icon_profile from '../images/icon_profile.svg'

import icon_vote from '../images/icon_vote.svg'

import logic from '../logic'
import '../css/App.css'

class Detail extends Component {

    state = {
        text: '',
        like: 0,
        productId: ''
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

        const { text, like, productId } = this.state

        logic.addStory(text, like, productId)
            .then(product => {
                return logic.addStory(text, undefined, product.id)
            })
            .then(res => {
                alert(res)
            })
            .catch(({ message }) => {
                //TODO: show error on panel...
                alert(message)
            })
    }

    render() {
        const { onSaveStory, saveText } = this
        return (
            <div className="App">

                {/* <Menu /> */}

                <section>

                    <div className="container__list-products">
                        <div className="container__list__one-product">
                            <div className="figure__warp">
                                <div className="figure__warp__image">
                                    <div className="figure_image">
                                        <img src="https://i.pinimg.com/564x/37/50/1d/37501d0474d0b31e6fab5d6f08806497.jpg" />
                                    </div>
                                </div>

                            </div>

                            <div className="section__object__article__text-block">

                            </div>

                            <div className="object__article__warp">
                                <div className="object__article__title-block">
                                    <h2>“The legendary SEGA Moto Champ just arround the corner”</h2>
                                </div>
                                <div className="object__article__author-block ">
                                    <h3>- John Doe -</h3>
                                </div>
                                <div className="counter_block">
                                    <span className="span__counters"> 3 stories </span>
                                    <span className="span__counters"> 17 votes </span>
                                    <br />
                                    <span className="span__counters"> link to the original </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container__list-stories">
                        <div className="container__list__story">
                            <div className="container__list__story__block--auto">
                                <div className="container__list__story--counter">
                                    <div className="counter__warp">

                                        <div className="section_instructions__icon__box">
                                            <Link to="/search"><img src={icon_vote} /></Link>
                                        </div>
                                        <span className="span__counters"><h4> 17 </h4></span>
                                    </div>
                                </div>
                            </div>
                            <div className="container__list__story__block--content">
                                <div className="container__list__story__block--content__text">

                                    <p>Mi padre era peón del ramo del agua. Del textil, como dicen ahora y mi madre era modista, cosía para las casas de las señoras ricas. Me acuerdo que en verano me tocaba acompañarlos y entonces me ponían una pila de revistas en frente, en alguna habitación de la casa e iba leyendo revista tras revista y me pasaba las cuatro o cinco horas que mi madre se estaba. De vez en cuando la señora decía "quieres una Coca-Cola", no señora. Mi madre me había dicho "siempre que te digas si quieres una cocacola di que no”. Yo veía como entraban las cajas de Coca-Cola y yo no las había visto ni en pintura las cocacolas y me me moría de ganas de probarla. La cajas eran de madera pintada de amarillo, preciosas, si tuviera una, ahora, daría lo que fuera por tener una.
                                    </p>

                                </div>
                                <div className="container__list__story__block--content__profile">
                                    <div className="section_instructions__icon__box"><img src={icon_profile} />
                                    </div>
                                    <div className="container__list__story__block--content__profile__name-date">
                                        <h5>John Doe<br />
                                            23/8/2018</h5>
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
                </section>

                <section>
                    <div className="container__list-stories">
                        <div className="container__list__story">
                            <div className="container__list__story__block--auto">
                                <div className="container__list__story--counter">
                                    <div className="counter__warp">

                                        <div className="section_instructions__icon__box">
                                            <Link to="/search"><img src={icon_vote} /></Link>
                                        </div>
                                        <span className="span__counters"><h4> 17 </h4></span>
                                    </div>
                                </div>
                            </div>
                            <div className="container__list__story__block--content">
                                <div className="container__list__story__block--content__text">

                                    <p>Mi padre era peón del ramo del agua. Del textil, como dicen ahora y mi madre era modista, cosía para las casas de las señoras ricas. Me acuerdo que en verano me tocaba acompañarlos y entonces me ponían una pila de revistas en frente, en alguna habitación de la casa e iba leyendo revista tras revista y me pasaba las cuatro o cinco horas que mi madre se estaba. De vez en cuando la señora decía "quieres una Coca-Cola", no señora. Mi madre me había dicho "siempre que te digas si quieres una cocacola di que no”. Yo veía como entraban las cajas de Coca-Cola y yo no las había visto ni en pintura las cocacolas y me me moría de ganas de probarla. La cajas eran de madera pintada de amarillo, preciosas, si tuviera una, ahora, daría lo que fuera por tener una.
                                    </p>

                                </div>
                                <div className="container__list__story__block--content__profile">
                                    <div className="section_instructions__icon__box"><img src={icon_profile} />
                                    </div>
                                    <div className="container__list__story__block--content__profile__name-date">
                                        <h5>John Doe<br />
                                            23/8/2018</h5>
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

                                        {!logic.loggedIn() ? <button onClick={this.onLinkToRegister}> register </button> : ''}
                                        {logic.loggedIn() ? <button type="submit">add new story</button> : <button onClick={this.onLinkToRegister}> write new story </button>}

                                        {/* {!logic.loggedIn() && <button onClick={this.onLinkToRegister}> register </button>} */}
                                        {/* {!logic.loggedIn() && <button onClick={this.onLinkNewStory}> add new story </button>} */}

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <Detail />

            </div >
        );
    }
}

export default withRouter(Detail)
