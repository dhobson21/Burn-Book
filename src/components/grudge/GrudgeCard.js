import React, { Component } from "react";
import { Card, Icon, Image, Header, Dimmer } from "semantic-ui-react";
import "./grudgeCard.css";
import GrudgeDetailsModal from "./GrudgeDetailsModal";

export default class GrudgeCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  sharedGrudge = (grudge) => {
    if (grudge.shared !== false) {
      return <Icon name="users"></Icon>
    }
  }
  grudgeDate = () => {

    let dateArr = this.props.grudge.date.split ("-")
    console.log(dateArr)
    const date = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
    return date
  }
  render() {
    this.grudgeDate()
    const { active } = this.state;
    const content = (
      <div>
        <Header as="h2" inverted>
          {this.props.grudge.enemyName}
        </Header>
        <GrudgeDetailsModal
          grudge={this.props.grudge}
          images={this.props.images}
          {...this.props}
        />
      </div>
    );
    return (
      <Card key={this.props.grudge.id}>
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
        <Card.Description>{this.props.grudge.incident}</Card.Description>
        <Card.Content extra className="card-footer">
          {this.grudgeDate()}
        </Card.Content>
      </Card>
    );
  }
}
