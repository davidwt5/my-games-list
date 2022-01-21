import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

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
        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">My Games</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default User;
