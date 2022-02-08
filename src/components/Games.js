import React, { useState, useEffect } from "react";
import config from "../config";

import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Games() {
  const [searchGameTitle, setSearchGameTitle] = useState("");

  // async function getGames(offset = 0) {
  //   const { giantBomb } = config;
  //   const url = `http://localhost:8080/giantbomb.com/api/games?api_key=${giantBomb.apiKey}&format=json&field_list=id,name,image&offset=${offset}`;
  //   const response = await fetch(url);
  //   const result = await response.json();
  //   console.log(result);
  // }

  // useEffect(() => {
  //   // getGames();
  // });

  function urlGenerator({ domain = "", endpoint = "", queryStrings = {} }) {
    if (!domain) return "";
    let url = new URL(endpoint, domain);
    for (let key of Object.keys(queryStrings)) {
      url.searchParams.append(key, queryStrings[key]);
    }
    return url;
  }

  // Dont make the request if its empty?
  async function searchGames(title = "", offset = 0) {
    const { giantBomb } = config;
    const url = urlGenerator({
      domain: "http://localhost:8080/",
      endpoint: "giantbomb.com/api/search",
      queryStrings: {
        api_key: giantBomb.apiKey,
        format: "json",
        field_list: "id,name,image",
        resources: "game",
        query: title,
        offset: offset,
        limit: 12
      }
    });
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  }

  function searchSubmissionHandler(e) {
    e.preventDefault();
    searchGames(searchGameTitle);
  }

  function gamesList(games) {
    return;
  }

  return (
    <div className="games">
      <Container>
        <h1>Games</h1>
        <Form onSubmit={searchSubmissionHandler}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={searchGameTitle}
              onChange={(e) => setSearchGameTitle(e.target.value)}
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
