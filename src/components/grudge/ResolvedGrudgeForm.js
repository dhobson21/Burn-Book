import React, { Component } from 'react'
import {Form} from "semantic-ui-react"
import APIManager from '../../modules/APIManager';

export default class ResolvedGrudgeForm extends Component {
  state = {
    resolveReason: "",
    compliment: "",
    grudgeId: +this.props.grudge.id

  }

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);

  };

  checkFields= (event) => {
    if (
      this.state.resolveReason === "" ||
      this.state.compliment === ""
      ) { window.alert("All fields must be filled out");
    } else {
      event.preventDefault()

    this.resolveGrudge()
    .then(() => {
       this.props.addItem("resolvedGrudges", this.state)})
    .then(() => this.props.getAndUpdateState("grudges"))






  }
}

resolveGrudge = () => {
  const grudgeResolvedObj = {
    enemyName: this.props.enemyName,
    date: this.props.date ,
    email: this.props.email ,
    insult: this.props.insult ,
    incident: this.props.incident,
    pettyLevel: this.props.pettyLevel,
    userId: +sessionStorage.getItem("activeUser"),
    isResolved: this.props.isResolved,
    shared: this.props.shared,
    id: this.props.id
  }
  return APIManager.put("grudges", grudgeResolvedObj)


}
  render() {
    console.log("Resolved Grudge Form state", this.state)
    console.log("Resolved Grudge Form props", this.props)
    return (
    <Form>
       <Form.Group widths='equal'>
      <Form.TextArea
        id= "resolveReason"
        label= "What is the reason for your valient change of heart?"
        onChange={this.handleFieldChange}

      />
      <Form.TextArea
        id='compliment'
        label= "How about a compliment for your former enemy?"
        onChange={this.handleFieldChange}
      />
    </Form.Group>

    <Form.Button  icon="check" content="Submit" onClick={this.checkFields} />


  </Form>
    )
  }
}
