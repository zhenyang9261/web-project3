import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import { Redirect } from 'react-router-dom';

class CreateJournal extends Component {
  state = {
    journals: [],
    userId: "",
    title: "",
    country: "",
    city: "",
    date: "",
    rating: "",
    publish: false,
    note: "",
    done: false
  };

  // When this component mounts, grab the journals with the _id of this.props.match.params.id
  // e.g. localhost:3000/PersonalJournals/599dcb67f0f16317844583fc
  componentDidMount() {
      console.log("createjournal userid from url: " + JSON.stringify(this.props.match.params));
    this.setState({ userId: this.props.match.params.id });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "publish") {
      
      this.setState({
        publish: event.target.checked
      });
    }
    else {
      this.setState({
        [name]: value
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();

    console.log("Input: " + this.state.title + " " + this.state.country + " " + this.state.city + " " + this.state.date + " " + this.state.rating + " " + this.state.publish);
    if (this.state.title && this.state.date && this.state.city && this.state.date) {
      API.saveJournal({
        title: this.state.title,
        country: this.state.country,
        city: this.state.city,
        date: this.state.date,
        rating: this.state.rating,
        publish: this.state.publish,
        note: this.state.note,
        userId: this.state.userId
      })
        .then(res => this.setState({ done: true }))
        .catch(err => console.log(err));
    }
  };

  render() {
    
    if (this.state.done === true) {
      let newPage = "/PersonalJournal/" + this.state.userId;
      return <Redirect to={newPage} />;
    }
    return (
      <Container fluid>
        <Nav>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li> */}
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Create New Journal</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/">Logout</a>
              </li>
            </ul>
          </div>
        </Nav>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Create New Journal
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date (required)"
              />
              <Input
                value={this.state.country}
                onChange={this.handleInputChange}
                name="country"
                placeholder="Country (required)"
              />
              <Input
                value={this.state.city}
                onChange={this.handleInputChange}
                name="city"
                placeholder="City (required)"
              />
              <Input
                value={this.state.rating}
                onChange={this.handleInputChange}
                name="rating"
                placeholder="Rating"
              />
              Publish? { "  " }
              <input
                type="checkbox"
                defaultChecked={this.state.publish}
                name="publish"
                onChange={this.handleInputChange}
              /> 
              <TextArea
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Note (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.date && this.state.country && this.state.city)}
                onClick={this.handleFormSubmit}
              >
                Submit Journal
              </FormBtn>
            </form>
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default CreateJournal;