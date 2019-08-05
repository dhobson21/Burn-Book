import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'
import Dash from "./dash/Dash"
import Login from "./welcome/Login"
import Register from "./welcome/Register"
import APIManager from '../modules/APIManager';
import AddGrudgeForm from './grudge/AddGrudgeForm';
import EditGrudgeForm from './grudge/EditGrudgeForm';
import PastGrudges from "./grudge/PastGrudges"
import ExploreGrudges from "./users/ExploreGrudge"


const activeUser = +sessionStorage.getItem("activeUser")

class ApplicationViews extends Component {

  state = {
    grudges: [],
    images:[],
    otherUsers:[],
    resolvedGrudges:[],
    expandGrudges: [],
    userSharedGrudges: []
  }

//loading user data to update state object
componentDidMount(){
  const newState = {}
  const notYou= []
APIManager.getAll(`grudges?userId=${activeUser}`)
  .then(allGrudges => (newState.grudges = allGrudges))
  .then(() => APIManager.getAll("images"))
  .then(allImages => (newState.images = allImages))
  .then(() => APIManager.get("users", "?_embed=grudges"))
  .then(allUsers => allUsers.forEach(user => {
     if (user.id !== +sessionStorage.getItem("activeUser")) {
        notYou.push(user)
      } else {}
     (newState.otherUsers = notYou)
    }))
  .then(() => APIManager.getAll("resolvedGrudges"))
  .then(allResolvedGrudges => (newState.resolvedGrudges = allResolvedGrudges))
  .then(() => APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"))
  .then(allExpanded => (newState.expandGrudges= allExpanded))
  .then(() => APIManager.get("sharedGrudges", "?_expand=grudge&_expand=user"))
  .then(allSharedGrudges => (newState.userSharedGrudges= allSharedGrudges))
  .then(() =>this.setState(newState))
  .then(() => console.log("MountedState", this.state))
}

//check session storage for value, return true or false
//use to redirect unauthenticated users to the welcome page
isAuthenticated = () => {
  return sessionStorage.getItem("activeUser") !== null
}


//function to add item to DB specifying name of resource {name} and object to add {item}

addItem = (name, item) => {
  let newObj = {}
  APIManager.post(name, item)
    .then(() =>
      APIManager.getAll(`${name}?userId=${activeUser}`)
    )
    .then(items => {
      newObj[name] = items
      this.setState(newObj)
    })
    .then(() => name === "sharedGrudges" ? (this.props.history.push("/explore")) :
(this.props.history.push("/")))


}
//function to put (edit) object and save to DB
updateItem = (name, editedObject) => {
  let newObj = {}
  return APIManager.put(name, editedObject)
    .then(() =>
      APIManager.getAll(
        `${name}?userId=${activeUser})}`
      )
    )
    .then(item => {
      newObj[name] = item
      this.setState(newObj)
    })
    .then(()=> {

      this.props.history.push("/")

    })

}
getAndUpdateState = () => {
      APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges")
    .then(grudges => {
      const stateToChange = {}
      stateToChange["expandGrudges"] = grudges
      this.setState(stateToChange)
    })
}
deleteItem = (name, id) => {

  let newObj = {}
  return fetch(`http://localhost:5002/${name}/${id}`, {
    method: "DELETE"
  })
    .then(e => e.json())
    .then(() => APIManager.getAll(`${name}?userId=${activeUser}`
    ))
    .then(group => {
      newObj[name] = group
      this.setState(newObj)
      this.props.history.push("/")
    })
}



  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/"
          render={props => {
            if(this.isAuthenticated()) return (
              <Dash sharedGrudges= {this.state.userSharedGrudges} expandGrudges={this.state.expandGrudges.filter(grudge => !grudge.isResolved)} updateResolve= {this.updateResolve} updateItem={this.updateItem} deleteItem={this.deleteItem} images={this.state.images} grudges={this.state.grudges} {...props} />
            )
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
        <Route
          exact path="/add"
          render={props => {
            if(this.isAuthenticated()) return <AddGrudgeForm addItem={this.addItem} {...props}/>
            else return <Redirect to="/login" />
          }}
        />
        <Route
          exact path="/edit/:grudgeId(\d+)"
          render={props => {
            let grudge = this.state.expandGrudges.find(grudge =>
            grudge.id === parseInt(props.match.params.grudgeId))
                    if (!grudge) {
                        grudge = {id:404, EnemyName:"404", incident: "Enemy not found"}}
            if(this.isAuthenticated()) {
              return <EditGrudgeForm getAndUpdateState={this.getAndUpdateState} grudge={grudge} {...props} updateItem={this.updateItem} addItem={this.addItem}/>
            } else  {
                return <Redirect to="/login" />
            }
          }}/>
        <Route
          exact path="/past"
          render={props => {
            if(this.isAuthenticated()) return <PastGrudges grudges={this.state.expandGrudges.filter(grudge=> grudge.userId===activeUser)} images={this.state.images} {...props} />
            else  {
              return <Redirect to="/login" />
          }
          }}/>
        <Route
          exact path="/explore"
          render={props => {
            if(this.isAuthenticated()) return (

            <ExploreGrudges
              users={this.state.otherUsers}
              grudges={this.state.expandGrudges.filter(g => (g.userId !== activeUser) )}


               images={this.state.images} updateItem= {this.updateItem} addItem={this.addItem} {...props} getAndUpdateState={this.getAndUpdateState} />
            )
            else  {
              return <Redirect to="/login" />
            }
          }}/>
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

