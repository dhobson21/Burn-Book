import React, { Component } from "react";
import { Form, Button, Modal, Icon, Header} from "semantic-ui-react";
import APIManager from "../../modules/APIManager";
import GrudgeResolveModal from "./GrudgeResolveModal";
import CurseGeneratorEdit from "./../curseGenerator/CurseGeneratorEdit"


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
  { key: 10, text: "10--Very petty, what of it?", value: 10 }
];

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
    userId: "",
    boo: false
  };





  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleSelectChange = (event, { value }) => {
    const pettyLevel = {};
    pettyLevel["pettyLevel"] = { value }.value;
    this.setState(pettyLevel);
  };
  handleCheckChange = (event, { checked }) => {
    const checkTrue = {};
    checkTrue["isResolved"] = { checked }.checked;
    this.setState(checkTrue);
    this.notOpen.open = checkTrue.isResolved;
    this.checked.checked = checkTrue.isResolved;
  };


  checkFields = event => {
    let editedObj = {
      id: this.state.id ,
      date: this.state.date ,
      enemyName: this.state.enemyName ,
      email: this.state.email ,
      incident: this.state.incident ,
      insult: this.state.insult ,
      isResolved: this.state.isResolved ,
      pettyLevel: this.state.pettyLevel ,
      shared: this.state.shared ,
      userId: this.state.userId ,

    }
    if (
      this.state.enemyName === "" ||
      this.state.date === "" ||
      // this.state.email === "" ||
      // this.state.insult === "" ||
      this.state.incident === "" ||
      this.state.pettyLevel === ""
    ) {
      window.alert("All fields must be filled out");
    } else {
      event.preventDefault();
      this.props.updateItem(editedObj)
      .then(() => this.props.getAndUpdateState())
      .then(() => this.props.history.push("/"))

    }
  };

  checked = { checked: false }
  notOpen = { open: false };
  closeConfigShow = () => {
    this.notOpen = {
      open: true
    };
  };

  close = () => {
    this.notOpen = { open: false };
    this.checked = { checked: false };
    const checkFalse = {};
    checkFalse["isResolved"] = false;
    this.setState(checkFalse);
  };

  changeState = () => {

    this.setState(prevState => ({
      boo: !prevState.boo
    }))



  }
  cancelChanges = () => {
    const newState = {}
    newState["insult"] = ""
    this.setState(newState)
    this.props.history.push ("/")

  }
  changeInsultState = (foo) => {
    const newObj = {}
    newObj["insult"] = foo
    this.setState(newObj)
  }


  //grab individual grudge for value fields of edited input fields
  componentDidMount() {
    APIManager.get("grudges", this.props.match.params.grudgeId).then(grudge => {
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

  curse = (words1, words2, words3) => {
    const newState = {}
    const adj1 = this.randomWord(words1)
    const adj2 = this.randomWord(words2)
    const n = this.randomWord(words3)
    newState["insult"] =`${adj1} ${adj2} ${n}!`;
    this.setState(newState)
     console.log("cursemade", this.state.insult)
  }

  randomWord = (arr) => {
    const word = arr[Math.round(Math.random(1) * arr.length-1)]
    return word
  }

  render() {

    const { open } = this.notOpen;
    const { checked } = this.checked;

    return (
      <div>
       <Header  size="huge"  textAlign="center"  style={{'paddingBottom': '50px', 'color': '#e34234', 'fontSize': '40px', 'margin': '0px', 'fontFamily': 'Monaco', 'backgroundColor': '#303029'}}>Edit Grudge Against {this.state.enemyName}</Header>
        <Form inverted style={{'backgroundColor': '#292930', 'marginBottom': '0px', 'paddingBottom': '50px' }}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Enemy Name"
              id="enemyName"
              onChange={this.handleFieldChange}
              name="enemyName"
              value={this.state.enemyName}
            />
            <Form.Input
              fluid
              label="Date of Incident"
              type="date"
              onChange={this.handleFieldChange}
              id="date"
              name="date"
              value={this.state.date}
            />
          </Form.Group>
          <Form.Group >
            <Form.Input
              width={8}
              fluid
              label="Enemy's Email for...purposes"
              onChange={this.handleFieldChange}
              id="email"
              name="email"
              value={this.state.email}
            />
              <CurseGeneratorEdit   editFormStateInsult={this.state.insult} changeInsultState={this.changeInsultState} makeCurse={this.curse} {...this.props}  />
          </Form.Group>



          <Form.TextArea
            label="What this Blockhead did"
            value={this.state.incident}
            onChange={this.handleFieldChange}
            id="incident"
            name="incident"
          />
          <Form.Select
            label="How Petty Am I Being?"
            options={options}
            onChange={this.handleSelectChange}
            id="pettyLevel"
            name="pettyLevel"
            value={this.state.pettyLevel}
          />
          {/* <GrudgeResolveCheckbox  /> */}

          <Modal style={{'backgroundColor': '#e34234'}}
            open={open}
            onClose={this.close}
            size="mini"
            trigger={
              <Form.Checkbox
                label={{ children: "Resolve Grudge" }}
                id="isResolved"
                onClick={this.handleCheckChange}
                checked={checked}

              />
            }
          >
            <Modal.Header  style={{'backgroundColor': '#e34234', 'textAlign': 'center'}} >Resolve Grudge</Modal.Header>
            <Modal.Content style={{'backgroundColor': '#e34234'}}>
              <p>Are you sure you're ready to be the bigger person?</p>
            </Modal.Content>

            <Modal.Actions style={{'backgroundColor': '#e34234'}}>
            <Button
              floated='left'
              color='grey'
              onClick={() => {
                this.close();
              }}

            >
              <Icon name="left chevron" /> Cancel
            </Button>
              <GrudgeResolveModal  grudge={this.state}  makeCurse={this.curse} changeState={this.changeState}{...this.state} {...this.props}/>
            </Modal.Actions>
          </Modal>
          <div style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent':  'center'}}>

          <Form.Button style={{'width': 141, 'marginRight': 15}}size="medium" color='grey' onClick={this.checkFields}>
            Save Changes
          </Form.Button>
          <Form.Button  style={{'width': 141}}size="medium" color='grey' onClick={this.cancelChanges}>
            Cancel Changes
          </Form.Button>
          </div>

        </Form>
      </div>
    );
  }
}
