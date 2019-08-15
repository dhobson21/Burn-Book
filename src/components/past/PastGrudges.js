import React, { Component } from 'react'
import PastGrudgeCard from "./PastGrudgeCard"
import {Header} from "semantic-ui-react"
import APIManager from "./../../modules/APIManager"

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
    return (

      <React.Fragment>
      <Header size="huge" textAlign="center">My Past Grudges</Header>
      <div className="grudges">
      {
        this.props.resolvedGrudges.filter(grudge => grudge.userId === +sessionStorage.getItem("activeUser")).filter(grudge => grudge.isResolved).map(grudge => <PastGrudgeCard deleteGrudge={this.props.deleteGrudge} key={grudge.id}  grudge={grudge} images={this.props.images} {...this.props} />

        )
      }
      </div>
      <div></div>
    </React.Fragment>
    )
  }
}
