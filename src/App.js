import React from "react";
import css from "./App.module.css";
import "antd/dist/antd.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Login from "./components/Login";

export default class App extends React.Component {
  state = {
    userRole: "visitor",
    pageView: "Homepage",
    loginVisible: false,
    menuVisible: false,
  };

  toggleMenuVisible = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  toggleLoginVisible = () => {
    this.setState({ loginVisible: !this.state.loginVisible });
  };

  login = (userRole) => {
    this.setState({
      userRole: userRole,
      loginVisible: false,
      pageView: "Homepage",
    });
  };

  updatePageView = (pageView) => {
    this.setState({ pageView: pageView, menuVisible: false });
  };

  render() {
    console.log(this.state.pageView);
    return (
      <div className={css.container}>
        <Header
          toggleLoginVisible={this.toggleLoginVisible}
          toggleMenuVisible={this.toggleMenuVisible}
        />
        <Login
          loginVisible={this.state.loginVisible}
          toggleLoginVisible={this.toggleLoginVisible}
          login={this.login}
        />
        <Menu
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          userRole={this.state.userRole}
          updatePageView={this.updatePageView}
        />
        <Content pageView={this.state.pageView} />
      </div>
    );
  }
}
