import React, { Component } from 'react'
import { Button, Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import "./login.css"
import Background from '../welcome/burnbook.jpg';

const sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundAttachment:'scroll'

};
export default class Login extends Component {

  state= {
    username: "",
    password: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleChange = (event) => {
    //fetch
    fetch(`http://localhost:5002/users?username=${this.state.username}`)
      .then(res => res.json())
      .then(user => {
        //check for matching
        if (user.length === 0) window.alert("no user found!")
        else if (user[0].password === this.state.password) {
          //set sessionStorage
          sessionStorage.setItem("activeUser", user[0].id)

          this.props.setUser(user[0].id)
          //routing to dashboard
          this.props.history.push("/  ")
        }
        else window.alert("That password is incorrect")

    })
    .then(this.props.setUser(parseInt(sessionStorage.getItem("activeUser"))))
    //post
    //fetch

}

  render() {
    return (
      <section style={ sectionStyle }>

      <Container className="login_image">
        <Header as='h1' color='red' textAlign='center' className="logHead" >
               At this hour lie at my mercy all mine enemies
            </Header>
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='red' textAlign='center'>
               Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' id="username" onChange={this.handleFieldChange} />
                <Form.Input
                  fluid
                  icon='lock'
                  id="password"
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleFieldChange}
                />

                <Button color='red' fluid size='large' onClick={this.handleChange}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to Burn Book? <a href='/register'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>

    </Container>
      </section>
    )
  }
}
