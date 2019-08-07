import React, { Component } from "react";
import { Button, Modal, Icon} from "semantic-ui-react";
import ResolvedGrudgeForm from "./ResolvedGrudgeForm";


// const transitions = [
//   'browse',
//   'browse right',
//   'drop',
//   'fade',
//   'fade up',
//   'fade down',
//   'fade left',
//   'fade right',
//   'fly up',
//   'fly down',
//   'fly left',
//   'fly right',
//   'horizontal flip',
//   'vertical flip',
//   'scale',
//   'slide up',
//   'slide down',
//   'slide left',
//   'slide right',
//   'swing up',
//   'swing down',
//   'swing left',
//   'swing right',
//   'zoom',
// ]
export default class GrudgeResolveModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => this.setState(prevState => ({ open: !prevState.open }))

  render() {
    // const { animation, duration, open } = this.state
    const open = this.state
    console.log("Resolve Grudge Modal props", this.props)
    console.log("Resolve Grudge Modal state", this.state)
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button
            primary icon>
            Proceed <Icon name="right chevron" />
          </Button>
        }
      >
        {/* <TransitionablePortal open={open} transition={{ animation, duration }}> */}
        <Modal.Header as="h2">"Prodigious birth of love it is to me,
That I must love a loathèd enemy"</Modal.Header>
          <Modal.Content >
          <ResolvedGrudgeForm {...this.props}  />
        </Modal.Content>
        {/* </TransitionablePortal> */}
      </Modal>
    );
  }
}
