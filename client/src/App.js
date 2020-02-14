import React, { Component } from "react";
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PersonalJournal from "./pages/PersonalJournal";
import CreateJournal from "./pages/CreateJournal";
import LoginForm from './components/Login'
import Signup from './components/Signup'
import Nav from './components/Nav'
import NoMatch from "./pages/NoMatch";
import { Redirect } from 'react-router-dom'

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
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ' + response.data.user._id);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  render() {

    var createJournalLink = '/CreateJournal/' + this.state.id;
    console.log(createJournalLink);
    return (
      <Router>
        <div>
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
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/PersonalJournal/:id" component={PersonalJournal} />
            <Route exact path="/CreateJournal/:id" component={CreateJournal} />
            {/* <Redirect from="/" to="/Home" /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
