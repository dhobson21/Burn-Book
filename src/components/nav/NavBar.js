import React, { Component } from 'react'
import {  Menu, Container } from 'semantic-ui-react'
import {withRouter } from "react-router"
import "./navbar.css"
import logo from "./../img/BBLogo.png"

class NavBar extends Component {
  state = { activeItem: 'my grudge' }

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

      <Menu    inverted pointing style={{'backgroundColor': '#292930', 'marginBottom': 0}}>
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
        <Container fluid textAlign='center' style={{'backgroundColor': '#303029', 'margin': '0px','borderRadius': '0%'}}>
          <img  src={logo} alt='logo'/>
        </Container>

        </div>

    )
  }
}

export default withRouter(NavBar)