/* A set of controls to add, remove, etc. A specific game from a user's gameslist
 Consider a heart and unheart system instead
 */

import { useState } from "react";
import { Plus, Minus, List } from "react-feather";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

async function addGame(gameId) {
  const url = "http://localhost:4000/gameslist";
  try {
    const response = await fetch(url, {
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

async function removeGame(gameId) {
  const url = `http://localhost:4000/gameslist/${gameId}`;
  try {
    const response = await fetch(url, {
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

async function updateStatus(gameId, newStatus) {
  console.log("status update request received");
  const url = "http://localhost:4000/gameentry";
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId: gameId,
        status: newStatus,
      }),
      credentials: "include", // Security risk? Need this so the browser sends cookies.
    });
    if (response.status !== 200) {
      console.log("ERROR: " + response.status);
    } else {
      alert("successfully updated status");
    }
  } catch (e) {
    console.log(e);
  }
}

// Takes the id of the target game
// className prop is just for bootstrap styling purposes
function GamelistControls({ id, status, setStatus, className }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const heartHandler = () => addGame(id);
  const unHeartHandler = () => removeGame(id);

  // Sends a request to update the game status in db upon selecting dropdown
  const dropdownHandler = (e) => {
    const newStatus = e.target.innerText.toLowerCase();
    setStatus(newStatus);
    updateStatus(id, newStatus);
  };

  return (
    <div className={className ? className : ""}>
      <Plus
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={heartHandler}
      />
      <List
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={handleShow}
      />
      <Minus
        strokeWidth={1.5}
        className="card-footer-icon mx-1"
        onClick={unHeartHandler}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <Dropdown>
            <Dropdown.Toggle className="text-capitalize">
              {status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-capitalize"
                onClick={dropdownHandler}
              >
                plan to play
              </Dropdown.Item>
              <Dropdown.Item
                className="text-capitalize"
                onClick={dropdownHandler}
              >
                playing
              </Dropdown.Item>
              <Dropdown.Item
                className="text-capitalize"
                onClick={dropdownHandler}
              >
                completed
              </Dropdown.Item>
              <Dropdown.Item
                className="text-capitalize"
                onClick={dropdownHandler}
              >
                on-hold
              </Dropdown.Item>
              <Dropdown.Item
                className="text-capitalize"
                onClick={dropdownHandler}
              >
                dropped
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GamelistControls;
