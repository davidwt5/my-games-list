import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function LoggedInUser({ user }) {
  const { username, profilePic } = user;
  function logoutHandler() {
    function deleteCookies() {
      var allCookies = document.cookie.split(";");

      // The "expire" attribute of every cookie is
      // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
      for (var i = 0; i < allCookies.length; i++)
        document.cookie =
          allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    }

    deleteCookies();
    window.location.href = '/';
  }

  return (
    <Nav className="ms-auto">
      <NavDropdown
        title={
          <div style={{ display: "inline" }}>
            <img
              src={profilePic ? profilePic : "/img/stock-profile.webp"}
              alt="user pic"
              style={{ height: 50, marginRight: 10 }}
            />
            {username}
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
        <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default LoggedInUser;
