import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Modal from "../components/Modal";

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      id: null,
      show: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  updateUser(userObject) {
    this.setState(userObject)
  }
  getUser() {
    axios.get('/user/').then(response => {

      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          id: null
        })
      }
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  showModal() {
    this.setState({
      show: true,
    });
  };

  handleSubmit(event) {
    event.preventDefault()

    axios
      .post('api/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {

        if (response.status === 200) {

          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            id: response.data.userid
          })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/personaljournal/' + response.data.userid
          })
        }
      }).catch(error => {
        console.log('login error: ');
        this.showModal();
        console.log(error);

      })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>Travelogue</h1>
                  <p>Welcome to Travelogue! Login and create your own Personal Travel Journal.</p>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
              </Col>
              <Col size="md-4">
                <div className="card justify-content-lg-center">
                  <div className="card-body">
                    <h4 className="card-title">Login</h4>
                    <p className="card-text"></p>
                    <Modal show={this.state.show} value="login" />
                    <form className="form-horizontal">
                      <div className="form-group">
                        <div className="col-1 col-ml-auto">
                          <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                          <input className="form-input"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-1 col-ml-auto">
                          <label className="form-label" htmlFor="password">Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                          <input className="form-input"
                            placeholder="password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group ">
                        <div className="col-7"></div>
                        <button
                          className="btn btn-primary col-4 col-mr-auto"

                          onClick={this.handleSubmit}
                          type="submit">Login</button>
                      </div>
                    </form>
                  </div>
                </div>

              </Col>
              <Col size="md-4">

              </Col>
            </Row>
          </Container >
        </div>
      )
    }
  }
}

export default LoginForm