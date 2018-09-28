import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import './css/App.css'

import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Search from './components/Search'
import Menu from './components/Menu'
import Product from './components/Product'
import PageNotFound from './components/PageNotFound'

import ProductDetail from './components/ProductDetail'

import logic from './logic'

class App extends Component {

  // state = {
  //   token: sessionStorage.getItem('userToken', userToken) || '' 
  // }

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
        {/* <Menu token={this.state.token} /> */}
        <Menu />

        <Switch>
          <Route exact path="/" render={() => (<Home />)} />
          <Route path="/about" render={() => (<About />)} />
          <Route path="/search" render={() => (<Search />)} />
          <Route path="/post/:productId" component={ProductDetail} />

          <Route path="/register" render={() => logic.loggedIn() ? <Redirect to="/" /> : <Register />} />
          <Route path="/login" render={() => logic.loggedIn() ? <Redirect to="/" /> : <Login />} />
          <Route path="/profile" render={() => logic.loggedIn() ? <Profile /> : <Redirect to="/" />} />
          <Route path="/product" render={() => logic.loggedIn() ? <Product /> : <Redirect to="/" />} />
          
          <PageNotFound />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App)
