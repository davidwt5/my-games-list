// Page where you browse games, comes with a search bar

import Container from "react-bootstrap/Container";
import SearchBar from "../Utility/SearchBar";

function Games() {
  return (
    <div className="games">
      <Container className="my-4 px-5">
        <h1>Games</h1>
        <SearchBar />
      </Container>
    </div>
  );
}

export default Games;
