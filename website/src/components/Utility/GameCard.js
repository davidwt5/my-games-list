import { useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Plus, Minus, List } from "react-feather";
import "./GameCard.css";

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

// Consider a heart and unheart system instead
function GameCard({ game }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, name, image, deck, original_release_date } = game;
  return (
    <Card className="my-4 text-center" style={{ width: "100%" }}>
      <Card.Header as="h5">{name}</Card.Header>
      <Image
        src={image.original_url}
        className="w-75 my-4 m-auto"
        style={{ aspectRatio: "4/5" }}
      ></Image>
      <Card.Body>
        <Card.Text className="text-truncate">{deck}</Card.Text>
        <Card.Text>{original_release_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Plus
          data-id={id}
          stroke-width={1.5}
          className="card-footer-icon mx-1"
          onClick={addGame}
        />
        <List
          data-id={id}
          stroke-width={1.5}
          className="card-footer-icon mx-1"
          onClick={handleShow}
        />
        <Minus
          data-id={id}
          stroke-width={1.5}
          className="card-footer-icon mx-1"
          onClick={removeGame}
        />
      </Card.Footer>

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
    </Card>
  );
}

export default GameCard;
