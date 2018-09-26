import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'


import '../css/App.css'

import Instructions from './Instructions'
import Productslist from './Productslist'

class Home extends Component {

  render() {
    return (
      <div className="App">
  
        {/* <Menu /> */}
        <Instructions />
        {/* <List />        */}
        <Productslist />

      </div>
    );
  }
}

export default withRouter(Home)
