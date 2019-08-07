import React, { Component } from 'react'
import {Header, Divider} from "semantic-ui-react"
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
        expandGrudges: []

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
        this.props.users.map(user =>
          <div key={user.id} >
          <Header size="large" textAlign="center">{user.username}'s Grudges</Header>
          <div className="users">

          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={user.grudges.length}
            style={{ width: "250px", height: "auto" }}
                >
          <Slider>
          {
              this.props.expandGrudges.filter(grudge => grudge.userId ===user.id).map(grudge=>
              <Slide
                index={user.grudges.indexOf(grudge)}
                key={grudge.id} >
                <GrudgeCard  grudge={grudge} images ={this.props.images} {...this.props}/>
              </Slide>

            )
          }

    </Slider>
    <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
        <CustomCardSlide index={0} />
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