import React, { Component } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import ResolvedGrudgeForm from "./ResolvedGrudgeForm";

export default class GrudgeResolveModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    console.log(this.props)
    const { open } = this.state
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
        <Modal.Header>Resolve This Grudge</Modal.Header>
        <Modal.Content>
          <ResolvedGrudgeForm {...this.props} />
        </Modal.Content>

      </Modal>
    );
  }
}
