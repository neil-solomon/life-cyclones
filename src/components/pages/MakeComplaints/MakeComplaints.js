/*
Make Complaints

Registered user can file a complaint against another registered user, delivery company, or clerk.
Clerk user can file a complaint against a registered user or delivery company.
Manager user can file a complaint against a registered user or clerk.
*/

import React from "react";
import css from "./MakeComplaints.module.css";

export default class MakeComplaints extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className="pageHeader">MakeComplaints</div>
      </div>
    );
  }
}
