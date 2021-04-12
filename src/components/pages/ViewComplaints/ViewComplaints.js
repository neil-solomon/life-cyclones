import React from "react";
import css from "./ViewComplaints.module.css";

export default class ViewComplaints extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>ViewComplaints</h1>
        Registered user can view complaints filed against them.
        <br />
        Store clerk can view complaints filed against them.
        <br />
        Delivery company can view complaints filed against them.
        <br />
        Computer company can view complaints filed against their products.
      </div>
    );
  }
}
