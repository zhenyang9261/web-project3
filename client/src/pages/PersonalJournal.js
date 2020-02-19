import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import Nav from "../components/Nav";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";

class PersonalJournal extends Component {
  state = {
    journals: [],
    userId: ""
  };
  // When this component mounts, grab the journals with the _id of this.props.match.params.id
  // e.g. localhost:3000/PersonalJournals/599dcb67f0f16317844583fc
  componentDidMount() {
    this.setState({ userId: this.props.match.params.id });
    this.loadJournal(this.props.match.params.id);
  }

  loadJournal = id => {
    API.getUserJournals(id)
      .then(res => { this.setState({ journals: res.data.journal }); })
      .catch(err => console.log(err));
  }

  deleteJournal = id => {
    API.deleteJournal(id)
      .then(res => this.loadJournal(this.state.userId))
      .catch(err => console.log(err));
  };

  render() {
    let newJournalLink = "/CreateJournal/" + this.state.userId;

    return (
      <Container fluid>

        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>

                Personal Journals
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.journals.length ? (
              <List>
                {this.state.journals.map(journal => (
                  <ListItem key={journal._id}>

                    <strong>
                      <h2>{journal.title}</h2>
                    </strong>
                    <p>{journal.country} | {journal.city} | {journal.date.substring(0, 10)}</p>
                    <p><strong>Rating: </strong>{journal.rating}</p>
                    <p>{journal.note}</p>
                    <DeleteBtn onClick={() => this.deleteJournal(journal._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <div>
                  <h3>No Results to Display</h3>
                  <p>To create your first journal entry, use the link at the top to create your first journal.</p>
                </div>
              )}
          </Col>
        </Row>

      </Container>
    );
  }
}

export default PersonalJournal;
