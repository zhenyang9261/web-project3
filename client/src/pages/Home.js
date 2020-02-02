import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

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
