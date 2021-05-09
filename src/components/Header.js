/*
This component is the sticky header for the app.
*/

import React from "react";
import css from "./Header.module.css";
import { ReactComponent as TornadoIcon } from "../icons/tornado.svg";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

export default class Header extends React.Component {
  state = {
    fullTitleHover: false,
  };

  render() {
    return (
      <>
        <div className={css.container}>
          <MenuUnfoldOutlined
            onClick={this.props.toggleMenuVisible}
            className={css.menuIcon}
          />
          <div
            className={css.fullTitle}
            onClick={() => this.props.updatePageView("Homepage")}
            onMouseEnter={() => this.setState({ fullTitleHover: true })}
            onMouseLeave={() => this.setState({ fullTitleHover: false })}
          >
            <div className={css.title}>Life Cyclones</div>
            <TornadoIcon
              className={css.tornadoIcon}
              style={{
                fill: this.state.fullTitleHover ? "#7c4dff" : "#212121",
              }}
            />
            <div className={css.subtitle}>Online Computer Store</div>
          </div>
          <div
            className={css.userButton}
            onClick={this.props.toggleLoginVisible}
          >
            <UserOutlined className={css.userIcon} />
            <div className={css.username}>
              {this.props.allUsers[this.props.currentUserObjectId].username}
            </div>
          </div>
        </div>
        <div className={css.bottomBorder}></div>
      </>
    );
  }
}
