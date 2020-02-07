import React from "react";
import Jumbotron from "../components/Jumbotron";
import Login from "../components/Login";

function NewUser() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Welcome!</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NewUser;