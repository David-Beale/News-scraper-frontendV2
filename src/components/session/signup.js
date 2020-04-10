import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { Link } from "react-router-dom";
import "../../styles/signup-form.css";
import Api from '../../api-client';
import logo from "../../assets/icon.png";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      success: "",
      errors: [],
      active: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit (e) {
    e.preventDefault();
    const post = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    Api.register(post)
      .then(data => {
        if (data.error) {
          this.setState({ errors: data.error });
        } else if (data.success) {
          this.setState({ success: data.success });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 2000);
        }
      });
  }
  onFocus () {
    this.setState({ active: true });
  }
  onBlur(e) {
    if (e.target.value === "") this.setState({ active: false });
  }

  render () {
    return (
      <div className="login__container">
        <div className="login-subcontainer">
          <form className="login-form" onSubmit={this.onSubmit}>
            <img className="session-logo" src={logo} alt="logo" />
            <h1>Welcome</h1>
            <h1>Please register</h1>
            <div className="error-container">
              {this.state.errors.length > 0 &&
                this.state.errors.map(error => {
                  return (
                    <div>
                      <ErrorMessage error={error} />
                    </div>
                  );
                })}
              {this.state.success.length > 0 && (
                <SuccessMessage success={this.state.success} />
              )}

            </div>
            <div className="txtb">
              <input
                type="text"
                id="name"
                name="name"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={this.state.name}
                className={this.state.active ? 'focus' : ''}
              />
              <span data-placeholder="Name"></span>
            </div>
            <div className="txtb">
              <input
                type="text"
                id="email"
                name="email"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={this.state.email}
                className={this.state.active ? 'focus' : ''}
              />
              <span data-placeholder="Email"></span>
            </div>
            <div className="txtb">
              <input
                type="password"
                id="password"
                name="password"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={this.state.password}
                className={this.state.active ? 'focus' : ''}
              />
              <span data-placeholder="Password"></span>
            </div>
            <div className="txtb">
              <input
                type="password"
                id="password2"
                name="password2"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={this.state.password2}
                className={this.state.active ? 'focus' : ''}
              />
              <span data-placeholder="Confirm Password"></span>
            </div>
            <input
              type="submit"
              className="logbtn"
              value="Register"
            />
            <div className="bottom-text">
              Already have an account? <Link
                to={"/login"}
              >
                Login
        </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
