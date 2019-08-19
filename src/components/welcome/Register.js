import React, { Component } from "react";
import "./register.css";
import {
  Form,

  Header,
  Grid,

  Button,

} from "semantic-ui-react";

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    terms: false
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleChange = event => {
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.email === ""

    ) {
      window.alert("All fields must be filled out");
    } else if (this.state.terms === false) {
      window.alert("You must agree to not be crazy")
    } else{
      event.preventDefault();
      //check if username and email are unique
      fetch(`http://localhost:5002/users`)
        .then(res => res.json())
        .then(allUsers => {
          let filteredUsers = allUsers.filter(filterUsers => {
            return (
              filterUsers.username === this.state.username ||
              filterUsers.email === this.state.email
            );
          });

          if (filteredUsers.length !== 0) window.alert("user already exists");
          else {
            //build an object of input values
            //post object to db
            fetch(`http://localhost:5002/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state)
            }).then(() => {
              fetch(
                `http://localhost:5002/users?username=${this.state.username}`
              )
                .then(res => res.json())
                .then(user => {
                  //set sessionStorage
                  sessionStorage.setItem("activeUser", user[0].id);
                  this.props.setUser(user[0].id);

                  //routing to dashboard
                  this.props.history.push("/");
                });
            });
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          textAlign="center"
          style={{ height: "200vh" }}
          verticalAlign="top"
        >
          <Grid.Column>


            <Header as="h2" color="red" textAlign="center">
              Register for BurnBook
            </Header>
            <Form size="large">
              <Form.Group className= 'regInput'>

                <Form.Input width={5}
                  label='First Name'
                  autoFocus
                  id="firstname"
                  onChange={this.handleFieldChange}
                  placeholder="first name"
                />
                <Form.Input width={5}
                  label="Last Name"
                  id="lastname"
                  onChange={this.handleFieldChange}
                  placeholder="last name"
                />
              </Form.Group>


                <Form.Group className= 'regInput'>

                <Form.Input width={5}
                  label='Username'
                 icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  id="username"
                  onChange={this.handleFieldChange}
                />
                <Form.Input width={5}
                  label='Password'
                  icon="lock"
                  id="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleFieldChange}
                />

                </Form.Group>
                <div className="loneItem">

                 <Form.Input width={5}
                  label='Email Address'
                  icon='mail'
                  iconPosition='left'
                  id="email"
                  onChange={this.handleFieldChange}
                  placeholder="email"
                />
                </div>



                <Form.Checkbox
                  label ='I agree that no actions related to my personal grudges will surpass a level of passive-aggressive'
                  required
                  id="terms"
                  onChange = {this.handleFieldChange}

                  />
                <Button
                  color="red"

                  size="large"
                  onClick={this.handleChange}
                >
                  Register
                </Button>

            </Form>

          </Grid.Column>
        </Grid>



      </React.Fragment>
    );
  }
}
