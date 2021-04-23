import React from "react";
import css from "./App.module.css";
import "antd/dist/antd.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Login from "./components/Login";

export default class App extends React.Component {
  state = {
    user: {
      username: "visitor",
      userId: "",
      role: "visitor",
    },
    pageView: "Homepage",
    loginVisible: false,
    menuVisible: false,
  };

  toggleMenuVisible = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  toggleLoginVisible = () => {
    this.setState({
      loginVisible: !this.state.loginVisible,
      menuVisible: false,
    });
  };

  login = (userData) => {
    this.setState({
      user: userData,
    });
  };

  logout = () => {
    this.setState({
      user: {
        username: "visitor",
        userId: "",
        role: "visitor",
      },
      pageView: "Homepage",
    });
  };

  updatePageView = (pageView) => {
    this.setState({ pageView: pageView, menuVisible: false });
  };

  render() {
    return (
      <div className={css.container}>
        <Header
          toggleLoginVisible={this.toggleLoginVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          updatePageView={this.updatePageView}
          user={this.state.user}
        />
        <Login
          loginVisible={this.state.loginVisible}
          toggleLoginVisible={this.toggleLoginVisible}
          login={this.login}
          logout={this.logout}
          user={this.state.user}
        />
        <Menu
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          user={this.state.user}
          updatePageView={this.updatePageView}
        />
        <Content
          pageView={this.state.pageView}
          user={this.state.user}
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
        />
      </div>
    );
  }
}
