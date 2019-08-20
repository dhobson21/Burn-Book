import React, { Component } from 'react'
import PastGrudgeCard from "./PastGrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "./../../modules/APIManager"
import "./past.css"

export default class PastGrudges extends Component {
  state = {
    expandGrudges: []
  }

componentDidMount() {
  const newState={}
APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges")
  .then(allGrudges => {
    newState.expandGrudges = allGrudges.filter(grudge => grudge.isResolved)
    this.setState(newState)})
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
    })
    .then(() => {this.props.getAndUpdateState()
    this.props.history.push("/past")})
}

  render() {
    return (

      <React.Fragment>
     <Header size="huge" textAlign="center" style={{'color': '#5cdb95', 'paddingBottom': '50px', 'fontSize': '40px', 'fontFamily': "'Arvo', serif", 'fontWeight': 1000, 'backgroundColor': '#303029', 'margin': '0px'}}>My Resolved Grudges</Header>



      <div className="past">
      {
        this.props.resolvedGrudges.filter(grudge => grudge.userId === +sessionStorage.getItem("activeUser")).filter(grudge => grudge.isResolved).map(grudge => <PastGrudgeCard deleteGrudge={this.deleteGrudge} key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props} />

        )
      }
      </div>
    </React.Fragment>
    )
  }
}
