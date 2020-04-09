import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon.png";
import "../../styles/landing.css";
function Landing () {
  return (
    <div className="landing__container">
      <div className="landing-subcontainer">
        <img className="landing-logo" src={logo} alt="logo" />
        <div>
          <p className="landing__text">Create an account or login</p>
          <div className="landing__button-container">
            <div className="landing__button">
              <Link to={"/register"} className="landing-button-text">
                Register
            </Link>
            </div>
            <div className="landing__button">
              <Link to={"/login"} className="landing-button-text">
                Login
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;