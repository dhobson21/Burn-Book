import React, { Component } from "react";
import {
  Container,
  Confirm,
  Button,
  Header,
  Image,
  Modal,
  Grid,
} from "semantic-ui-react";
import MailCompliment from "./../email/MailCompliment"


export default class PastGrudgeDetailsModal extends Component {
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





  //functions to show Confirm box upon clicking button to delete grudge
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  //checks with user before deleting grudge from DB
  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteGrudge(this.props.grudge.id);
  };
  handleJoin = () => {
    this.setState({ open: false })
    console.log("This button works")
    // this.props.createSharedGrudge(grudge)
    // this.props.history.push("/explore")
  }
  //if user decides to cancel delete on confirm, confirm closed and user brought back to details Modal
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  render() {
    return (
      <Modal size='fullscreen'trigger={<Button primary>Details</Button>}>
        <Grid columns={4} divided padded textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Modal.Content>
                <Header as="h4">Grudge started: </Header>
                {this.props.grudgeDate()}
                <Header as="h4">Pride Swallowed: </Header>
                {this.props.grudge.resolvedGrudges[0].date}
              </Modal.Content>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">{this.props.grudge.enemyName}</Header>
            </Grid.Column>
            <Grid.Column>
            <Header as="h4">My level of pettiness in this grudge:  <b>{this.props.grudge.pettyLevel}</b></Header>
            <div>
                <Button onClick={this.open}>Delete Grudge</Button>
                <Confirm
                  open={this.state.open}
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                  content="Are you sure you want to delete this grudge?"
                />
              </div>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column verticalAlign="middle">
              <Modal.Content >
                <Header  textAlign='left' as="h4">What was the misunderstanding ? </Header>
                <Container  fluid text={true} textAlign='center'>{this.props.grudge.incident}</Container>
                <Header  textAlign='left' as="h4">What made you resolve this grudge? </Header>
                <Container fluid text={true} textAlign='center'>{this.props.grudge.resolvedGrudges[0].resolveReason}</Container>

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
              <Modal.Content>
              <Header as="h4">What i've come to realize about {this.props.grudge.enemyName}: </Header>
              {this.props.grudge.resolvedGrudges[0].compliment}
              </Modal.Content>
             <MailCompliment {...this.props} grudge={this.props.grudge}/>
            </Grid.Column>
            </Grid.Row>
            </Grid>
      </Modal>
    );
  }
}
