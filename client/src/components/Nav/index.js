import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import "./style.css";

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      loggedOut: false
    }
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    
    axios.post('/api/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
        this.setState({ loggedOut: true }, () => {
          this.setState({ loggedOut: false })
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const userid = this.props.userid;
   
    var createJournalLink = '/CreateJournal/' + userid;

    // if (this.state.loggedOut) {
    //   return <Redirect to={{ pathname: '/' }} />
    // }

    return (

      <div>
        {this.state.loggedOut && <Redirect to={{ pathname: '/' }} />}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary justify-content-between">
          <a className="navbar-brand" href="#">Travelogue</a>
          {loggedIn ? (
            <section className="navbar-section justify-content-end">
              <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                <span className="text-light">Logout</span></Link>
              <Link to={createJournalLink} className="btn btn-link text-secondary">
                <span className="text-light">Create New Journal</span>
              </Link>

            </section>
          ) : (
              <section className="navbar-section justify-content-end">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-light">Home</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-light">Login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-light">Sign Up</span>
                </Link>
              </section>
            )}
        </nav>
      </div>


    );

  }
}

export default Nav;
