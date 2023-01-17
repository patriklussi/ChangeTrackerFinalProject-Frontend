import React from "react";
import "../Styles/Views.scss";
import "./Components.scss";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import menuIcon from "../assets/svg/MenuIcon.png";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 700px)",
  });
  function toggleHamburger() {
    setToggle(!toggle);
  }
  function logOut() {
    sessionStorage.clear();
    navigate("/login");
  }
  return (
    <nav className="CTHeader">
      <h1>ChangeTracker</h1>
      {isDesktopOrLaptop ? (
        <ul className="nav-list">
          <li
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <button className="sign-out-button" onClick={logOut}>
            Sign out
          </button>
        </ul>
      ) : (
        <div className="burgerBox" onClick={toggleHamburger}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      )}
      <section
        className={`animate__animated  animate__fadeIn  slideInMenu  ${
          toggle ? "show" : "hide"
        }`}
      >
        <p onClick={toggleHamburger}>X</p>

        <ul className="nav-list-slideIn">
          <li onClick={() => {
              navigate("/dashboard");
            }}>Dashboard</li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <button className="sign-out-button" onClick={logOut}>
            Sign out
          </button>
        </ul>
      </section>
    </nav>
  );
}
