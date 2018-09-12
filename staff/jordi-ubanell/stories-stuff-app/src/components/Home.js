import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import '../css/App.css'

import Menu from './Menu'
import Instructions from './Instructions'
import List from './List'

class Home extends Component {

  render() {
    return (
      <div className="App">
  
        {/* <Menu /> */}
        <Instructions />
        <List />       

      </div>
    );
  }
}

export default withRouter(Home)
