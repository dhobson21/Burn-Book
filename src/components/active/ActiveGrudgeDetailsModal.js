import React, { Component } from 'react'
import MailInsult from "../email/MailInsult"
import {
  Container,
  Confirm,
  Button,
  Header,
  Image,
  Modal,
  Grid,
} from "semantic-ui-react";

export default class ActiveGrudgeDetailsModal extends Component {
  state = {
    open: false,
    shared: "",
    enemyName: "",
    date: "",
    email: "",
    insult: "",
    incident: "",
    pettyLevel: "",
    userId: "",
    isResolved: "",
    id: "",
    sharedGrudges: []
    }

    open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

    //checks with user before deleting grudge from DB
    handleConfirm = () => {
      this.setState({ open: false });
      this.props.deleteGrudge(this.props.grudge.id);
    };

  //if user decides to cancel delete on confirm, confirm closed and user brought back to details Modal
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  render() {

    return (
        <Modal trigger={<Button primary>Details</Button>}>
          <Grid columns={3} divided padded textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <Modal.Content>
                  <Header as="h4">Grudging Since: </Header>
                  {this.props.grudgeDate()}
                </Modal.Content>
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">{this.props.grudge.enemyName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                  onClick={() => {
                    this.props.clearInsult(this.props.insult)
                    this.props.history.push(`/edit/${this.props.grudge.id}`);
                  }}
                >
                  Edit Grudge
                </Button>
                <div>
                  <Button onClick={this.open}>Delete Grudge</Button>
                  <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content="Are you sure you want to delete an Unresolved grudge?"
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign="middle">
                <Modal.Content>
                  <Header as="h4">What did this jerk do? </Header>
                  {this.props.grudge.incident}
                </Modal.Content>
              </Grid.Column>
              <Grid.Column>
                <Modal.Content>
                  <Image

                    wrapped
                    size="medium"
                    floated="right"
                    src={this.props.images
                      .filter(
                        image => image.id === this.props.grudge.pettyLevel
                      )
                      .map(image => image.url)}
                  />
                </Modal.Content>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Classy Insult for a rotten Person:</Header>
                <Container fluid>
                  <em>"{this.props.grudge.insult}"</em>
                  <MailInsult {...this.props} grudge={this.props.grudge} />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
  }
}
