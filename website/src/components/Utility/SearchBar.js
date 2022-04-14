import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SearchBar() {
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();

  function searchSubmissionHandler(e) {
    e.preventDefault();
    navigate(`/search?title=${searchTitle}`);
  }
  return (
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
  );
}

export default SearchBar;
