import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'
import Active from "./active/Active"
import Login from "./welcome/Login"
import Register from "./welcome/Register"
import APIManager from '../modules/APIManager';
import AddGrudgeForm from './grudge/AddGrudgeForm';
import EditGrudgeForm from './grudge/EditGrudgeForm';
import PastGrudges from "./past/PastGrudges"
import ExploreGrudges from "./users/ExploreGrudge"





class ApplicationViews extends Component {

  state = {
    expandGrudges: [],
    images:[],
    otherUsers:[],
    resolvedGrudges:[],
    sharedGrudges: [],
    grudges:[],
    exploreGrudges: [],
    allMyGrudges: [],
    insult: ""
  }
 notSharedNotOwned = []
//loading user data to update state object
componentDidMount(){
  const newState = {}
  const notYou= []
  //get all Grudges expanded
APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges")
  .then(allGrudges => {

    // this.setState({users: this.props.users})
  let ownAndShare= []
  allGrudges.forEach(grudge => grudge.userId ===+sessionStorage.getItem("activeUser") ? ownAndShare.push(grudge) : {})

  allGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
   let Me = true
   oneGrudge.sharedGrudges.forEach(g => {
     if(g.userId !== +sessionStorage.getItem("activeUser")) {
       Me=false
     }

   })
   if(Me===true) {ownAndShare.push(oneGrudge)}

  })
  newState.allMyGrudges = ownAndShare


  })

// get all images
  .then(() => APIManager.getAll("images"))
  .then(allImages => (newState.images = allImages))
//get all users and filter so that activec user is not included
  .then(() => APIManager.get("users", "?_embed=grudges"))
  .then(allUsers => allUsers.forEach(user => {
     if (user.id !== +sessionStorage.getItem("activeUser")) {
        notYou.push(user)
      } else {}
     (newState.otherUsers = notYou)
    }))
    //get all resolved grudges
  .then(() => APIManager.getAll("resolvedGrudges"))
  .then(allResolvedGrudges => (newState.resolvedGrudges = allResolvedGrudges))

  //get all sharedGrudges

  .then(() => APIManager.get("sharedGrudges", "?_expand=grudge&_expand=user"))
  .then(allSharedGrudges => (newState.sharedGrudges= allSharedGrudges))
  .then(() => APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"))
  .then(allGrudges => {

    // this.setState({users: this.props.users})
  let exploreGrudges= []
  allGrudges.forEach(grudge => !grudge.shared ? exploreGrudges.push(grudge) : {})

  allGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
   let notMe = true
   oneGrudge.sharedGrudges.forEach(g => {
     if(g.userId === +sessionStorage.getItem("activeUser")) {
       notMe=false
     }

   })
   if(notMe===true) {exploreGrudges.push(oneGrudge)}

  })
  newState.exploreGrudges = exploreGrudges


  })
  .then(() =>this.setState(newState))
}

//check session storage for value, return true or false
//use to redirect unauthenticated users to the welcome page
isAuthenticated = () => {
  return sessionStorage.getItem("activeUser") !== null
}


//function to add item to DB specifying name of resource {name} and object to add {item}

addItem = (name, item) => {
  let newObj = {}
  APIManager.post(name, item)
    .then(() => APIManager.getAll(name)

    )
    .then(items => {
      newObj[name] = items
      this.setState(newObj)
    })
    .then(() => this.getAndUpdateState())
      .then(() =>
      name === "sharedGrudges" ? (this.props.history.push("/explore")) : (this.props.history.push("/")))

  }

addSharedGrudge = ( item) => {
  let newSharedObj = {}
  APIManager.post("sharedGrudges", item)
    .then(() => APIManager.getAll("sharedGrudges")

    )
    .then(items => {
      newSharedObj["sharedGrudges"] = items
      this.setState(newSharedObj)
    })





}



clearInsult = (insult) =>  insult = ""

curse = (words1, words2, words3) => {
  const newState = {}
  const adj1 = this.randomWord(words1)
  const adj2 = this.randomWord(words2)
  const n = this.randomWord(words3)
  newState["insult"] =`${adj1} ${adj2} ${n}!`;
  this.setState(newState)
   console.log("cursemade", this.state.insult)
}


randomWord = (arr) => {
  const word = arr[Math.round(Math.random(1) * arr.length-1)]
  return word
}
//function to put (edit) object and save to DB
updateItem = (name, editedObject) => {
  let newObj = {}
  return APIManager.put(name, editedObject)
    .then(() =>
      APIManager.getAll(
        `${name}?userId=${+sessionStorage.getItem("activeUser")})}`
      )
      )
      .then(item => {
        newObj[name] = item
        this.setState(newObj)
      })
      .then(()=> {

       editedObject.shared===true ? this.props.history.push("/explore") : this.props.history.push("/")

      })

    }
updateGrudge = (editedObject) => {
  let newObj = {}
  return APIManager.put("grudges", editedObject)
    .then(() =>APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"))
      .then(item => {
        newObj["expandGrudges"] = item
        this.setState(newObj)
      })

}


getAndUpdateState = () => {
  const newState = {}
  const notYou= []
  //get all Grudges expanded
APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges")
  .then(allGrudges => {

    // this.setState({users: this.props.users})
  let ownAndShare= []
  allGrudges.forEach(grudge => grudge.userId ===+sessionStorage.getItem("activeUser") ? ownAndShare.push(grudge) : {})

  allGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
   let Me = true
   oneGrudge.sharedGrudges.forEach(g => {
     if(g.userId !== +sessionStorage.getItem("activeUser")) {
       Me=false
     }

   })
   if(Me===true) {ownAndShare.push(oneGrudge)}

  })
  newState.allMyGrudges = ownAndShare


  })

// get all images
  .then(() => APIManager.getAll("images"))
  .then(allImages => (newState.images = allImages))
//get all users and filter so that activec user is not included
  .then(() => APIManager.get("users", "?_embed=grudges"))
  .then(allUsers => allUsers.forEach(user => {
     if (user.id !== +sessionStorage.getItem("activeUser")) {
        notYou.push(user)
      } else {}
     (newState.otherUsers = notYou)
    }))
    //get all resolved grudges
  .then(() => APIManager.getAll("resolvedGrudges"))
  .then(allResolvedGrudges => (newState.resolvedGrudges = allResolvedGrudges))

  //get all sharedGrudges

  .then(() => APIManager.get("sharedGrudges", "?_expand=grudge&_expand=user"))
  .then(allSharedGrudges => (newState.sharedGrudges= allSharedGrudges))
  .then(() => APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"))
  .then(allGrudges => {

    // this.setState({users: this.props.users})
  let exploreGrudges= []
  allGrudges.forEach(grudge => !grudge.shared ? exploreGrudges.push(grudge) : {})

  allGrudges.filter(grudge => grudge.shared).forEach (oneGrudge => {
   let notMe = true
   oneGrudge.sharedGrudges.forEach(g => {
     if(g.userId === +sessionStorage.getItem("activeUser")) {
       notMe=false
     }

   })
   if(notMe===true) {exploreGrudges.push(oneGrudge)}

  })
  newState.exploreGrudges = exploreGrudges


  })
  .then(() =>this.setState(newState))


}


updateGrudgeShare = (obj) => {
  let newObj={}
  return APIManager.put("grudges", obj)
  .then(() => APIManager.getAll("sharedGrudges"))
  .then(item => {
    newObj["sharedGrudges"] = item
    this.setState(newObj)
  })

}

deleteItem = (name, id) => {

  let newObj = {}
  return fetch(`http://localhost:5002/${name}/${id}`, {
    method: "DELETE"
  })
    .then(e => e.json())
    .then(() => APIManager.getAll(`${name}?userId=${+sessionStorage.getItem("activeUser")}`
    ))
    .then(group => {
      newObj[name] = group
      this.setState(newObj)
      this.props.history.push("/")
    })
}

deleteGrudge = ( id) => {

  let newObj = {}
  return fetch(`http://localhost:5002/grudges/${id}`, {
    method: "DELETE"
  })
    .then(e => e.json())
    .then(() => APIManager.get("grudges", "?_expand=user&_embed=resolvedGrudges&_embed=sharedGrudges"
    ))
    .then(group => {
      newObj["expandGrudges"] = group
      this.setState(newObj)
      this.props.history.push("/past")
    })
}



//curse Generator func to make generated insult a state on APP views to pass down to addGrudgeForm


  render() {

    return (
      <React.Fragment>
        <Route
          exact path="/"
          render={props => {
            if(this.isAuthenticated()) {
            return (

              <Active expandGrudges={this.state.allMyGrudges} sharedGrudges= {this.state.sharedGrudges} getAndUpdateState={this.getAndUpdateState}  clearInsult={this.clearInsult}
              updateResolve= {this.updateResolve} updateItem={this.updateGrudge}
               images={this.state.images} {...props} />
            )
            }
             else return <Redirect to="/login" />
          }}

        />
        <Route
          exact path="/login"
          render={props => {
            return <Login setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          exact path="/register"
          render={props => {
            return <Register setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          exact path="/add"
          render={props => {
            if(this.isAuthenticated()) return <AddGrudgeForm  curse={this.curse} clearInsult={this.clearInsult}   insult={this.state.insult} addItem={this.addItem}  getAndUpdateState={this.getAndUpdateState} {...props}/>
            else return <Redirect to="/login" />
          }}
        />
        <Route
          exact path="/edit/:grudgeId(\d+)"
          render={props => {
            let grudge = this.state.expandGrudges.find(grudge =>
            grudge.id === parseInt(props.match.params.grudgeId))
                    if (!grudge) {
                        grudge = {id:404, EnemyName:"404", incident: "Enemy not found"}}
            if(this.isAuthenticated()) {
              return <EditGrudgeForm     genInsult={this.state.insult} getAndUpdateState={this.getAndUpdateState} grudge={grudge} {...props} updateItem={this.updateGrudge} addItem={this.addItem}/>
            } else  {
                return <Redirect to="/login" />
            }
          }}/>
        <Route
          exact path="/past"
          render={props => {
            if(this.isAuthenticated()) {


            return <PastGrudges  resolvedGrudges={this.state.allMyGrudges.filter(grudge => grudge.isResolved===true)} images={this.state.images} {...props} deleteGrudge={this.deleteGrudge} />
            }
            else  {
              return <Redirect to="/login" />
          }
          }}/>
        <Route
          exact path="/explore"
          render={props => {
            if(this.isAuthenticated()) return (

            <ExploreGrudges
              users={this.state.otherUsers}
              updateGrudgeShare={this.updateGrudgeShare}
              expandGrudges={this.state.exploreGrudges.filter(grudge => grudge.userId!==+sessionStorage.getItem("activeUser")).filter(grudge=> !grudge.isResolved)}
              images={this.state.images}
              updateGrudge= {this.updateGrudge}
              addSharedGrudge={this.addSharedGrudge }
              getAndUpdateState={this.getAndUpdateState}
              sharedGrudges= {this.state.sharedGrudges}
              {...props} />
            )
            else  {
              return <Redirect to="/login" />
            }
          }}/>
        {/* <Route
          exact path="/"
          render={props => {
            return <Dash setUser={this.props.setUser} {...props} />
          }}
        /> */}
      </React.Fragment>

    )
  }
}

export default withRouter(ApplicationViews)

