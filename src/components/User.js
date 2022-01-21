import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function User() {
  return (
    <Nav className="ms-auto">
      <NavDropdown
        title={
          <div style={{ display: "inline" }}>
            <img
              src={"/img/stock-profile.webp"}
              alt="user pic"
              style={{ height: 50, marginRight: 10 }}
            />
            {"John Doe"}
          </div>
        }
        id="user-dropdown"
      >
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/mygames">
          <NavDropdown.Item>My Games</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => alert("signed out")}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default User;
