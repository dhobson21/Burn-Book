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
import "./activeGrudgeDetails.css"

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
    if (this.props.grudge.userId ===+sessionStorage.getItem("activeUser")) {

      return (
        <Modal trigger={<Button primary>Details</Button>} style={{'backgroundColor': '#e34234', 'borderRadius': 50}}>
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
                  color='grey'
                  onClick={() => {
                    this.props.clearInsult(this.props.insult)
                    this.props.history.push(`/edit/${this.props.grudge.id}`);
                  }}
                >
                  Edit Grudge
                </Button>
                <div className='deletebtn'>
                  <Button color='grey' onClick={this.open}>Delete Grudge</Button>
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
                  <Header as="h4"> What did {this.props.grudge.enemyName} do to me? </Header>

                  <p>

                  {this.props.grudge.incident}
                  </p>
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
              <Grid.Column verticalAlign='middle'>
                <Header as="h4">{this.props.grudge.enemyName} is a:</Header>
                <Container fluid>
                  <em>"{this.props.grudge.insult}"</em>
                  <div>

                  <MailInsult  {...this.props} grudge={this.props.grudge} />
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
    } else {
      return (
        <Modal trigger={<Button primary>Details</Button>} style={{'backgroundColor': '#e25822', 'borderRadius': 50}}>
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
              Grudge Owner: <b>{this.props.grudge.user.username}</b>
               <p style={{'marginTop': 10}}>

            Pettiness level:
            <b className='round'>
            {this.props.grudge.pettyLevel}
            </b>
               </p>


              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign="middle">
                <Modal.Content>
                  <Header as="h4">What {this.props.grudge.enemyName} did to {this.props.grudge.user.username}?</Header>
                  <p>

                  {this.props.grudge.incident}
                  </p>
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
              <Grid.Column verticalAlign='middle'>
                <Header as="h4">{this.props.grudge.user.username} thinks {this.props.grudge.enemyName} is a:</Header>
                <Container fluid>
                  <b>"{this.props.grudge.insult}"</b>
                  <MailInsult {...this.props} grudge={this.props.grudge} />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
    }
    }
}
