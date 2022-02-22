import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./components/Header/Header";
import Games from "./components/PageBodies/Games";
import MyGames from "./components/PageBodies/MyGames";
import Profile from "./components/PageBodies/Profile";
import About from "./components/PageBodies/About";
import HTTP404 from "./components/PageBodies/HTTP404";
import Search from "./components/PageBodies/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/games" element={<Games />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" exact element={<HTTP404 />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
