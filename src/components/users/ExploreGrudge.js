import React, { Component } from 'react'
import {Header, Divider} from "semantic-ui-react"
import { CarouselProvider, Slider, ButtonBack, ButtonNext} from "pure-react-carousel";

import "./exploreGrudges.css"
import CustomCardSlide from "./CustomCardSlide"
import ExploreGrudgeCard from "./ExploreGrudgeCard"
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
console.log(this.props)

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
        <Header size="huge" textAlign="center" style={{'paddingBottom':  '50px', 'color': '#e25822', 'fontSize': '40px', 'fontFamily': "'Arvo', serif", 'fontWeight': 1000, 'margin': '0px', 'backgroundColor': '#303029'}}>User Grudges</Header>


          <div className="user-container"   >
          {
        this.props.users.map(user =>

          <div key={user.id} className="allusers" style={{ 'marginTop': 50, 'marginBottom': 25, 'margiRight': 100,}}>
          <Header size="large"  style={{'color': 'white'}} textAlign="center">{user.username}'s Grudges</Header>



          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={this.props.expandGrudges.filter(grudge => grudge.userId ===user.id).length}
            style={{ width: 300, height: "auto"  }}
                >
          <Slider>
          {
              this.props.expandGrudges.filter(grudge => grudge.userId ===user.id).map(grudge=>

              <CustomCardSlide  style={{ 'width': 250, 'height': 300,  'padding': 3, 'margin': 2, 'backgroundColor': '#e25822'}}
              index={user.grudges.indexOf(grudge)} key={grudge.id}>  <ExploreGrudgeCard  grudge={grudge} images ={this.props.images} {...this.props}/></CustomCardSlide>


            )
          }

    </Slider>
    <div className='back'>

    <ButtonBack   className= "scrollbt">Back</ButtonBack>
    </div>
    <div className='next'>
        <ButtonNext className="scrollbt">Next</ButtonNext>

    </div>

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