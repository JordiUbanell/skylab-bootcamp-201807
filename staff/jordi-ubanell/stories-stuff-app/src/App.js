import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
// import minicon_close from './images/minicon_close.svg'
// import minicon_edit from './images/minicon_edit.svg'
// import minicon_menu from './images/minicon_menu.svg'
// import minicon_search from './images/minicon_search.svg'
// import icon_add from './images/icon_add.svg'
// import icon_object from './images/icon_object.svg'
// import icon_story from './images/icon_story.svg'
// import icon_vote from './images/icon_vote.svg'
// import icon_profile from './images/icon_profile.svg'

import './css/App.css'

// import home from './components/Home'
import List from './components/List'
import Login from './components/Login'
import Menu from './components/Menu'
import Product from './components/Product'
import Profile from './components/Profile'
import Register from './components/Register'
import About from './components/About'
import Search from './components/Search'

import logic from './logic'

class App extends Component {
  initApp = () => {
    logic._userEmail = userEmail => {
      if(userEmail !== undefined) {
        sessionStorage.setItem('userEmail', userEmail)
        return
      }

      return sessionStorage.getItem('userEmail')
    }

    logic._userToken = userToken => {
      if(userToken !== undefined) {
        sessionStorage.setItem('userToken', userToken)
        return
      }

      return sessionStorage.getItem('userToken')
    }
  }

  componentDidMount() {
    this.initApp()
  }

  render() {
    return (
      <div className="App">
  

        <List />
        <Menu />
        <Search />
        <Register />
        <Login />
        <Product />
        <Profile />
        <About />
        

        <Switch>
          {/* <Route exact path="/" render={<Home />} /> */}
          <Route path="/register" render={() => logic.loggedIn ? <Redirect to="/home" /> : <Register />} />
          {/* <Route path="/menu" render={<Menu />} />
          <Route path="/list" render={ <List />} />
          <Route path="/about" render={ <About />} />
          <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Login onLoggedIn={this.onLoggedIn} />} />
          <Route path="/product" render={ <Product />} />
          <Route path="/profile" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Profile onLoggedIn={this.onLoggedIn} />} />
          <Route path="/search" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Search />} /> */}
        </Switch> 

      </div>
    );
  }
}

export default withRouter(App)
