import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';
const activeUser = +sessionStorage.getItem("activeUser")
class ConfirmGrudgeJoin extends Component {
  state = {
    open: false,
    sharedGrudges: []

  }

  createSharedGrudge = (grudge) => {
   const newState = {}
   const trueShared = {shared: true,
    enemyName: grudge.enemyName,
   date: grudge.date,
   email: grudge.email,
   insult: grudge.insult,
   incident: grudge.incident,
   pettyLevel: grudge.pettyLevel,
   userId: grudge.userId,
   isResolved: grudge.isResolved,
   id: grudge.id
   }
    newState["grudgeId"]= grudge.id
    newState.userId = activeUser

    this.props.addSharedGrudge(newState)
    this.updateGrudgeShare(trueShared )
    .then(() => this.props.getAndUpdateState())
    .then(() => this.props.history.push("/explore"))





  }

  updateGrudgeShare = (obj) => {
    let newObj={}
    return APIManager.put("grudges", obj)
    .then(() => APIManager.getAll("sharedGrudges"))
    .then(item => {
      newObj["sharedGrudges"] = item
      this.setState(newObj)
    })

  }


  show = () => this.setState({ open: true })

  handleConfirm = (grudge) => {
    this.setState({ open: false })
    this.createSharedGrudge (grudge)
  }

  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button onClick={this.show}>Join</Button>
        <Confirm
          open={this.state.open}
          content= {`Are you sure you want to join ${this.props.grudge.user.username}'s grudge against ${this.props.grudge.enemyName}?`}
          onCancel={this.handleCancel}
          onConfirm= {() => {this.handleConfirm(this.props.grudge)}}
        />
      </div>
    )
  }
}

export default ConfirmGrudgeJoin
