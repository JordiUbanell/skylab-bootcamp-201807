import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../logic'

import '../css/App.css'

class Producstlist extends Component {

    state = {
        products: []
    }

    componentDidMount(){
        logic.listAllProducts()
            .then(({ products: products }) => {
                this.setState({ products })            
            })
    }

    render() {
        return (<div>{this.state.products.length > 0 &&  this.state.products.map(product => {
            return (
                <section>
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
                                        <h2 className="center__text">“{product.title}”</h2>
                                    </Link>
                                </div>
                                <div className="object__article__author-block ">
                                    <h3>- {product.user.name} {product.user.surname} -</h3>
                                </div>
                                <div className="counter_block">
                                    <span className="span__counters"> {product.story.length} {product.story.length > 1 ? 'stories' : 'story' } </span>        

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            )
            })
            }
            </div>
        )
    }

}

export default Producstlist