import React, { Component } from 'react'
import {Form, Segment, Button} from "semantic-ui-react"
import APIManager from "../../modules/APIManager"

const options = [
  { key: 1, text: "1--I'm not petty, you're petty", value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 },
  { key: 4, text: 4, value: 4 },
  { key: 5, text: 5, value: 5 },
  { key: 6, text: 6, value: 6 },
  { key: 7, text: 7, value: 7 },
  { key: 8, text: 8, value: 8 },
  { key: 9, text: 9, value: 9 },
  { key: 10, text: "10--Very petty, what of it?", value: 10 },
]

export default class EditGrudgeForm extends Component {
  state = {
    id: "",
    date: "",
    enemyName: "",
    email: "",
    incident: "",
    insult: "",
    isResolved: "",
    pettyLevel: "",
    shared: "",
    userId: ""
  }

  handleFieldChange = (event) => {
    const stateToChange = {};

    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange);
  };

  handleSelectChange = (event, {value}) => {
    const pettyLevel = {}
    pettyLevel["pettyLevel"] = {value}.value
    this.setState(pettyLevel)
  }



  checkFields= (event) => {
    console.log(this.state)
    if (
      this.state.enemyName === "" ||
      this.state.date === "" ||
      this.state.email === "" ||
      // this.state.insult === "" ||
      this.state.incident === "" ||
      this.state.pettyLevel === ""
      ) { window.alert("All fields must be filled out");
    } else {
      event.preventDefault()
    this.props.updateItem("grudges", this.state);

  }
}

//grab individual grudge for value fields of edited input fields
componentDidMount() {
  APIManager.get("grudges", this.props.match.params.grudgeId)
  .then(grudge => {
    this.setState({
      id: +this.props.match.params.grudgeId,
      date: grudge.date,
      enemyName: grudge.enemyName,
      email: grudge.email,
      incident: grudge.incident,
      insult: grudge.insult,
      isResolved: grudge.isResolved,
      pettyLevel: grudge.pettyLevel,
      shared: grudge.shared,
      userId: +sessionStorage.getItem("activeUser")
    });
  });
}
  render() {

    console.log("editFormProps", this.props)
    console.log("state", this.state)
    return (
      <div>
      <Form >
        <Form.Group widths='equal'>
          <Form.Input
            fluid label='Enemy Name'
            id="enemyName"
            onChange={this.handleFieldChange}
            name="enemyName"
            value={this.state.enemyName}
            />
          <Form.Input
            fluid label= 'Date of Incident'
            type= "date"
            onChange={this.handleFieldChange}
            id="date"
            name= "date"
            value={this.state.date}
            />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid label="Enemy's Email for...purposes"
            onChange={this.handleFieldChange}
            id="email"
            name="email"
            value={this.state.email}
            />
          <Form.Group>
          <Segment
            id="insult"
            name="insult"
            value={this.state.insult}
          ></Segment>
            <Button  attached='bottom' size="mini">Make New Insult</Button>
          </Form.Group>
        </Form.Group>
          <Form.TextArea
            label='What this Blockhead did'
            value={this.state.incident}

            onChange={this.handleFieldChange}
            id="incident"
            name="incident"
             />
          <Form.Select
            label="How Petty Am I Being?"
            options= {options}
            onChange= {this.handleSelectChange}
            id="pettyLevel"
            name="pettyLevel"
            value={this.state.pettyLevel}
            />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button
          size="mini"
          onClick= {this.checkFields}
          >Save</Form.Button>
      </Form>
      </div>
    )
  }
}
