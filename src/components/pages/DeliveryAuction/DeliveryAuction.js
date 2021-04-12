import React from "react";
import css from "./DeliveryAuction.module.css";

export default class DeliveryAuction extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>DeliveryAuction</h1>
        Delivery companies can view purchases and place bids on them.
        <br />
        Store clerks can select the winning bid and enter a reason for the
        selection.
      </div>
    );
  }
}
