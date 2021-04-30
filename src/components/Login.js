/*
This component uses Antd Modal to login, logout, and signup a user.
*/

import React from "react";
import css from "./Login.module.css";
import { Modal } from "antd";

export default class Login extends React.Component {
  state = {
    usernameInput: "",
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

  updateUsernameInput = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  handleLogin = () => {
    const userData = this.getUserData(
      this.state.usernameInput,
      this.state.passwordInput
    );
    this.props.login(userData);
    this.setState({ usernameInput: "", passwordInput: "" });
  };

  getUserData = () => {
    /**
     * Make API call
     */
    return {
      username: this.state.usernameInput,
      userId: "userId",
      role: this.state.usernameInput,
    };
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Modal
        title={this.props.user.role === "visitor" ? "Login / Signup" : "Logout"}
        visible={this.props.loginVisible}
        onOk={
          this.props.user.role === "visitor"
            ? this.handleLogin
            : this.handleLogout
        }
        okText={
          this.props.user.role === "visitor" ? "Login / Signup" : "Logout"
        }
        onCancel={this.props.toggleLoginVisible}
      >
        <div className={css.container}>
          {this.props.user.role === "visitor" && (
            <table>
              <tbody>
                <tr>
                  <td>Username:</td>
                  <td>
                    <input
                      type="text"
                      onChange={this.updateUsernameInput}
                      value={this.state.usernameInput}
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
            <div>Welcome back, {this.props.user.username}!</div>
          )}
        </div>
      </Modal>
    );
  }
}
