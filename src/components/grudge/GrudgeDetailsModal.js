import React, { Component } from "react";
import {
  Container,
  Confirm,
  Button,
  Header,
  Image,
  Modal,
  Grid,
  Form
} from "semantic-ui-react";
import "./grudgeDetail.css";
import ConfirmGrudgeJoin from "./../users/ConfirmGrudgeJoin"
import APIManager from "./../../modules/APIManager"


export default class GrudgeDetailsModal extends Component {
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



  createSharedGrudge = (grudge) => {
    const newState = {}
    const trueShared = {shared: true,
     enemyName: grudge.enemyName,
    date: grudge.date,
    email: grudge.email,
    insult: grudge.insult,
    incident: grudge.incident,
    pettyLevel: grudge.pettyLevel,
    userId: grudge.userId,
    isResolved: grudge.isResolved,
    id: grudge.id
    }
     newState["grudgeId"]= grudge.id
     newState.userId = +sessionStorage.getItem("activeUser")

     this.props.addSharedGrudge(newState)
     this.updateGrudgeShare(trueShared )
     .then(() => this.props.getAndUpdateState())
     .then(() => this.props.history.push("/explore"))

   }
   updateGrudgeShare = (obj) => {
    let newObj={}
    return APIManager.put("grudges", obj)
    .then(() => APIManager.getAll("sharedGrudges"))
    .then(item => {
      newObj["sharedGrudges"] = item
      this.setState(newObj)
    })

  }

  //functions to show Confirm box upon clicking button to delete grudge
  show = () => this.setState({ open: true });
  hide = () => this.setState({ open: false });

  //checks with user before deleting grudge from DB
  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteGrudge(this.props.grudge.id);
  };
  //if user decides to cancel delete on confirm, confirm closed and user brought back to details Modal
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  render() {
    const { open } = this.state;
    //If grudge belongs to active user, is not resolved (active grudges), and is not shared render this: DONE
    if (
      ((!this.props.grudge.isResolved) &&
      (this.props.grudge.userId === +sessionStorage.getItem("activeUser")))

    ) {
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      );
      //grudge belongs to user, is not resolved, and is shared
  // }
  // else if (!this.props.grudge.isResolved &&
  // this.props.grudge.userId === activeUser && this.props.grudge.shared)
  // {
  //   return (
  //     <Modal  size='fullscreen' trigger={<Button primary>Details</Button>}>
  //       <Grid columns={4} divided padded textAlign="center">
  //         <Grid.Row>
  //           <Grid.Column>
  //             <Modal.Content>
  //               <Header as="h4">Grudging Since: </Header>
  //               {this.props.grudgeDate()}
  //             </Modal.Content>
  //           </Grid.Column>
  //           <Grid.Column>
  //             <Header as="h2">{this.props.grudge.enemyName} ACTIVE GRUDGES I START AND SHARE</Header>
  //           </Grid.Column>
  //           <Grid.Column>
  //             Grudge shared with:
  //             {this.props.sharedGrudges.filter(g => g.grudgeId === this.props.grudge.id).map(sg => <p key={sg.user.id}>{sg.user.username}</p>)}
  //           </Grid.Column>
  //           <Grid.Column>
  //             <Button
  //               onClick={() => {

  //                 this.props.history.push(`/edit/${this.props.grudge.id}`);
  //               }}
  //             >
  //               Edit Grudge
  //             </Button>
  //             <div>
  //               <Button onClick={this.show}>Delete Grudge</Button>
  //               <Confirm
  //                 open={open}
  //                 onCancel={this.handleCancel}
  //                 onConfirm={this.handleConfirm}
  //                 content="Are you sure you want to delete an Unresolved grudge?"
  //               />
  //             </div>
  //           </Grid.Column>
  //         </Grid.Row>
  //         <Grid.Row>
  //           <Grid.Column verticalAlign="middle">
  //             <Modal.Content>
  //               <Header as="h4">What injustice did I suffer? </Header>
  //               {this.props.grudge.incident}
  //             </Modal.Content>
  //           </Grid.Column>
  //           <Grid.Column>
  //             <Modal.Content>
  //               <Image
  //                 wrapped
  //                 size="medium"
  //                 floated="right"
  //                 src={this.props.images
  //                   .filter(
  //                     image => image.id === this.props.grudge.pettyLevel
  //                   )
  //                   .map(image => image.url)}
  //               />
  //             </Modal.Content>
  //           </Grid.Column>
  //             <Grid.Column>
  //             <Header as="h4">
  //              Chat with {this.props.sharedGrudges.filter(g => g.grudgeId === this.props.grudge.id).map(sg => <div key={sg.user.id}className="chatName">{sg.user.username}</div>)}</Header>
  //               <Form.Input/>
  //               <div className="FixedHeightContainer">
  //               <h4>Messages</h4>
  //               <div className="Content"><p>blah</p> <p>blah</p> <p>blah</p> <p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p></div>
  //               </div>
  //             </Grid.Column>
  //             <Grid.Column>
  //             <Header as="h4">Classy Insult for a rotten Person:</Header>
  //             <Container fluid>
  //               <em>"{this.props.grudge.insult}"</em>
  //               <Button size="tiny" floated="right">
  //                 Escalate Things
  //               </Button>
  //             </Container>
  //             </Grid.Column>

  //         </Grid.Row>
  //       </Grid>
  //     </Modal>
  //   );
  } else if((this.props.grudge.userId !== +sessionStorage.getItem("activeUser") && !this.props.grudge.isResolved) && ((!this.props.grudge.shared) || (this.props.grudge.shared && this.props.grudge.sharedGrudges.forEach(grudge => grudge.userId !== +sessionStorage.getItem("activeUser")))))

  {
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
            <Grid.Column stretched>
              <Header as="h4">{this.props.grudge.user.username} thinks {this.props.grudge.enemyName} is:</Header>
              <Container textAlign='center' >
                <em>" a {this.props.grudge.insult}"</em>


              </Container>
              <Container >


                <ConfirmGrudgeJoin  createSharedGrudge={this.createSharedGrudge} floated="right" className="join"  hide={this.hide} grudge={this.props.grudge}{...this.props}/>

              </Container>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal>
    );

  //took this out, need to still filter by if user is shared on grudge already
  //&& this.props.grudge.sharedGrudges.forEach(grudge => grudge.userId === +sessionStorage.getItem("activeUser)


  //if grudge belongs to +sessionStorage.getItem("activeUserr, and is resolved (past grudges), render this: DONE
  } else if (
      this.props.grudge.isResolved === true && this.props.grudge.userId === +sessionStorage.getItem("activeUser")     ) {
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
                  <Button onClick={this.show}>Delete Grudge</Button>
                  <Confirm
                    open={open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={!this.props.grudge.isResolved ? "Are you sure you want to delete an Unresolved grudge?" : "Think of something funny here"}
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
                <Button>Spread Goodwill</Button>
              </Grid.Column>
              </Grid.Row>
              </Grid>
        </Modal>
      );

      //if grudge does not belong to user and is not shared with user (EXPLORE GRUDGES)
    } else {
      // return (
      //   <Modal trigger={<Button primary>Details</Button>}>
      //     {this.props.expandGrudges
      //       .filter(grudge => grudge.id === this.props.grudge.id)
      //       .map(grudge => (
      //         <Grid key = {grudge.id} columns={3} divided padded textAlign="center">
      //           <Grid.Row>
      //             <Grid.Column>
      //               <Modal.Content>
      //                 <Header as="h4">Grudge Held Since: </Header>
      //                 {this.props.grudgeDate()}
      //               </Modal.Content>
      //             </Grid.Column>
      //             <Grid.Column>
      //               <Header as="h2">{grudge.enemyName} ELSE RETURN </Header>
      //             </Grid.Column>
      //             <Grid.Column>
      //               <Header as="h3">A grudge from {grudge.user.username}</Header>
      //             </Grid.Column>
      //           </Grid.Row>
      //           <Grid.Row>
      //             <Grid.Column verticalAlign="middle">
      //               <Modal.Content>
      //                 <Header as="h4">What This Jerk Did to {grudge.user.username}: </Header>
      //                 {grudge.incident}
      //               </Modal.Content>
      //             </Grid.Column>
      //             <Grid.Column>
      //               <Modal.Content>
      //                 <Image
      //                   wrapped
      //                   size="medium"
      //                   // floated="right"
      //                   src={this.props.images
      //                     .filter(
      //                       image => image.id === grudge.pettyLevel
      //                     )
      //                     .map(image => image.url)}
      //                 />
      //               </Modal.Content>
      //             </Grid.Column>
      //             <Grid.Column>
      //               <Container fluid />

      //                 <Grid columns={2}>
      //                   <Grid.Column />
      //                   <Grid.Column>

      //                       <em>"{grudge.insult}"</em>
      //                       yo
      //                       <ConfirmGrudgeJoin hide={this.hide} grudge={grudge}{...this.props}/>

      //                   </Grid.Column>
      //                 </Grid>

      //             </Grid.Column>
      //           </Grid.Row>
      //         </Grid>
      //       ))}
      //   </Modal>
      // );
    }
  }
}




////MESSAGE GRIDGE FOR SHARED DETAILS MODAL

// {
//   return (
//     <Modal  size='fullscreen' trigger={<Button primary>Details</Button>}>
//       <Grid columns={4} divided padded textAlign="center">
//         <Grid.Row>
//           <Grid.Column>
//             <Modal.Content>
//               <Header as="h4">Grudging Since:</Header>
//               {this.props.grudgeDate()}
//             </Modal.Content>
//           </Grid.Column>
//           <Grid.Column>
//             <Header as="h2">{this.props.grudge.enemyName} th</Header>
//           </Grid.Column>
//           <Grid.Column>
//             Grudge shared with:
//             {this.props.sharedGrudges.filter(g => g.grudgeId === this.props.grudge.id).map(sg => <p key={sg.user.id}>{sg.user.username}</p>)}
//           </Grid.Column>
//           <Grid.Column>
//             <Button
//               onClick={() => {

//                 this.props.history.push(`/edit/${this.props.grudge.id}`);
//               }}
//             >
//               Edit Grudge
//             </Button>
//             <div>
//               <Button onClick={this.show}>Delete Grudge</Button>
//               <Confirm
//                 open={open}
//                 onCancel={this.handleCancel}
//                 onConfirm={this.handleConfirm}
//                 content="Are you sure you want to delete an Unresolved grudge?"
//               />
//             </div>
//           </Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column verticalAlign="middle">
//             <Modal.Content>
//               <Header as="h4">What injustice did I suffer? </Header>
//               {this.props.grudge.incident}
//             </Modal.Content>
//           </Grid.Column>
//           <Grid.Column>
//             <Modal.Content>
//               <Image
//                 wrapped
//                 size="medium"
//                 floated="right"
//                 src={this.props.images
//                   .filter(
//                     image => image.id === this.props.grudge.pettyLevel
//                   )
//                   .map(image => image.url)}
//               />
//             </Modal.Content>
//           </Grid.Column>
//             <Grid.Column>
//             <Header as="h4">
//              Chat with {this.props.sharedGrudges.filter(g => g.grudgeId === this.props.grudge.id).map(sg => <div key={sg.user.id}className="chatName">{sg.user.username}</div>)}</Header>
//               <Form.Input/>
//               <div className="FixedHeightContainer">
//               <h4>Messages</h4>
//               <div className="Content"><p>blah</p> <p>blah</p> <p>blah</p> <p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p><p>blah</p></div>
//               </div>
//             </Grid.Column>
//             <Grid.Column>
//             <Header as="h4">Classy Insult for a rotten Person:</Header>
//             <Container fluid>
//               <em>"{this.props.grudge.insult}"</em>
//               <Button size="tiny" floated="right">
//                 Escalate Things
//               </Button>
//             </Container>
//             </Grid.Column>

//         </Grid.Row>
//       </Grid>
//     </Modal>
//   );