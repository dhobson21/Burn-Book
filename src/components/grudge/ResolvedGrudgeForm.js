import React, { Component } from 'react'
import {Form, Header} from "semantic-ui-react"
import APIManager from '../../modules/APIManager';
import moment from "moment"

export default class ResolvedGrudgeForm extends Component {
  state = {
    resolveReason: "",
    compliment: "",
    grudgeId: +this.props.id,
    date: moment().format("MM/DD/YYYY")


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
    .then(() => this.props.addItem("resolvedGrudges", this.state))
    .then(() => this.props.getAndUpdateState())
    .then(() => this.props.history.push("/"))






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
    console.log("rgP", this.props)
    return (

    <Form  style={{'backgroundColor': "#5cdb95",}}>
      <Header textAlign="center"  as="h3">Resolution Details</Header>
       <Form.Group widths='equal'>
      <Form.TextArea
        id= "resolveReason"
        label= "What is the reason for your valient change of heart?"
        onChange={this.handleFieldChange}

      />
      <Form.TextArea
        id='compliment'
        label= {`What is the best compliment you can give this person?`}
        placeholder={`Phrase in 3rd person...ex: ${this.props.enemyName} has kind eyes and a big heart`}
        onChange={this.handleFieldChange}

      />
    </Form.Group>

    <Form.Button  style= {{'position': 'relative', 'left': '42%', 'bottom': '50%'}} icon="check" content="Submit" onClick={this.checkFields} />


  </Form>
    )
  }
}
