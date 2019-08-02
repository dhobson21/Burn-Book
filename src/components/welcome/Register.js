import React, { Component } from 'react'
import "./register.css"

export default class Register extends Component {
state= {
  firstname: "",
  lastname:"",
  username: "",
  password: "",
  email: ""
}

handleFieldChange = event => {
  const stateToChange = {}
  stateToChange[event.target.id] = event.target.value
  this.setState(stateToChange)
}

handleChange = event => {
  console.log(event)
  if (
    this.state.firstname === "" ||
    this.state.lastname === "" ||
    this.state.username === "" ||
    this.state.password === "" ||
    this.state.email === ""
  ) {
    window.alert("All fields must be filled out")
  }
  else {
    event.preventDefault()
    //check if username and email are unique
    fetch(`http://localhost:5002/users`)
      .then(res => res.json())
      .then(allUsers => {
        console.log(allUsers)
        let filteredUsers = allUsers.filter(filterUsers => {
          return (
            filterUsers.username === this.state.username ||
            filterUsers.email === this.state.email
          )
        })
        console.log(filteredUsers)
        if (filteredUsers.length !== 0) window.alert("user already exists")
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
                  sessionStorage.setItem("activeUser", user[0].id)
                  this.props.setUser(user[0].id)

                  //routing to dashboard
                  this.props.history.push("/")
                  console.log(user)
                })
            })
          }
        })
    }
  }

  render() {
    return (
      <form>
        <h1>Please Register</h1>
        <input
          autoFocus
          id="firstname"
          onChange={this.handleFieldChange}
          placeholder="first name"
        />
        <input
          id="lastname"
          onChange={this.handleFieldChange}
          placeholder="last name"
        />
        <input
          onChange={this.handleFieldChange}
          id="username"
          placeholder="username"
        />
        <input
          id="password"
          onChange={this.handleFieldChange}
          placeholder="password"
        />
        <input
          id="email"
          onChange={this.handleFieldChange}
          placeholder="email"
        />
        <button onClick={this.handleChange}>Register</button>
      </form>
    )
  }
}
