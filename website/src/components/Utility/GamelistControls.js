/* A set of controls to add, remove, etc. A specific game from a user's gameslist
 Consider a heart and unheart system instead
 */

import { useState } from "react";
import { Plus, Minus, List } from "react-feather";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

async function addGame(e) {
  const gameId = e.target.dataset.id;
  const addGameURL = "http://localhost:4000/gameslist";
  try {
    const response = await fetch(addGameURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId: gameId,
      }),
      credentials: "include", // Security risk? Need this so the browser sends cookies.
    });
    if (response.status !== 200) {
      console.log("ERROR: " + response.status);
    } else {
      alert("successfully added game");
    }
  } catch (e) {
    console.log(e);
  }
}

async function removeGame(e) {
  const gameId = e.target.dataset.id;
  const addGameURL = `http://localhost:4000/gameslist/${gameId}`;
  try {
    const response = await fetch(addGameURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Security risk? Need this so the browser sends cookies.
    });
    if (response.status !== 200) {
      console.log("ERROR: " + response.status);
    } else {
      alert("successfully removed game");
    }
  } catch (e) {
    console.log(e);
  }
}

// Takes the id of the target game
function GamelistControls({ id, className }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={className ? className : ""}>
      <Plus
        data-id={id}
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={addGame}
      />
      <List
        data-id={id}
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={handleShow}
      />
      <Minus
        data-id={id}
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={removeGame}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GamelistControls;
