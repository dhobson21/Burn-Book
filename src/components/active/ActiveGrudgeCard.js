import React, { Component } from 'react'
import { Card, Image, Icon, Header, Dimmer } from "semantic-ui-react";
import ActiveGrudgeDetailsModal from "./ActiveGrudgeDetailsModal";

export default class ActiveGrudgeCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false })

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
        <ActiveGrudgeDetailsModal grudge={this.props.grudge} grudgeDate={this.grudgeDate} {...this.props} />
      </div>
    );

      return (
        <Card    className= "sqr" color= 'red' style={{ 'width': 250, 'padding': 3, 'margin': 2, 'backgroundColor': '#eeeeee' }}   centered raised key={this.props.grudge.id}>
          <Card.Content className="container">
            <Card.Header  textAlign= "center">
              <div >
                {this.props.grudge.enemyName}
                <div className="icon">
                  {this.sharedGrudge(this.props.grudge)}
                </div>
              </div>
            </Card.Header >
            <Card.Meta style={{'color': 'red'}} textAlign='center'>{this.props.grudge.insult}</Card.Meta>
          </Card.Content>
          <div className="crop">
          <Dimmer.Dimmable className="img"
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
          <Card.Description textAlign='center'>{this.props.grudge.incident}</Card.Description>

          <Card.Content textAlign='center' extra className="card-footer">
            {this.grudgeDate()}
          </Card.Content>
        </Card>
      );
  }

}

