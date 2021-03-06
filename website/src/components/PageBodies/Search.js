import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../Utility/GameCard";
import Loading from "../Utility/Loading";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "../Utility/SearchBar";

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
    setsearchResponse(null); // Resets the search response to trigger loading animation
    searchGames(searchTitle)
      .then((res) => setsearchResponse(res))
      .catch((e) => setsearchResponse(e));
  }, [searchTitle]);

  // Case: Loading
  if (searchResponse === null) {
    return (
      <Container className="my-4 px-5">
        <SearchBar />
        <Loading />
      </Container>
    );
  }

  // Case: Fetch Errors
  else if (searchResponse instanceof Error) {
    return <p>{searchResponse.message}</p>;
  }

  // Case: Normal
  else {
    console.log(searchResponse);
    // Match each search result to a gamecard in a cell grid
    const cells = searchResponse.results.map((result) => (
      <Col xs={12} md={6} lg={4} key={result.id}>
        <GameCard game={result} />
      </Col>
    ));
    return (
      <Container className="my-4 px-5">
        <SearchBar />
        <Row>{cells}</Row>
      </Container>
    );
  }
}

export default Search;
