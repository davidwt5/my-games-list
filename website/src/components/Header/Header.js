// import Title from "./Title";
// import User from "./User";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import MainNav from "./MainNav";
import LoggedInUser from "./LoggedInUser";

function Header() {
  return (
    <header>
      <Navbar bg="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyGamesList</Navbar.Brand>
          </LinkContainer>
          <MainNav />
          <LoggedInUser />  {/* Do a check if user is logged in to render */}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
