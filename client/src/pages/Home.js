import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Nav from "../components/Nav";

class Home extends Component {
  state = {
    journals: []
  };

  componentDidMount() {
    this.loadJournals();
  }

  loadJournals = () => {
    API.getJournals()
      .then(res => {
        console.log("res.data");
     
        this.setState({ journals: res.data })
      }
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Nav>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Signup</a>
              </li>
            </ul>
          </div>
        </Nav>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>All Journals</h1>
            </Jumbotron>
            {this.state.journals.length ? (
              <List>
                {this.state.journals.map(journal => (
                  <ListItem key={journal._id}>
                   
                      <strong>
                        {journal.title} 
                      </strong>
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
