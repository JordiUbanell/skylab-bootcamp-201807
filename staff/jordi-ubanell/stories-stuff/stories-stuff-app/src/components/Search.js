import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'

import logic from '../logic'
import '../css/App.css'
import Menu from './Menu'

class Search extends Component {

    state = {
        word: null,
        results: [],
        message:''
    }


    saveWord = (event) => this.setState({ word: event.target.value })

    onSubmitSearch = e => {
        e.preventDefault()
        return logic.searchWord(this.state.word)
            .then(results => this.setState({ results,message:'' }))
            .catch(({message}) => this.setState({message,results:[]})) 
    }

    render() {

        return (<main>
            <div className="section__search">
                <div className="container">
                    <div className="section__search__warp">
                        <form onSubmit={this.onSubmitSearch}>
                            <input className="input--search" type="text" placeholder="Search" onChange={this.saveWord} >
                            </input>
                        </form>
                        <h4 className='color__red'>{this.state.message && this.state.message}</h4>
                        <section>
                            {(this.state.results && this.state.results.length) && this.state.results.map(product => {
                                return <article>
                                     <div className="container__list-products">
                        <div className="container__list__one-product">
                            <div className="figure__warp">
                                <div className="figure__warp__image">
                                    <div className="figure_image">
                                        <Link to={`/post/${product.id}`}><img src={product.photo}/></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="section__object__article__text-block">
                            </div>
                            <div className="object__article__warp">
                                <div className="object__article__title-block">
                                    <Link to={`/post/${product.id}`}>
                                        <h2 className="center__text, color__grey ">“{product.title}”</h2>
                                    </Link>
                                </div>
                                {/* <div className="object__article__author-block ">
                                    <h3>- {product.user.name} {product.user.surname} -</h3>
                                </div>
                                <div className="counter_block">
                                    <span className="span__counters"> {product.story.length} {product.story.length > 1 ? 'stories' : 'story' } </span>        

                                </div> */}
                            </div>
                        </div>
                    </div>
               

                                </article>
                            })
                            }
                        </section>
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default Search