import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router'



class BurnBook extends Component {
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
    return (
      <React.Fragment>
        <ApplicationViews
          isAuthenticated={this.isAuthenticated}
          setUser={this.setUser} />
      </React.Fragment>
    )
  }
}

export default withRouter(BurnBook)

