import ListGroup from "react-bootstrap/ListGroup";
import GamelistControls from "./GamelistControls";

function GamesListEntry({ game }) {
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <img className="me-3" src={game.data.image.icon_url} alt={game.data.name}></img>
      <div>
        <h6>{game.data.name}</h6>
        <p className="text-muted">{game.status}</p>
      </div>
      <GamelistControls id={game.gameId} className="ms-auto"/>  
    </ListGroup.Item>
  );
}

export default GamesListEntry;
