import React from "react";
import css from "./Header.module.css";
import { ReactComponent as TornadoIcon } from "../icons/tornado.svg";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

export default class Header extends React.Component {
  state = {};

  render() {
    return (
      <div className={css.container}>
        <MenuUnfoldOutlined
          onClick={this.props.toggleMenuVisible}
          className={css.menuIcon}
        />
        <div
          className={css.fullTitle}
          onClick={() => this.props.updatePageView("Homepage")}
        >
          <div className={css.title}>Life Cyclones</div>
          <TornadoIcon className={css.tornadoIcon} />
          <div className={css.subtitle}>Online Computer Store</div>
        </div>
        <div className={css.userButton} onClick={this.props.toggleLoginVisible}>
          <UserOutlined className={css.userIcon} />
          <div className={css.username}>{this.props.user.username}</div>
        </div>
      </div>
    );
  }
}
