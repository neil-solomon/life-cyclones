import React from "react";
import css from "./Account.module.css";

export default class Account extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Account</h1>
        Registered user can view account info such as credit card, account
        balance, and delivery address.
      </div>
    );
  }
}
