import React, { Component } from 'react'
import {  Menu, Segment } from 'semantic-ui-react'
import {withRouter } from "react-router"

class NavBar extends Component {
  state = { activeItem: 'my grudges' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/${e.target.id}`)

  }

  //clear session storage on log out to take away nav bar
  logout = () => {
    sessionStorage.clear()
   window.location.reload()

}



  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='my grudges'
            active={activeItem === 'my grudges'}
            onClick={this.handleItemClick}

          />
          <Menu.Item
            name='add grudge'
            id="add"
            active={activeItem === 'add grudge'}
            onClick={this.handleItemClick}


          />
          <Menu.Item
            name='past grudges'
            id="past"
            active={activeItem === 'past grudges'}
            onClick={this.handleItemClick}

          />
          <Menu.Item
            name='explore grudges'
            id="explore"
            active={activeItem === 'explore grudges'}
            onClick={this.handleItemClick}

          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              id="login"
              active={activeItem === 'logout'}
              onClick={this.logout}

            />
          </Menu.Menu>
        </Menu>

        {/* <Segment>
          <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' alt="this" />
        </Segment> */}
      </div>
    )
  }
}

export default withRouter(NavBar)