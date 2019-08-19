import React, { Component } from 'react'
import { Card, Icon, Image, Header, Dimmer } from "semantic-ui-react";
import PastGrudgeDetailsModal from "./PastGrudgeDetailsModal";
import "./pastGrudgeCard.css"

export default class PastGrudgeCard extends Component {
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
        <PastGrudgeDetailsModal grudge={this.props.grudge} grudgeDate={this.grudgeDate} {...this.props} />
      </div>
    )
    return (
      <Card  key={this.props.grudge.id} style={{ 'width': 250, 'padding': 3, 'marginRight': 100, 'marginTop': 100, 'marginBottom': 50, 'backgroundColor': '#5cdb95' }} centered raised>
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
        <Dimmer.Dimmable circular className = "grayscale"
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

        <Card.Content   textAlign="center" extra className="card-footer">
          GRUDGE RESOLVED
        </Card.Content>
      </Card>
    );

  }
}
