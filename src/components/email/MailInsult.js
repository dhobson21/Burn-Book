import React, { Component } from "react";
import { Button, Confirm } from "semantic-ui-react";
import * as emailjs from "emailjs-com";

export default class MailInsult extends Component {
  state = {
    enemyEmail: this.props.grudge.email,
    enemyName: this.props.grudge.enemyName,
    insult: this.props.grudge.insult,
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  sendInsult = grudge => {
    const service_id = "LordBurnbook";
    const template_id = "insult_email";

    // this.setState(emailObj)
    this.close();
    console.log(this.state);

    emailjs.init("user_8FiOWu9kADcq5A3HqhaCu");

    emailjs.send(service_id, template_id, this.state).then(
      function(response) {
        window.alert("Success! You're very brave", response.text);
      },
      function(error) {
        window.alert("Insult Email Failed...", error);
      }
    );
  };
  render() {
    return (
      <div>
        <Button  color='grey' style={{'marginTop': 25  }}  onClick= {this.open}>
          Escalate Grudge</Button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={() => this.sendInsult(this.props.grudge)} content="Are you sure you want to annonymously email an insult to your enemy?" />
      </div>
    );
  }
}
