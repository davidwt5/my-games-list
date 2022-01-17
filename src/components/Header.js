import Title from "./Title";
import User from "./User";
import NavBar from "./NavBar";

function Header() {
  return (
    <div className="header">
      <Title />
      <User />
      <NavBar />
    </div>
  );
}

export default Header;
