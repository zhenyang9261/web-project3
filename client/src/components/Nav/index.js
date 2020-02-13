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
    console.log('logging out')
    axios.post('/api/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
        this.setState({ loggedOut: true })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);
    // if (this.state.loggedOut) {
    //   return <Redirect to={{ pathname: '/' }} />
    // }

    return (

      <div>
        {this.state.loggedOut && <Redirect to={{ pathname: '/' }} />}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary justify-content-between">
          <a class="navbar-brand" href="#">Travelogue</a>
          {loggedIn ? (
            <section className="navbar-section justify-content-end">
              <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                <span className="text-light">Logout</span></Link>
              <Link to="/" className="btn btn-link text-secondary">
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

// function Nav({ children }) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <a className="navbar-brand" href="/">
//         Travelogue
//       </a>
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       {children}
//     </nav>
//   );
// }

export default Nav;
