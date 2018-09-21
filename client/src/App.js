import React, { Component } from "react"
import "./App.css"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"

//Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Route>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
      </Route>
    )
  }
}

export default App
