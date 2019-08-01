import React, { Component } from "react";
import {
  Checkbox,
  Container,
  Button,
  Header,
  Image,
  Input,
  Modal,
  Grid,
  Segment
} from "semantic-ui-react";
import "./grudgeDetail.css";

export default class EditGrudgeModal extends Component {
  render() {
    return (
      <Modal trigger={<Button primary>Edit Grudge</Button>}>
        <Grid columns={3} divided padded textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Modal.Content textAlign="center">
                <Header as="h4">Grudging Since: </Header>
                <Input
                  value= {this.props.grudge.date}
                />
              </Modal.Content>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                {/* {this.props.grudge.enemyName} */}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Button>Edit Grudge</Button>
              <Checkbox label={{ children: "Resolve Grudge" }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column verticalAlign="middle">
              <Modal.Content textAlign="center">
                <Header as="h4">What did this motherfucker do? </Header>
                {/* {this.props.grudge.incident} */}
              </Modal.Content>
            </Grid.Column>
            <Grid.Column>
              <Modal.Content>
                {/* <Image
                  wrapped
                  size="medium"
                  floated="right"
                  src={this.props.images
                    .filter(image => image.id === this.props.grudge.pettyLevel)
                    .map(image => image.url)}
                /> */}
              </Modal.Content>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">Classy Insult for a rotten Person:</Header>
              <Container fluid padded>
                {/* <em>"{this.props.grudge.insult}"</em> */}
                <Button comapct size="tiny" floated="right">
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
  }
}
