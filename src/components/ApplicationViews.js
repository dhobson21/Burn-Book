import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'
import Dash from "./dash/Dash"
import Login from "./welcome/Login"
import Register from "./welcome/Register"




class ApplicationViews extends Component {

//check session storage for value, return true or false
//use to redirect unauthenticated users to the welcome page
isAuthenticated = () => {
  return sessionStorage.getItem("activeUser") !== null
}



  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/"
          render={props => {
            if(this.isAuthenticated()) return <Dash {...props} />
            else return <Redirect to="/login" />
          }}

        />
        <Route
          exact path="/login"
          render={props => {
            return <Login setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          exact path="/register"
          render={props => {
            return <Register setUser={this.props.setUser} {...props} />
          }}
        />
        {/* <Route
          exact path="/"
          render={props => {
            return <Dash setUser={this.props.setUser} {...props} />
          }}
        /> */}
      </React.Fragment>

    )
  }
}

export default withRouter(ApplicationViews)

