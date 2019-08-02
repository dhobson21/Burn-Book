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




class ApplicationViews extends Component {

  state = {
    grudges: [],
    images:[],
    users:[],
    resolvedGrudges:[]
  }


//loading user data to update state object
componentDidMount(){
  const newState = {}
APIManager.getAll(`grudges?userId=${+sessionStorage.getItem("activeUser")}`)
  .then(allGrudges => (newState.grudges = allGrudges))
  .then(() => APIManager.getAll("images"))
  .then(allImages => (newState.images = allImages))
  .then(() => APIManager.getAll("users"))
  .then(allUsers => (newState.users = allUsers))
  .then(() => APIManager.getAll("resolvedGrudges"))
  .then(allResolvedGrudges => (newState.resolvedGrudges = allResolvedGrudges))
  .then(() =>this.setState(newState))
  .then(() => console.log(this.state))
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
      APIManager.getAll(`${name}?userId=${+sessionStorage.getItem("activeUser")}`)
    )
    .then(items => {
      newObj[name] = items
      this.setState(newObj)
    })
    .then(() => name === "resolvedGrudges" ? this.props.history.push("/past") : this.props.history.push("/"))


}
//function to put (edit) object and save to DB
updateItem = (name, editedObject) => {
  let newObj = {}
  return APIManager.put(name, editedObject)
    .then(() =>
      APIManager.getAll(
        `${name}?userId=${+sessionStorage.getItem("activeUser")}`
      )
    )
    .then(item => {
      newObj[name] = item
      this.setState(newObj)
    })
    .then(()=> {
      console.log("propsupdate", this.props.history)
      this.props.history.push("/")

    })

}

deleteItem = (name, id) => {
  console.log("inside delete item")
  let newObj = {}
  return fetch(`http://localhost:5002/${name}/${id}`, {
    method: "DELETE"
  })
    .then(e => e.json())
    .then(() => APIManager.getAll(`${name}?userId=${+sessionStorage.getItem("activeUser")}`
    ))
    .then(group => {
      newObj[name] = group
      this.setState(newObj)
      console.log(name, newObj, this.state)
      this.props.history.push("/")
    })
}

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/"
          render={props => {
            if(this.isAuthenticated()) return <Dash updateResolve= {this.updateResolve} updateItem={this.updateItem} deleteItem={this.deleteItem} images={this.state.images} grudges={this.state.grudges} {...props} />
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
            let grudge = this.state.grudges.find(grudge =>
            grudge.id === parseInt(props.match.params.grudgeId))
                    if (!grudge) {
                        grudge = {id:404, EnemyName:"404", incident: "Enemy not found"}}
            if(this.isAuthenticated()) {
              return <EditGrudgeForm grudge={grudge} {...props} updateItem={this.updateItem} addItem={this.addItem}/>
            } else  {
                return <Redirect to="/login" />
            }
          }}/>
        <Route
          exact path="/past"
          render={props => {
            if(this.isAuthenticated()) return <PastGrudges grudges={this.state.grudges} images={this.state.images} resolvedGrudges={this.resolvedGrudges}{...props} />
            else  {
              return <Redirect to="/login" />
          }
          }}/>
        <Route
          exact path="/users"
          render={props => {
            return <div>User Grudges</div>
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

