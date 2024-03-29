import React, { Component } from "react";
import { Button, Modal, Icon} from "semantic-ui-react";
import ResolvedGrudgeForm from "./ResolvedGrudgeForm";



export default class GrudgeResolveModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => this.setState(prevState => ({ open: !prevState.open }))

  render() {
    // const { animation, duration, open } = this.state
    const {open} = this.state
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button
            color='grey' >
            Proceed <Icon name="right chevron" />
          </Button>
        }
      >
        {/* <TransitionablePortal open={open} transition={{ animation, duration }}> */}
        <Modal.Header style={{'textAlign': 'center', 'backgroundColor': "#5cdb95"}} as="h2">"Prodigious birth of love it is to me,
That I must love a loathèd enemy"</Modal.Header>
          <Modal.Content style={{'backgroundColor': "#5cdb95"}} >
          <ResolvedGrudgeForm {...this.props} grudge={this.props.grudge}  />
        </Modal.Content>
        {/* </TransitionablePortal> */}
      </Modal>
    );
  }
}
