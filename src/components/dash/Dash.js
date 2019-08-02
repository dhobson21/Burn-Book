import React, { Component } from 'react'
import "./dash.css"
import GrudgeCard from "../grudge/GrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"
export default class Dash extends Component {


  componentDidMount(){
    const newState = {}
  APIManager.getAll(`grudges?userId=${+sessionStorage.getItem("activeUser")}`)
    .then(allGrudges => (newState.grudges = allGrudges))
    .then(() => APIManager.getAll("images"))
    .then(allImages => (newState.images = allImages))
    .then(() =>this.setState(newState))
    .then(() => console.log(this.state))
  }

  render() {


    return (
      <React.Fragment>
        <Header size="huge" textAlign="center">My Active Grudges</Header>
        <div className="grudges">
        {
          this.props.grudges.filter(grudge => (!grudge.isResolved)).map(grudge => <GrudgeCard key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props}/>

          )
        }
        </div>
      </React.Fragment>
    )
  }
}

