import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// API Key 970fac16102944879c125004f8dd8d2d
export default class App extends Component {
  
  state={
    progress:0
  }
  
  //here in the setProgress method we are changing the state variable progress
  //remember it is mandetory to make this  setProgress method as a fat arrow function
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  
  render() {
    return (
      <div>
        <Router>
            <Navbar/>
            {/* We want loading bar after navbar thats why we are putting here */}
            <LoadingBar
              height={3}
              color='#f11946'
              progress={this.state.progress}
            />

              <Switch>
                    {/* Here serProgress is a method which we are passing as a props  */}
                    <Route exact path="/"><News setProgress={this.setProgress}  key="general" pageSize={6} country="in" category="general"/></Route>
                    <Route exact path="/sports"><News setProgress={this.setProgress}  key="sports" pageSize={6} country="in" category="sports"/></Route>
                    <Route exact path="/business"><News setProgress={this.setProgress}  key="business" pageSize={6} country="in" category="business"/></Route>
                    <Route exact path="/entertainment"><News setProgress={this.setProgress}   key="entertainment" pageSize={6} country="in" category="entertainment"/></Route>
                    <Route exact path="/health"><News setProgress={this.setProgress}   key="health" pageSize={6} country="in" category="health"/></Route>
                    <Route exact path="/science"><News setProgress={this.setProgress}  key="science" pageSize={6} country="in" category="science"/></Route>
                    <Route exact path="/technology"><News setProgress={this.setProgress}   key="technology" pageSize={6} country="in" category="technology"/></Route>
                    <Route exact path="/general"><News setProgress={this.setProgress}  key="general" pageSize={6} country="in" category="general"/></Route>
              </Switch>
        </Router>
      </div>
    )
  }
}
