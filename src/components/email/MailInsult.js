import React, { Component } from 'react'
import {Button} from "semantic-ui-react"
import * as emailjs from "emailjs-com"

export default class MailInsult extends Component {
  state= {
        enemyEmail: this.props.grudge.email,
        enemyName: this.props.grudge.enemyName,
        insult: this.props.grudge.insult

      }


      sendInsult = (grudge) => {

            const service_id = "LordBurnbook";
            const template_id = "insult_email";


      const emailObj = {
            enemyEmail:grudge.email,
            enemyName: grudge.enemyName,
            insult: grudge.insult
      }


      // this.setState(emailObj)
      console.log(this.state)


    emailjs.init( "user_8FiOWu9kADcq5A3HqhaCu");

      emailjs.send(service_id, template_id, this.state )
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
    }
  render() {
    return (
      <div>
        <Button onClick= {() => this.sendInsult(this.props.grudge)}>Escalate this Grudge</Button>




      </div>
    )
  }
}