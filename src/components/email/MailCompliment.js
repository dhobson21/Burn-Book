import React, { Component } from 'react'
import {Button} from "semantic-ui-react"
import * as emailjs from "emailjs-com"

export default class MailCompliment extends Component {


state= {
  enemyEmail: this.props.grudge.email,
  enemyName: this.props.grudge.enemyName,
  insult: this.props.grudge.insult,
  compliment: this.props.grudge.resolvedGrudges[0].compliment,
  firstname: this.props.grudge.user.firstname,
  lastname: this.props.grudge.user.lastname

}


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
  <Button onClick= {() => this.sendCompliment(this.props.grudge)}>Spread Goodwill </Button>




</div>
)
}
}