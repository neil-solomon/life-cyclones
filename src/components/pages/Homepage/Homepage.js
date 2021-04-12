import React from "react";
import css from "./Homepage.module.css";

export default class Homepage extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <h2>
          Hello {this.props.user.username}! Your role is {this.props.user.role}.
        </h2>
        Includes a list of the 3 most popular products and a list of 3 products
        chosen by the manager.
      </div>
    );
  }
}
