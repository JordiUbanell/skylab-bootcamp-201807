import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

// import { logic } from '../logic'
import '../css/App.css'

class About extends Component {


    login = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onLogin(email, password)
    }



    render() {

        return (<main>
            <div className="section__search">
                <div className="container">
                    <div className="section__search__warp">
                        <form>
                            <input className="input--search" type="text" placeholder="Search" >
                            </input>
                        </form>

                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default About