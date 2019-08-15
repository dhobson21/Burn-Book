import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

class ConfirmGrudgeJoin extends Component {
  state = {
    open: false



  }



  show = () =>this.setState({ open: true })

  handleConfirm = () => {
    this.setState({ open: false })

    let grudgeObj = {
        shared: true,
        enemyName: this.props.grudge.enemyName,
        date: this.props.grudge.date,
        email: this.props.grudge.email,
        insult: this.props.grudge.insult,
        incident: this.props.grudge.incident,
        pettyLevel: this.props.grudge.pettyLevel,
        userId: this.props.grudge.userId,
        isResolved: this.props.grudge.isResolved,
        id: this.props.grudge.id
    }
    let sharedGrudgeObj = {
      userId: +sessionStorage.getItem("activeUser"),
      grudgeId: this.props.grudge.id
    }

    this.props.updateGrudge(grudgeObj)
    .then(() => this.props.addSharedGrudge(sharedGrudgeObj))
    .then (this.props.getAndUpdateState())

    .then(() => this.props.history.push("/"))
  }

  handleCancel = () => this.setState({ open: false })


  render() {
    console.log("JP", this.props)
    return (
      <div >
        <Button onClick= {this.show} >Join Grudge</Button>
        <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content= {`Are you sure you want to join ${this.props.grudge.user.username} in a grudge against ${this.props.grudge.enemyName}`}
                  />
        {/*  */}
      </div>
    )
  }
}

export default ConfirmGrudgeJoin
