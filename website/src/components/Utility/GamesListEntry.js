import ListGroup from "react-bootstrap/ListGroup";

function GamesListEntry({ game }) {
  console.log(game);
  return (
    <div>
      <p>{game.data.name} | {game.status}</p>
    </div>
  );
}

export default GamesListEntry;
