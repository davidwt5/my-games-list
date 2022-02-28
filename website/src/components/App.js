import Header from "./Header/Header";
import Home from "./PageBodies/Home";
import Games from "./PageBodies/Games";
import MyGames from "./PageBodies/MyGames";
import Profile from "./PageBodies/Profile";
import About from "./PageBodies/About";
import HTTP404 from "./PageBodies/HTTP404";
import Search from "./PageBodies/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" exact element={<HTTP404 />} />
      </Routes>
    </Router>
  );
}

export default App;
