import React, { Component } from 'react'
import {  Menu, Segment } from 'semantic-ui-react'
import { NavLink } from "react-router-dom"
import {withRouter} from "react-router"

class NavBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    console.log(e.target.id)
    this.setState({ activeItem: name })

  }

  //clear session storage on log out to take away nav bar
  logout = () => {
    sessionStorage.clear()
}


  render() {
    const { activeItem } = this.state
    console.log(activeItem)
    console.log(this.props.history)

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='my grudges'
            active={this.state.activeItem === 'my grudges'}
            onClick={this.handleItemClick}
            id="/"
          />
          <Menu.Item
            name='add grudge'
            id="add"
            active={this.state.activeItem === 'add grudge'}
            onClick={this.handleItemClick}


          />
          <Menu.Item
            name='past grudges'
            id="past"
            active={this.state.activeItem === 'past grudges'}
            onClick={this.handleItemClick}

          />
          <Menu.Item
            name='explore grudges'
            id="explore"
            active={this.state.activeItem === 'explore grudges'}
            onClick={this.handleItemClick}

          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              id="logout"
              active={this.state.activeItem === 'logout'}
              onClick={this.logout}

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

export default withRouter(NavBar)