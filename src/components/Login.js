import React from "react";
import css from "./Login.module.css";
import { Modal } from "antd";

export default class Login extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
  };

  updatePasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  updateUsernameInput = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  handleLogin = () => {
    this.props.login(this.state.usernameInput);
    this.setState({ usernameInput: "", passwordInput: "" });
  };

  render() {
    return (
      <Modal
        title="Login"
        visible={this.props.loginVisible}
        onOk={this.handleLogin}
        okText="Login"
        onCancel={this.props.toggleLoginVisible}
      >
        Username:{" "}
        <input
          type="text"
          onChange={this.updateUsernameInput}
          value={this.state.usernameInput}
        />
        <br />
        Password:{" "}
        <input
          type="password"
          onChange={this.updatePasswordInput}
          value={this.state.passwordInput}
        />
      </Modal>
    );
  }
}
