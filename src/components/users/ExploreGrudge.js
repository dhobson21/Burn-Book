import React, { Component } from 'react'
import {Header, Divider} from "semantic-ui-react"
import { CarouselProvider, Slider, ButtonBack, ButtonNext} from "pure-react-carousel";

import "./exploreGrudges.css"
import CustomCardSlide from "./CustomCardSlide"
import GrudgeCard from "../grudge/GrudgeCard"
import 'pure-react-carousel/dist/react-carousel.es.css';



export default class ExploreGrudges extends Component {
  state = {
        grudgeId: "",
        userId: +sessionStorage.getItem("activeUser"),
        open: false,
        expandGrudges: [],
        users: []


      }



componentDidMount(){
console.log("component mounnted")
console.log(this.props.expandGrudges)

  // this.setState({users: this.props.users})
  let exploreGrudges= []
 this.props.expandGrudges.forEach(grudge => !grudge.shared ? exploreGrudges.push(grudge) : {})

 this.props.expandGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
  let notMe = true
  oneGrudge.sharedGrudges.forEach(g => {
    if(g.userId === +sessionStorage.getItem("activeUser")) {
      notMe=false
    }

  })
  if(notMe===true) {exploreGrudges.push(oneGrudge)}

 })
this.setState({expandGrudges: exploreGrudges})

}



  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false })
  handleCancel = () => this.setState({ open: false })
     notShared = []
  render() {

    return (
      <React.Fragment>
        <Header size="huge" >Other Petty People</Header>

          <div className="user-container"  >
          {
        this.props.users.map(user =>

          <div key={user.id} className="users">
          <Header size="large" textAlign="center">{user.username}'s Grudges</Header>




          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={user.grudges.length}
            style={{ width: "250px", height: "auto"  }}
                >
          <Slider>
          {
              this.props.expandGrudges.filter(grudge => grudge.userId ===user.id).map(grudge=>

              <CustomCardSlide  index={user.grudges.indexOf(grudge)} key={grudge.id}>  <GrudgeCard  grudge={grudge} images ={this.props.images} {...this.props}/></CustomCardSlide>


            )
          }

    </Slider>
    <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>

  </CarouselProvider>


        <Divider />
          </div>

        )
      }
      </div>
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