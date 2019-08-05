import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmGrudgeJoin extends Component {
  state = {
    open: false,
    userId: +sessionStorage.getItem("activeUser")
  }

  createSharedGrudge = (grudge) => {
   const newState = {}
    newState["grudgeId"]= grudge.id
    newState.userId = this.state.userId
    this.props.addItem("sharedGrudges", newState)
  }

  show = () => this.setState({ open: true })
  handleConfirm = () => {
    this.createSharedGrudge (this.props.grudge)
    this.setState({ open: false })
  }

  handleCancel = () => this.setState({ open: false })

  render() {
    console.log("Cofirm Grudge Join state", this.state)
    console.log("Confirm Grudge Join props",this.props)
    return (
      <div>
        <Button onClick={this.show}>Join</Button>
        <Confirm
          open={this.state.open}
          content= {`Are you sure you want to join ${this.props.bigGrudge.user.username}'s grudge against ${this.props.bigGrudge.enemyName}?`}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default ConfirmGrudgeJoin
