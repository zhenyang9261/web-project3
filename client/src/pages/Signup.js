import React, { Component } from 'react'
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import Signup from "../components/Signup";


import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import Nav from "../Nav";
// import { Container } from "../Grid";
// import Modal from "react-bootstrap/Modal";
import Modal from "../components/Modal";
import './pages.css';
import "bootstrap/dist/css/bootstrap.min.css";

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      redirectTo: null,
      show: false,
      modal: "test"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

    //request to server to add a new username/password
    axios.post('api/user/', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log(response)
        if (!response.data.error) {

          this.setState({ //redirect to login page
            redirectTo: '/Login'
          })
        } else {
          console.log('username already taken')
          this.showModal();
          // alert("FAILED")

        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)

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
                  <h1>Register</h1>
                  <p>Create your Personal Travel Journal with Travelogue</p>
                </Jumbotron>
                {/* <button onClick={e => {
                  this.showModal();
                }}
                > show Modal </button> */}

              </Col>
            </Row>
            <Row>
              <Col size="md-4">
              </Col>
              <Col size="md-4">
                <div className="card justify-content-lg-center">
                  <div className="card-body">
                    <h4 className="card-title ">Travelogue Registration</h4>
                    <p className="card-text">Register with Travelogue and create your own personal travel journal.</p>
                    <Modal show={this.state.show} value="signup" />
                    <form className="form-horizontal">
                      <div className="form-group">
                        <div className="col-1 col-ml-auto">
                          <label className="form-label" htmlFor="username">Username: </label>
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
                          className="btn btn-primary col-mr-auto"
                          onClick={this.handleSubmit}
                          type="submit"
                        >Sign up</button>
                      </div>

                    </form>
                  </div>
                </div>
              </Col>
              <Col size="md-4">
                {/* <Modal show={this.state.show} /> */}
              </Col>
            </Row>
          </Container >
        </div>
      )
    }
  }
}

export default Signup
