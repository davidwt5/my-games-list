import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

function LoggedOutUser() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  return (
    <Nav className="ms-auto">
      <Button variant="outline-secondary mx-2" onClick={handleSignupShow}>
        Signup
      </Button>
      <Button variant="outline-primary" onClick={handleLoginShow}>
        Login
      </Button>
      <SignupPopup show={showSignup} handleClose={handleSignupClose}/>
      <LoginPopup show={showLogin} handleClose={handleLoginClose}/>
    </Nav>
  );
}

export default LoggedOutUser;
