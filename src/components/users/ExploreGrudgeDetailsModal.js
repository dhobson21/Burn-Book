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
// import "./grudgeDetail.css";
import ConfirmGrudgeJoin from "./ConfirmGrudgeJoin"

export default class ExploreGrudgeDetailsModal extends Component {
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
  show = () => this.setState({ open: true });
  hide = () => this.setState({ open: false });

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
            This grudge by {this.props.grudge.user.username} has a pettiness level of <p className="pettyNumb">
            <b>
            {this.props.grudge.pettyLevel}
            </b>

            </p>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column verticalAlign="middle">
              <Modal.Content>
                <Header as="h4">What happened? </Header>
                {this.props.grudge.incident}
              </Modal.Content>
            </Grid.Column>
            <Grid.Column>
              <Modal.Content>
                {/* <Image
                  wrapped
                  size="medium"
                  floated="right"
                  src={this.props.images
                    .filter(
                      image => image.id === this.props.grudge.pettyLevel
                    )
                    .map(image => image.url)}
                /> */}
              </Modal.Content>
            </Grid.Column>
            <Grid.Column stretched>
              <Header as="h4">{this.props.grudge.user.username} thinks {this.props.grudge.enemyName} is:</Header>
              <Container textAlign='center' >
                <em>" a {this.props.grudge.insult}"</em>


              </Container>
                   <ConfirmGrudgeJoin  grudge={this.props.grudge} {...this.props} addSharedGrudge= {this.props.addSharedGrudge} updateGrudge={this.props.updateGrudge} />







            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal>
    );
  }
}
