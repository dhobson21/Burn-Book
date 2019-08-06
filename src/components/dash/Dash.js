import React, { Component } from 'react'
import "./dash.css"
import GrudgeCard from "../grudge/GrudgeCard"
import {Header} from "semantic-ui-react"
// import APIManager from "../../modules/APIManager"
export default class Dash extends Component {




render() {

  console.log("dash props", this.props)
  console.log("dash state", this.state)
  // {this.getAllGrudges()}
  return (
      <React.Fragment>
        <Header size="huge" textAlign="center">My Active Grudges</Header>
        <div className="grudges">
        {
           this.props.expandGrudges.filter(grudge => !grudge.isResolved).map(grudge => <GrudgeCard key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props}/>)

        }



        </div>
      </React.Fragment>
    )
  }
}

