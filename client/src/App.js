import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PersonalJournal from "./pages/PersonalJournal";
import LoginForm from './components/Login'
import Signup from './components/Signup'
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Login" component={LoginForm} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/PersonalJournal/:id" component={PersonalJournal} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
