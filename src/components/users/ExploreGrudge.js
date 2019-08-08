import React, { Component } from 'react'
import {Header, Divider, Container} from "semantic-ui-react"
import { CarouselProvider, Slider, ButtonBack, ButtonNext, Slide} from "pure-react-carousel";

import "./exploreGrudges.css"
import CustomCardSlide from "./CustomCardSlide"
import GrudgeCard from "../grudge/GrudgeCard"
import 'pure-react-carousel/dist/react-carousel.es.css';

const activeUser = +sessionStorage.getItem("activeUser")

export default class ExploreGrudges extends Component {
  state = {
        grudgeId: "",
        userId: activeUser,
        open: false,
        expandGrudges: [],
        users: []


      }



componentDidMount(){

  this.setState({users: this.props.users})
  console.log("explore did mount")
  let exploreGrudges= []
 this.props.expandGrudges.forEach(grudge => !grudge.shared ? exploreGrudges.push(grudge) : {})

 this.props.expandGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
  let notMe = true
  oneGrudge.sharedGrudges.forEach(g => {
    if(g.userId === activeUser) {
      notMe=false
    }

  })
  if(notMe===true) {exploreGrudges.push(oneGrudge)}

 })
 console.log("expArr", exploreGrudges)
this.setState({expandGrudges: exploreGrudges})
console.log("exploreState", this.state)
console.log("users", this.props.users)

}

findAvg = (user) => {
  const levels = []
  user.grudges.forEach( grudge => levels.push(grudge.pettyLevel)

  )
  console.log("levels". levels)
}


filterSharedGrudges(){
  const newState ={}
  this.props.expandGrudges.forEach(grudge => {
    if (!grudge.shared || (grudge.sharedGrudges.for)) {return grudge}
  }
  )
  console.log("newState", newState)
}


  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false })
  handleCancel = () => this.setState({ open: false })
     notShared = []
  render() {

    console.log("Explore Grudges state", this.state)
    console.log("Explore Grudges props ", this.props)
    return (
      <React.Fragment>
        <Header size="huge" textAlign="center">Other Petty People</Header>
          {
        this.state.users.map(user =>
          <div key={user.id} >
          <Header size="large" textAlign="center">{user.username}'s Grudges</Header>
          <div className="users">

          <Container floater='right'>

            </Container>

          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={user.grudges.length}
            style={{ width: "250px", height: "auto" }}
                >
          <Slider>
          {
              this.state.expandGrudges.filter(grudge => grudge.userId ===user.id).map(grudge=>

              <CustomCardSlide index={user.grudges.indexOf(grudge)} key={grudge.id}>  <GrudgeCard  grudge={grudge} images ={this.props.images} {...this.props}/></CustomCardSlide>


            )
          }

    </Slider>
    <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>

  </CarouselProvider>
          </div>

        <Divider />
        </div>
        )
      }
    </React.Fragment>
      )

    }
  }



  // <CustomCardSlide
  //               key={grudge.id}
  //               image={this.props.images
  //                 .filter(image => image.id === grudge.pettyLevel)
  //                 .map(image => image.url)}
  //               index={user.grudges.indexOf(grudge)}
  //               header={grudge.enemyName}
  //               meta={grudge.incident}
  //       />