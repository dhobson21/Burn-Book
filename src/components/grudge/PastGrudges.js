import React, { Component } from 'react'
import GrudgeCard from "./GrudgeCard"
import {Header} from "semantic-ui-react"

export default class PastGrudges extends Component {




  render() {
    console.log("past Grudge state", this.state)
    console.log("past Grudge props", this.props)
    return (

      <React.Fragment>
      <Header size="huge" textAlign="center">My Past Grudges</Header>
      <div className="grudges">
      {
        this.props.grudges.filter(grudge => (grudge.isResolved === true)).map(grudge => <GrudgeCard key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props} />

        )
      }
      </div>
      <div></div>
    </React.Fragment>
    )
  }
}
