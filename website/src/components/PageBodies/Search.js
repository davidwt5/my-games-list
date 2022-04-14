import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../Utility/GameCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Search() {
  const [searchParams] = useSearchParams();
  const [searchResponse, setsearchResponse] = useState(null);
  const searchTitle = searchParams.get("title");

  // Refetches data whenever the searchTitle changes
  useEffect(() => {
    // Should go through backend instead of hitting API directly
    async function searchGames(title = "", offset = 0) {
      if (title.length < 3) {
        return Promise.reject(
          new Error("search query must be at least 3 characters long")
        );
      }
      const url = "http://localhost:4000/searchgames";
      const response = await fetch(`${url}?title=${title}`);
      return await response.json();
    }
    searchGames(searchTitle)
      .then((res) => setsearchResponse(res))
      .catch((e) => setsearchResponse(e));
  }, [searchTitle]);

  if (searchResponse === null) {
    return <p>loading</p>;
  } else if (searchResponse instanceof Error) {
    return <p>{searchResponse.message}</p>;
  } else {
    console.log(searchResponse);
    const cells = searchResponse.results.map((result) => (
      <Col xs={12} md={6} lg={4} key={result.id}>
        <GameCard game={result} />
      </Col>
    ));
    return (
      <Container>
        <Row>{cells}</Row>
      </Container>
    );
  }
}

export default Search;
