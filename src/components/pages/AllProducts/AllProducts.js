import React from "react";
import css from "./AllProducts.module.css";

export default class AllProducts extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>AllProducts</h1>
        Visitors can view a list of all products.
        <br />
        Registered users can view a list of all products.
        <br />
        Manager can view a list of all products.
      </div>
    );
  }
}
