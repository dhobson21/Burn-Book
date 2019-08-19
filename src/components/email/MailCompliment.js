import React, { Component } from 'react'
import {Button, Confirm} from "semantic-ui-react"
import * as emailjs from "emailjs-com"

export default class MailCompliment extends Component {


state= {
  enemyEmail: this.props.grudge.email,
  enemyName: this.props.grudge.enemyName,
  insult: this.props.grudge.insult,
  compliment: this.props.grudge.resolvedGrudges[0].compliment,
  firstname: this.props.grudge.user.firstname,
  lastname: this.props.grudge.user.lastname,
  open: false

}

open = () => this.setState({ open: true })
close = () => this.setState({ open: false })


sendCompliment = (grudge) => {

      const service_id = "LordBurnbook";
      const template_id = "template_OvsGWTYl";


// const emailObj = {
//       enemyEmail:grudge.email,
//       enemyName: grudge.enemyName,
//       compliment: grudge.insult
// }


// this.setState(emailObj)
console.log(this.state)

this.close()
emailjs.init( "user_8FiOWu9kADcq5A3HqhaCu");

emailjs.send(service_id, template_id, this.state )
.then(function(response) {
  window.alert("Success! Compliment Sent", response.text)
}, function(error) {
  window.alert('Compliment Email Failed...', error);
});


}
render() {
return (
<div>
  <Button  color='grey' style={{'marginTop': 25}} onClick= {this.open}>Spread Goodwill </Button>
  <Confirm open={this.state.open} onCancel={this.close} onConfirm={() => this.sendCompliment(this.props.grudge)} content="Are you sure you want to email this compliment to your former enemy?" />




</div>
)
}
}