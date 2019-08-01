import React, { Component } from 'react'
import "./dash.css"
import GrudgeCard from "../grudge/GrudgeCard"
import {Icon, Header} from "semantic-ui-react"

export default class Dash extends Component {


  sharedGrudge = (grudge) => {
    if (grudge.shared !== false) {
      return <Icon name="users"></Icon>
    }
  }

  render() {


    return (
      <React.Fragment>
        <Header size="huge" textAlign="center">My Grudges</Header>
        <div className="grudges">
        {
          this.props.grudges.filter(grudge => (!grudge.isResolved)).map(grudge => <GrudgeCard key={grudge.id} sharedGrudge={this.sharedGrudge} grudge={grudge} images={this.props.images} {...this.props}/>

          )
        }
        </div>
      </React.Fragment>
    )
  }
}

