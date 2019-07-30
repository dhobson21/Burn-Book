import React, { Component } from 'react'
import { Card, Image, Button, Header, Dimmer} from 'semantic-ui-react'
import "./grudgeCard.css"


export default class GrudgeCard extends Component {
  state = {}


  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const content =  (
      <div>
        <Header as='h2' inverted>
          {this.props.grudge.enemyName}
        </Header>

        <Button primary>Details</Button>

      </div>
    )
    return (
      <Card key={this.props.grudge.id}>
      <Card.Content>
        <Card.Header >
          <div className="card-header">
            {this.props.grudge.enemyName}
            <div className="icon">{this.props.sharedGrudge(this.props.grudge)}</div>
          </div>
        </Card.Header>
        <Card.Meta>
          {this.props.grudge.insult}
        </Card.Meta>
      </Card.Content>
        <Dimmer.Dimmable key={`image-${this.props.grudge.id}`}
          as= {Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          size='medium'
          src={this.props.images.filter(image => image.id ===this.props.grudge.pettyLevel).map(image => image.url)}
        />
        <Card.Description>
          {this.props.grudge.incident}
        </Card.Description>
      <Card.Content extra className="card-footer">
        <p>{this.props.grudge.date}</p>
      </Card.Content>
    </Card>
    )
  }
}
