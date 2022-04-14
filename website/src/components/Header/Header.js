import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import getCookiesInObjFormat from "../Utility/cookies";
import LoggedInUser from "./LoggedInUser";
import LoggedOutUser from "./LoggedOutUser";

function Header() {
  const userCookies = getCookiesInObjFormat();
  return (
    <header>
      <Navbar bg="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyGamesList</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Nav.Item>
              <LinkContainer to="/games">
                <Nav.Link>Games</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {/* We don't need an about page atm */}
            {/* <Nav.Item>
              <LinkContainer to="/about">
                <Nav.Link href="#">About</Nav.Link>
              </LinkContainer>
            </Nav.Item> */}
          </Nav>
          {userCookies ? (
            <LoggedInUser user={userCookies} />
          ) : (
            <LoggedOutUser />
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
