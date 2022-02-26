// import Title from "./Title";
// import User from "./User";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import LoggedInUser from "./LoggedInUser";
import LoggedOutUser from "./LoggedOutUser";

function Header() {
  return (
    <header>
      <Navbar bg="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyGamesList</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="/games">Games</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Button
              variant="primary"
              onClick={() =>
                fetch("http://localhost:4000/cookietest", {
                  credentials: "include", // Security flaw?
                })
              }
            >
              test cookies
            </Button>
          </Nav>
          <LoggedOutUser /> {/* Do a check if user is logged in to render */}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
