/*
This component uses Antd Modal to login, logout, and signup a user.
*/

import React from "react";
import css from "./Login.module.css";
import { Modal } from "antd";

export default class Login extends React.Component {
  state = {
    emailInput: "",
    passwordInput: "",
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydown);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeydown);
  };

  handleKeydown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };

  updatePasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  updateEmailInput = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  handleLogin = () => {
    this.props.login({
      email: this.state.emailInput,
      password: this.state.passwordInput,
    });
    this.setState({ emailInput: "", passwordInput: "" });
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleSignUp = () => {
    this.props.signUp({
      email: this.state.emailInput,
      password: this.state.passwordInput,
    });
  };

  render() {
    return (
      <Modal
        title={"Account"}
        visible={this.props.loginVisible}
        onCancel={this.props.toggleLoginVisible}
        footer={
          <div>
            {this.props.user.role === "visitor" && (
              <>
                <button
                  className="button"
                  onClick={this.handleLogin}
                  style={{ marginRight: 15 }}
                >
                  Login
                </button>
                <button className="button" onClick={this.handleSignUp}>
                  SignUp
                </button>
              </>
            )}
            {this.props.user.role !== "visitor" && (
              <>
                <button className="button" onClick={this.handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        }
      >
        <div className={css.container}>
          {this.props.user.role === "visitor" && (
            <table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input
                      type="text"
                      onChange={this.updateEmailInput}
                      value={this.state.emailInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>
                    <input
                      type="password"
                      onChange={this.updatePasswordInput}
                      value={this.state.passwordInput}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {this.props.user.role !== "visitor" && (
            <div>
              Welcome back, {this.props.user.username}! <br /> Your role is{" "}
              {this.props.user.role}.
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
