import React, { Component } from 'react'
import { Card, Icon, Image, Header, Dimmer } from "semantic-ui-react";
import ExploreGrudgeDetailsModal from "./ExploreGrudgeDetailsModal";

export default class ExploreGrudgeCard extends Component {
  state = {};



  c

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
    console.log("card props", this.props)
    const { active } = this.state;
    const content = (
      <div>
        <Header as="h2" inverted>
          {this.props.grudge.enemyName}
        </Header>
        <ExploreGrudgeDetailsModal grudge={this.props.grudge} grudgeDate={this.grudgeDate} {...this.props} />
      </div>
    );
    return (
      <Card className="card" key={this.props.grudge.id} style={{ 'width': 250, 'height': 300, 'padding': 3, 'margin': 2, 'backgroundColor': '#e25822' }}>
       {/* style={{ 'width': 250, 'padding': 3, 'marginRight': 100, 'marginTop': 100, 'marginBottom': 50, */}
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
  }
}
