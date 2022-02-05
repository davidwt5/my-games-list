import React, { useState, useEffect } from "react";
import config from "../config";

import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Games() {
  const [searchInput, setSearchInput] = useState("");

  async function getGames(offset = 0) {
    const { giantBomb } = config;
    const url = `http://localhost:8080/giantbomb.com/api/games?api_key=${giantBomb.apiKey}&format=json&field_list=id,name,image&offset=${offset}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  }

  useEffect(() => {
    // getGames();
  });

  function search(e) {
    e.preventDefault();
    alert(searchInput);
  }

  return (
    <div className="games">
      <Container>
        <h1>Games</h1>
        <Form onSubmit={search}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
