import React, { Component } from 'react'
import "./dash.css"
import GrudgeCard from "../grudge/GrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"

const activeUser = +sessionStorage.getItem("activeUser")
export default class Dash extends Component {
  state = {
    expandGrudges: [],
    images:[],
    otherUsers:[],
    resolvedGrudges:[],
    sharedGrudges: [],
    insult: ""
  }

  componentDidMount(){
    const newState = {}
    const notYou= []
    //get all Grudges expanded
  APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges")
    .then(allGrudges => newState.expandGrudges = allGrudges.filter(grudge => grudge.userId=activeUser))

  // get all images
    .then(() => APIManager.getAll("images"))
    .then(allImages => (newState.images = allImages))
  //get all users and filter so that activec user is not included
    .then(() => APIManager.get("users", "?_embed=grudges"))
    .then(allUsers => allUsers.forEach(user => {
       if (user.id !== +sessionStorage.getItem("activeUser")) {
          notYou.push(user)
        } else {}
       (newState.otherUsers = notYou)
      }))
      //get all resolved grudges
    .then(() => APIManager.getAll("resolvedGrudges"))
    .then(allResolvedGrudges => (newState.resolvedGrudges = allResolvedGrudges))

    //get all sharedGrudges

    .then(() => APIManager.get("sharedGrudges", "?_expand=grudge&_expand=user"))
    .then(allSharedGrudges => (newState.sharedGrudges= allSharedGrudges))
    .then(() =>this.setState(newState))
    .then(() => console.log("MountedState", this.state))
  }
  deleteGrudge = ( id) => {

    let newObj = {}
    return fetch(`http://localhost:5002/grudges/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"
      ))
      .then(group => {
        newObj["expandGrudges"] = group
        this.setState(newObj)
        this.props.history.push("/")
      })
  }

render() {

  console.log("dash props", this.props)
  console.log("dash state", this.state)
  // {this.getAllGrudges()}
  return (
      <React.Fragment>
        <Header size="huge" textAlign="center">My Active Grudges</Header>
        <div className="grudges">
        {
           this.state.expandGrudges.filter(grudge => !grudge.isResolved).map(grudge => <GrudgeCard key={grudge.id}  grudge={grudge} deleteGrudge={this.deleteGrudge} images={this.props.images} {...this.props}/>)

        }



        </div>
      </React.Fragment>
    )
  }
}

