import React, { Component } from 'react'
import "./active.css"
import ActiveGrudgeCard from "./ActiveGrudgeCard"
import {Header, Image} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"



export default class Active extends Component {
  state = {
    expandGrudges: [],
    images:[],
    otherUsers:[],
    resolvedGrudges:[],
    sharedGrudges: [],
    insult: ""
  }


  componentDidMount() {
    let exploreGrudges= []
 this.props.expandGrudges.forEach(grudge => grudge.userId===+sessionStorage.getItem("activeUser") ? exploreGrudges.push(grudge) : {})

 this.props.expandGrudges.filter(grudge => grudge.userId!==+sessionStorage.getItem("activeUser")).filter(g => g.shared).forEach (oneGrudge => {
  let notMe = true
  oneGrudge.sharedGrudges.forEach(g => {
    if(g.userId !== +sessionStorage.getItem("activeUser")) {
      notMe=false
    }

  })
  if(notMe===true) {exploreGrudges.push(oneGrudge)}


 })
this.setState({expandGrudges: exploreGrudges})
console.log("state", this.state)
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
      <React.Fragment >

        <Header  size="huge"  textAlign="center"  style={{'paddingBottom': '50px', 'color': '#e34234', 'paddingTop': '5px', 'fontSize': '40px', 'margin': '0px', 'fontFamily': 'Monaco', 'backgroundColor': '#303029'}}> My Active Grudges</Header>
        <div className="grudges">
        {
           this.props.expandGrudges.filter(grudge => !grudge.isResolved).sort((curr, next) => next.id-curr.id).map(grudge => <ActiveGrudgeCard  key={grudge.id}  grudge={grudge} deleteGrudge={this.deleteGrudge} images={this.props.images} {...this.props}/>)

        }



        </div>
      </React.Fragment>
    )
  }
}

