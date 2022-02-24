import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginPopup from "./LoginPopup";

function LoggedOutUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Nav className="ms-auto">
      <Button variant="outline-primary" onClick={handleShow}>
        Login
      </Button>
      <LoginPopup show={show} handleClose={handleClose}/>
    </Nav>
  );
}

export default LoggedOutUser;
