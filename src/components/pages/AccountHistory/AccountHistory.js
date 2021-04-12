import React from "react";
import css from "./AccountHistory.module.css";

export default class AccountHistory extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>AccountHistory</h1>
        Registered user can view past account activity such as product comments,
        product complaints, product votes (stars), delivery complaints, clerk
        complaints, and purchases.
      </div>
    );
  }
}
