import React, { Component } from "react";
import {
  Container,
  Confirm,
  Button,
  Header,
  Image,
  Modal,
  Grid,
  Segment
} from "semantic-ui-react";
import "./grudgeDetail.css";
import ConfirmGrudgeJoin from "./../users/ConfirmGrudgeJoin"

export default class GrudgeDetailsModal extends Component {
  state = { open: false };

  //functions to show Confirm box upon clicking button to delete grudge
  show = () => this.setState({ open: true });

  //checks with user before deleting grudge from DB
  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteItem("grudges", this.props.grudge.id);
  };
  //if user decides to cancel delete on confirm, confirm closed and user brought back to details Modal
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  render() {
    console.log("Is this grudge resolved", this.props);
    const { open } = this.state;
    if (
      this.props.grudge.isResolved === false &&
      this.props.grudge.userId === +sessionStorage.getItem("activeUser")
    ) {
      return (
        <Modal trigger={<Button primary>Details</Button>}>
          <Grid columns={3} divided padded textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <Modal.Content>
                  <Header as="h4">Grudging Since: </Header>
                  {this.props.grudge.date}
                </Modal.Content>
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">{this.props.grudge.enemyName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                  onClick={() => {
                    console.log(this.props);
                    this.props.history.push(`/edit/${this.props.grudge.id}`);
                  }}
                >
                  Edit Grudge
                </Button>
                <div>
                  <Button onClick={this.show}>Delete Grudge</Button>
                  <Confirm
                    open={open}
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
                  <Header as="h4">What did this motherfucker do? </Header>
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
                  <Button size="tiny" floated="right">
                    Escalate Things
                  </Button>
                </Container>
                <Segment clearing>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Container fluid>
                        <p>This is the generated insult</p>
                      </Container>
                    </Grid.Column>
                    <Grid.Column>
                      <Button floated="right" size="mini">
                        Get New Insult
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
    } else if (
      this.props.grudge.isResolved === true &&
      this.props.grudge.userId === +sessionStorage.getItem("activeUser")
    ) {
      return (
        <Modal trigger={<Button primary>Details</Button>}>
          <Grid columns={3} divided padded textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <Modal.Content>
                  <Header as="h4">Grudging Since: </Header>
                  {this.props.grudge.date}
                </Modal.Content>
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">{this.props.grudge.enemyName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                  onClick={() => {
                    console.log(this.props);
                    this.props.history.push(`/edit/${this.props.grudge.id}`);
                  }}
                >
                  Edit Grudge
                </Button>
                <div>
                  <Button onClick={this.show}>Delete Grudge</Button>
                  <Confirm
                    open={open}
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
                  <Header as="h4">What did this motherfucker do? </Header>
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
                  <Button size="tiny" floated="right">
                    Escalate Things
                  </Button>
                </Container>
                <Segment clearing>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Container fluid>
                        <p>This is the generated insult</p>
                      </Container>
                    </Grid.Column>
                    <Grid.Column>
                      <Button floated="right" size="mini">
                        Get New Insult
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
    } else if (
      this.props.grudge.userId !== +sessionStorage.getItem("activeUser")
    ) {
      return (
        <Modal trigger={<Button primary>Details</Button>}>
          {this.props.grudges
            .filter(grudge => grudge.id === this.props.grudge.id)
            .map(grudge => (
              <Grid key = {grudge.id} columns={3} divided padded textAlign="center">
                <Grid.Row>
                  <Grid.Column>
                    <Modal.Content>
                      <Header as="h4">Grudge Held Since: </Header>
                      {grudge.date.split("-")[1]}/{grudge.date.split("-")[2]}/{grudge.date.split("-")[0]}
                    </Modal.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">{grudge.enemyName}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">A grudge from {grudge.user.username}</Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column verticalAlign="middle">
                    <Modal.Content>
                      <Header as="h4">What This Jerk Did: </Header>
                      {grudge.incident}
                    </Modal.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Modal.Content>
                      <Image
                        wrapped
                        size="medium"
                        // floated="right"
                        src={this.props.images
                          .filter(
                            image => image.id === grudge.pettyLevel
                          )
                          .map(image => image.url)}
                      />
                    </Modal.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Container fluid />

                      <Grid columns={2}>
                        <Grid.Column />
                        <Grid.Column>

                            <em>"{grudge.insult}"</em>
                            <ConfirmGrudgeJoin bigGrudge={grudge}{...this.props}/>

                        </Grid.Column>
                      </Grid>

                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ))}
        </Modal>
      );
    }
  }
}
