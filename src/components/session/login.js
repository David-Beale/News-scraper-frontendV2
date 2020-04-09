import React, { useState } from "react";
import ErrorMessage from "./login-error";
import { Link } from "react-router-dom";
import "../../styles/login-form.css";
import Api from '../../api-client'

function Login (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  return (
    <div className="login__container">
      <div className="login-subcontainer">
        <h1 className="login-title">Welcome Back</h1>
        {error.length > 0 && <ErrorMessage error={error} />}
        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={onEmailChange}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={onPasswordChange}
            value={password}
          />
          <input
            type="submit"
            className="login-form__button button"
            value="LOGIN"
          />
        </form>
        <p className="login-form__text">
          Don't have an account? Please click here to{" "}
          <Link
            className="button login-form__link"
            style={{ display: "inline" }}
            to={"/register"}
          >
            Register
        </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
