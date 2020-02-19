import React, { Component } from "react";
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PersonalJournal from "./pages/PersonalJournal";
import CreateJournal from "./pages/CreateJournal";
import LoginForm from './pages/Login'
import Signup from './pages/Signup'
import Nav from './components/Nav'
import NoMatch from "./pages/NoMatch";
import { Redirect } from 'react-router-dom'
import './App.css';
import { Col, Row, Container } from "./components/Grid";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      id: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    console.log("updateUser: " + JSON.stringify(userObject));
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {

      if (response.data.user) {

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id
        })
      } else {

        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  render() {

    // var createJournalLink = '/CreateJournal/' + this.state.id;



    return (
      <Container fluid>
        <Router>
          <div className="App">
            <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} userid={this.state.id} />
            {/* greet user if logged in: */}
            {this.state.loggedIn &&
              <span>Welcome to Travelogue, {this.state.username}!</span>
            }
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/Login" render={() =>
                <LoginForm
                  updateUser={this.updateUser}
                />} />
              <Route exact path="/Logout" component={Home} />
              <Route exact path="/Signup" render={() =>
                <Signup />} />
              <Route exact path="/PersonalJournal/:id" component={PersonalJournal} />
              <Route exact path="/CreateJournal/:id" component={CreateJournal} />
              {/* <Redirect from="/" to="/Home" /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
