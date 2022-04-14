import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import GamesListEntry from "./GamesListEntry";

function GamesList({ list }) {
  return (
    // Unique Key prop
    <Container className="mt-4 px-5">
      <ListGroup variant="flush">
        {list.map((game) => (
          <GamesListEntry game={game} key={game.gameId}/>
        ))}
      </ListGroup>
    </Container>
  );
}

export default GamesList;
