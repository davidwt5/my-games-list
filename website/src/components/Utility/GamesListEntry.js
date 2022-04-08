import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import GamelistControls from "./GamelistControls";

function GamesListEntry({ game }) {
  // We will be mutating status and we want react to rerender based on it
  const [status, setStatus] = useState(game.status);

  return (
    <ListGroup.Item className="d-flex align-items-center">
      <img
        className="me-3"
        src={game.data.image.icon_url}
        alt={game.data.name}
      ></img>
      <div>
        <h6>{game.data.name}</h6>
        <p className="text-muted text-capitalize">{status}</p>
      </div>
      <GamelistControls
        id={game.gameId}
        status={status}
        setStatus={setStatus}
        className="ms-auto"
      />
    </ListGroup.Item>
  );
}

export default GamesListEntry;
