import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router'
import NavBar from "./nav/NavBar"
import Footer from "./footer/Footer"




class BurnBook extends Component {
  state = {
    id: "",
    activeUser: +""
  }
  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }
  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }
  render() {
    if (this.isAuthenticated()) {
      //if there is an active user--render nav bar
      return (
        <React.Fragment>
            <NavBar {...this.props} />
          <ApplicationViews
            isAuthenticated={this.isAuthenticated}
            setUser={this.setUser} />
          <Footer />
        </React.Fragment>
      )
    } else{
        return (
          <React.Fragment>
          <ApplicationViews
            activeUser={this.state.activeUser}
            setUser={this.setUser}
          />
        </React.Fragment>
        )
    }
  }
}


export default withRouter(BurnBook)

