// import Title from "./Title";
// import User from "./User";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import MainNav from "./MainNav";
import User from "./User";

function Header() {
  return (
    <header>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">MyGamesList</Navbar.Brand>
          <MainNav />
          <User />
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
