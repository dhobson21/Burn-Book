import React, { Component } from 'react'
import logo from "./../img/BBLogo.png"
import {Container} from "semantic-ui-react"

export default class Footer extends Component {
  render() {
    return (
      <div style={{'backgroundColor': 'rgb(48, 48, 41)', 'height': '75px'}}>
         <Container fluid textAlign='center' style={{'backgroundColor': '#303029', 'margin': '0px','borderRadius': '0%'}}>
          <img  src={logo} alt='logo'/>
        </Container>
      </div>
    )
  }
}
