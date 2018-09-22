import React, { Component } from 'react'
import './App.css'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
// Custom Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// Redux
import { Provider } from 'react-redux'
// Redux store
import store from './store'

// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Check for token
if (localStorage.jwtToken) {
  // set auth token header
  setAuthToken(localStorage.jwtToken)
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthentication
  store.dispatch(setCurrentUser(decoded))
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
