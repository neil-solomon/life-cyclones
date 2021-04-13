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
        {this.props.user.role === "visitor" && (
          <h3>
            The homepage and menu render differently according to the type of
            user that is logged in. To test this click Login, enter a username,
            then click the Login button. For username use "registered",
            "manager", "clerk", "delivery", or "computer".
          </h3>
        )}
        Includes a list of the 3 most popular products and a list of 3 products
        chosen by the manager.
      </div>
    );
  }
}
