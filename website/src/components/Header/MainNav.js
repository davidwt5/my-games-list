import Nav from "react-bootstrap/Nav";

function MainNav() {
  return (
    <Nav className="me-auto">
      <Nav.Item>
        <Nav.Link href="/games">Games</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default MainNav;
