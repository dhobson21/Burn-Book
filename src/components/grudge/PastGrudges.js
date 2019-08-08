import React, { Component } from 'react'
import GrudgeCard from "./GrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"

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

  render() {
    console.log("past Grudge state", this.state)
    console.log("past Grudge props", this.props)
    return (

      <React.Fragment>
      <Header size="huge" textAlign="center">My Past Grudges</Header>
      <div className="grudges">
      {
        this.props.expandGrudges.filter(grudge => (grudge.userId === +sessionStorage.getItem("activeUser"))).map(grudge => <GrudgeCard deleteGrudge={this.props.deleteGrudge} key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props} />

        )
      }
      </div>
      <div></div>
    </React.Fragment>
    )
  }
}
