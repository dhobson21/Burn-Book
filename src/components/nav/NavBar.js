import React, { Component } from 'react'
import {  Menu, Segment } from 'semantic-ui-react'
import { NavLink } from "react-router-dom"

export default class NavBar extends Component {
  state = { activeItem: 'my grudges' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })

  }

  //clear session storage on log out to take away nav bar
  logout = () => {
    sessionStorage.clear()
}


  render() {
    const { activeItem } = this.state
    console.log(activeItem)
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='my grudges'
            active={activeItem === 'my grudges'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/"
          />
          <Menu.Item
            name='add grudge'
            active={activeItem === 'add grudge'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/add"

          />
          <Menu.Item
            name='past grudges'
            active={activeItem === 'past grudges'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/past"
          />
          <Menu.Item
            name='explore grudges'
            active={activeItem === 'explore grudges'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/users"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.logout}
              as={NavLink}
            to="/login"
            />
          </Menu.Menu>
        </Menu>

        <Segment>
          <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' alt="this" />
        </Segment>
      </div>
    )
  }
}
