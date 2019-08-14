import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

class ConfirmGrudgeJoin extends Component {
  state = {
    open: false,


  }

  show = () => this.setState({ open: true })

  handleConfirm = () => {
    this.setState({ open: false })
    console.log("This button works")
    // this.props.createSharedGrudge(grudge)
    // this.props.history.push("/explore")
  }

  handleCancel = () => this.setState({ open: false })

  render() {
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
