import React, { Component } from 'react'
import {Form, Segment, Button} from "semantic-ui-react"


//refactor to pull options from DB
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

export default class AddGrudgeForm extends Component {
  state = { enemyName: '',
            date: '',
            email: '',
            insult: '',
            incident: '',
            pettyLevel: '',
            userId: +sessionStorage.getItem("activeUser"),
            isResolved: false,
            shared: false
          }


  clearFields = () =>
  {
      document.getElementById("enemyName").value = ""
      document.getElementById("date").value = ""
      document.getElementById("email").value = ""
      document.getElementById("insult").value = ""
      document.getElementById("incident").value = ""
      document.getElementById("pettyLevel").value = ""
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
    this.props.addItem("grudges", this.state);
    this.clearFields()
  }
}





  // handleSubmit = () => {
  //   const { enemyName, date, email, incident, pettyLevel } = this.state

  //   this.setState({  enemyName, date,  email,  incident,  pettyLevel, userId: +sessionStorage.getItem("activeUser"), isResolved: false, shared: false
  //    })
  // }

  render() {
    // const { enemyName, date, email, insult, incident, pettyLevel } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input
            fluid label='Enemy Name'
            id="enemyName"
            onChange={this.handleFieldChange}
            name="enemyName"
            placeholder='Enemy Name' />
          <Form.Input
            fluid label= 'Date of Incident'
            type= "date"
            onChange={this.handleFieldChange}
            id="date"
            name= "date"
            />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid label="Enemy's Email for...purposes"
            placeholder='dummy@stupid.com'
            onChange={this.handleFieldChange}
            id="email"
            name="email"
            />
          <Form.Group>
          <Segment
            id="insult"
            name="insult"
          ></Segment>
            <Button  attached='bottom' size="mini">Make Insult</Button>
          </Form.Group>
        </Form.Group>
          <Form.TextArea
            label='What this Blockhead did'
            options={options}
            placeholder='An indefensible act'
            onChange={this.handleFieldChange}
            id="incident"
            name="incident"
             />
          <Form.Select
            label="How Petty Am I Being?"
            options= {options}
            onChange= {this.handleSelectChange}
            placeholder="Be Honest"
            id="pettyLevel"
            name="pettyLevel"
            />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button
          size="mini"
          onClick= {this.checkFields}
          >Submit</Form.Button>
      </Form>
    )
  }
}

