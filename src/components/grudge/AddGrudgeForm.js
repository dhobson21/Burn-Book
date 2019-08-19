import React, { Component } from 'react'
import {Form, Header} from "semantic-ui-react"
import CurseGenerator from "./../curseGenerator/CurseGenerator"
import "./addGrudge.css"

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
            insult: "",
            incident: '',
            pettyLevel: '',
            userId: +sessionStorage.getItem("activeUser"),
            isResolved: false,
            shared: false
          }



          changeInsultState = (foo) => {
            const newObj = {}
            newObj["insult"] = foo
            this.setState(newObj)
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
    if (
      this.state.enemyName === "" ||
      this.state.date === "" ||
      // this.state.email === "" ||
      // this.state.insult === "" ||
      this.state.incident === "" ||
      this.state.pettyLevel === ""
      ) { window.alert("All fields must be filled out");
    } else {
      event.preventDefault()
      this.clearFields()
    this.props.addItem("grudges", this.state);


  }
}






  render() {
    // const { enemyName, date, email, insult, incident, pettyLevel } = this.state
    return (
      <React.Fragment >

      <Header  size="huge"  textAlign="center"  style={{'paddingBottom': '50px', 'color': '#e34234', 'fontSize': '40px', 'margin': '0px', 'fontFamily': 'Monaco', 'backgroundColor': '#303029'}}>Add New Grudge</Header>
      <Form  className='allform' inverted style={{'backgroundColor': '#292930', 'marginBottom': '0px', 'paddingBottom': '50px' }}>
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
        <Form.Group >
          <Form.Input
            width={8}

            label="Enemy's Email"
            placeholder='dummy@stupid.com'
            onChange={this.handleFieldChange}
            id="email"
            name="email"
            />
            <CurseGenerator  changeInsultState={this.changeInsultState} {...this.props} />
          <Form.Group>

          </Form.Group>
        </Form.Group>
          <Form.TextArea

            label='What Happened:'
            options={options}
            placeholder='Something truly outrageous, no doubt'
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

        <Form.Button color='grey'
          size="large"
          onClick= {this.checkFields}
          >Submit</Form.Button>
      </Form>
      </React.Fragment>
    )
  }
}

