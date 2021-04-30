/*
View Complaints

Registered user can view complaints filed against them.
Store clerk can view complaints filed against them.
Delivery company can view complaints filed against them.
Computer company can view complaints filed against their products.
*/

import React from "react";
import css from "./ViewComplaints.module.css";

export default class ViewComplaints extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className="pageHeader">ViewComplaints</div>
      </div>
    );
  }
}
