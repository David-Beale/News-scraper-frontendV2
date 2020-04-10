import React, { useState } from "react";
import ErrorMessage from "./login-error";
import { Link } from "react-router-dom";
import logo from "../../assets/icon.png";
import "../../styles/login-form.css";
import Api from '../../api-client'

function Login (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const post = {
      email,
      password
    };
    Api.login(post)
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else if (data.user) {
          props.setUser(data.user);
          props.setisAuth(true);
          props.setisLoading(false);
        }
      });
  };

  const onFocus = () => {
    setActive(true)
  }
  const onBlur = (e) => {
    if (e.target.value === "") setActive(false)
  }

  return (
    <div className="login__container">
      <div className="login-subcontainer">
        <form className="login-form" onSubmit={onSubmit}>
          <img className="session-logo" src={logo} alt="logo" />
          <h1>Welcome</h1>
          <h1>Please sign in</h1>
          <div className="error-container">
            {error.length > 0 && <ErrorMessage error={error} />}

          </div>
          <div className="txtb">
            <input
              type="text"
              id="email"
              name="email"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onEmailChange}
              value={email}
              className={active ? 'focus' : ''}
            />
            <span data-placeholder="Email"></span>
          </div>
          <div className="txtb">
            <input
              type="password"
              id="password"
              name="password"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onPasswordChange}
              value={password}
              className={active ? 'focus' : ''}
            />
            <span data-placeholder="Password"></span>
          </div>
          <input
            type="submit"
            className="logbtn"
            value="Login"
          />
          <div className="bottom-text">
            Don't have account? <Link
              // className="button login-form__link"
              // style={{ display: "inline" }}
              to={"/register"}
            >
              Register
        </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
