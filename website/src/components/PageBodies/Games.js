// Is this an unused file?

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Games() {
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();

  function searchSubmissionHandler(e) {
    e.preventDefault();
    navigate(`/search?title=${searchTitle}`);
  }

  return (
    <div className="games">
      <Container>
        <h1>Games</h1>
        <Form onSubmit={searchSubmissionHandler}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search Games..."
            />
            <Button type="submit">Search</Button>
          </InputGroup>
        </Form>

      </Container>
    </div>
  );
}

export default Games;
