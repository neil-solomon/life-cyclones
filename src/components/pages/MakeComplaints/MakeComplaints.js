import React from "react";
import css from "./MakeComplaints.module.css";

export default class MakeComplaints extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>MakeComplaints</h1>
        Registered user can file a complaint against another registered user,
        delivery company, or clerk.
        <br />
        Clerk user can file a complaint against a registered user or delivery
        company.
        <br />
        Manager user can file a complaint against a registered user or clerk.
        <br />
      </div>
    );
  }
}
