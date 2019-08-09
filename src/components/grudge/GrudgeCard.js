import React, { Component } from "react";
import { Card, Icon, Image, Header, Dimmer } from "semantic-ui-react";
import "./grudgeCard.css";
import GrudgeDetailsModal from "./GrudgeDetailsModal";
// import { userInfo } from "os";


export default class GrudgeCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  sharedGrudge = (grudge) => {
    if (grudge.shared !== false) {
      return <Icon name="users" />;
    }
  };

  grudgeDate = () => {
    let dateArr = this.props.grudge.date.split("-");
    const date = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    return date;
  };



  render() {
    const { active } = this.state;
    const content = (
      <div>
        <Header as="h2" inverted>
          {this.props.grudge.enemyName}
        </Header>
        <GrudgeDetailsModal grudge={this.props.grudge} grudgeDate={this.grudgeDate} {...this.props} />
      </div>
    );
    //if grudge belongs to logged in user and is not resolved, OR has a shared grduge userID of logged in user (active grudges), render this:
    if  (this.props.grudge.userId === +sessionStorage.getItem("activeUser") &&
      !this.props.grudge.isResolved) {
      return (
        <Card  className="card"  color= 'red'    centered raised key={this.props.grudge.id}>
          <Card.Content>
            <Card.Header>
              <div className="card-header">
                {this.props.grudge.enemyName}
                <div className="icon">
                  {this.sharedGrudge(this.props.grudge)}
                </div>
              </div>
            </Card.Header>
            <Card.Meta>{this.props.grudge.insult}</Card.Meta>
          </Card.Content>
          <div className="img">
          <Dimmer.Dimmable
            key={`image-${this.props.grudge.id}`}
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            size="medium"
            src={this.props.images
              .filter(image => image.id === this.props.grudge.pettyLevel)
              .map(image => image.url)}
          />
          </div>
          <Card.Description>{this.props.grudge.incident}</Card.Description>

          <Card.Content extra className="card-footer">
            {this.grudgeDate()}
          </Card.Content>
        </Card>
      );
      //if grudge belongs to user and is resolved (past grudges), render this:
    } else if (
      this.props.grudge.userId === +sessionStorage.getItem("activeUser") &&
      this.props.grudge.isResolved
    ) {
      return (
        <Card key={this.props.grudge.id}>
          <Card.Content>
            <Card.Header >
              <div className="card-header">
                {this.props.grudge.enemyName}
                <div className="icon">
                  {this.sharedGrudge(this.props.grudge)}
                </div>
              </div>
            </Card.Header>
            <Card.Meta>{this.props.grudge.resolvedGrudges[0].compliment}</Card.Meta>
          </Card.Content>
          <Dimmer.Dimmable circular
            key={`image-${this.props.grudge.id}`}
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            size="medium"
            src={this.props.images
              .filter(image => image.id === this.props.grudge.pettyLevel)
              .map(image => image.url)}
          />

          <Card.Content extra className="card-footer">
            GRUDGE RESOLVED
          </Card.Content>
        </Card>
      );

    }
    //if grudge does not belong to logged in user and user is not the joined ID in shared grudge (does not share with primary grudge holder), render this: FOR EXPLORE GRUDGES
    else if ((!this.props.grudge.shared) ||  this.props.grudge.sharedGrudges.forEach (grudge => {

        if(grudge.userId !== +sessionStorage.getItem("activeUser")) {
         return true
        }
      }))
     {
      return (
        <Card key={this.props.grudge.id}>
          <Card.Content textAlign="center">
            <Card.Header textAlign="center">
             {this.props.grudge.enemyName}
            </Card.Header>

            Grudging since: {this.grudgeDate()}

          </Card.Content>
          <Dimmer.Dimmable
            key={`image-${this.props.grudge.id}`}
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            size="medium"
            src={this.props.images
              .filter(image => image.id === this.props.grudge.pettyLevel)
              .map(image => image.url)}
          />
          Petty Level: {this.props.grudge.pettyLevel}
        </Card>
      );
      //OR NOTHING
    }
    else{return null}
    }
}
