import React from "react";
import css from "./Header.module.css";

export default class Header extends React.Component {
  state = {};

  render() {
    return (
      <div className={css.container}>
        <button onClick={this.props.toggleMenuVisible}>Menu</button>
        <strong>Life Cyclones Online Computer Store</strong>
        <button onClick={this.props.toggleLoginVisible}>Login</button>
      </div>
    );
  }
}
