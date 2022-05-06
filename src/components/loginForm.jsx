import React, { Component } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "../common/form";
import auth from "../services/authService.js";
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      const errors = { ...this.state.errors };
      if (ex.response && ex.response.status === 400) {
        errors.username = ex.reponse.data;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("login")}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
