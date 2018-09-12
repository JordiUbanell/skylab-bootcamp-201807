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

import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Search from './components/Search'
import Post from './components/Post'
import Menu from './components/Menu'
import Instructions from './components/Instructions'
import List from './components/List'
import Product from './components/Product'
import PageNotFound from './components/PageNotFound'

import logic from './logic'

class App extends Component {
  /**
   * Configure the storage of the app
   */
  initApp = () => {
    logic._userEmail = userEmail => {
      if (userEmail !== undefined) {
        sessionStorage.setItem('userEmail', userEmail)
        return
      }

      return sessionStorage.getItem('userEmail')
    }

    logic._userToken = userToken => {
      if (userToken !== undefined) {
        sessionStorage.setItem('userToken', userToken)
        return
      }

      return sessionStorage.getItem('userToken')
    }

    logic.logout = () => {
      this.userEmail = null
      this.userToken = null
      
      sessionStorage.clear()
    }
  }

  // Prepare the view to show the Register form and update the url path
  goToRegister = () => {
    this.props.history.push('/register')
  }

  render() {
    this.initApp()
    
    return (
      <div className="App">
        <Menu />

        {/* <Home />
        <Menu />
        <Instructions /> 
        <List />
        <Search />
        <Register />
        <Login />
        <Product />
        <Profile />
        <About /> 
        <Post /> */}

        <Switch>
          <Route exact path="/" render={() => (<Home />)} />
          <Route path="/about" render={() => (<About />)} />
          <Route path="/search" render={() => (<Search />)} />
          <Route path="/post" render={() => (<Post />)} />
          <Route path="/register" render={() => logic.loggedIn() ? <Redirect to="/" /> : <Register />} />
          <Route path="/login" render={() => logic.loggedIn() ? <Redirect to="/" /> : <Login />} />
          <Route path="/profile" render={() => logic.loggedIn() ? <Profile /> : <Redirect to="/" /> } />
          <Route path="/product" render={() => logic.loggedIn() ? <Product /> : <Redirect to="/" /> } />

          {/* <Route path="/menu" render={<Menu />} />
          <Route path="/list" render={ <List />} />
          <Route path="/product" render={ <Product />} />
          <Route path="/profile" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Profile onLoggedIn={this.onLoggedIn} />} /> */}
          
          <PageNotFound />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App)
