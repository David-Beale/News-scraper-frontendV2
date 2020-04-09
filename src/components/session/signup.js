import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { Link } from "react-router-dom";
import "../../styles/signup-form.css";
import Api from '../../api-client';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      success: "",
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(e) {
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

  render() {
    return (
      <div className="signup__container">
        <div className="signup__title-container">
          <h1 className="signup__title">Welcome to News Feed</h1>
          <p>please complete the form to register your account</p>
          <br />
        </div>
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
        <form className="signup-form" onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            className="signup-form__input"
            placeholder="Enter Name"
            onChange={this.onChange}
            value={this.state.name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup-form__input"
            placeholder="Enter Email"
            onChange={this.onChange}
            value={this.state.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup-form__input"
            placeholder="Create Password"
            onChange={this.onChange}
            value={this.state.password}
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="signup-form__input"
            placeholder="Confirm Password"
            onChange={this.onChange}
            value={this.state.password2}
          />
          <input
            className="button signup-form__button"
            type="submit"
            value="SIGN UP"
          />
        </form>
        <p className="signup__text">
          Have An Account? Click here to
          <Link
            className="button signup-form__link"
            style={{ display: "inline" }}
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    );
  }
}

export default SignUp;
