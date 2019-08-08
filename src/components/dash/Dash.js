import React, { Component } from 'react'
import "./dash.css"
import GrudgeCard from "../grudge/GrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"


export default class Dash extends Component {
  state = {
    expandGrudges: [],
    images:[],
    otherUsers:[],
    resolvedGrudges:[],
    sharedGrudges: [],
    insult: ""
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
      this.props.history.push("/")})
  }

render() {
  // {this.getAllGrudges()}
  return (
      <React.Fragment>
        <Header size="huge" textAlign="center">My Active Grudges</Header>
        <div className="grudges">
        {
           this.props.expandGrudges.filter(grudge => grudge.userId===+sessionStorage.getItem("activeUser")).filter(grudge => !grudge.isResolved).map(grudge => <GrudgeCard key={grudge.id}  grudge={grudge} deleteGrudge={this.deleteGrudge} images={this.props.images} {...this.props}/>)

        }



        </div>
      </React.Fragment>
    )
  }
}

