/*
Account

Registered user can view account info such as credit card, account balance, and delivery address.
*/

import React from "react";
import css from "./Account.module.css";
import _ from "lodash";

export default class Account extends React.Component {
  state = {
    userData: null,
    depositAmount: 0,
  };

  componentDidMount = () => {
    this.getUserData();
  };

  getUserData = () => {
    /**
     * Make API call
     */
    const userData = {
      creditCard: {
        number: "0102030405060708",
        expiry: "01/23",
        code: "123",
      },
      deliveryAddress: {
        address: "123 life cyclone ave",
        zip: "12345",
      },
      accountBalance: 3000,
    };

    this.setState({ userData: userData });
  };

  updateCreditCardNumber = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.creditCard.number = event.target.value;
    this.setState({ userData });
  };

  updateCreditCardExpiry = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.creditCard.expiry = event.target.value;
    this.setState({ userData });
  };

  updateCreditCardCode = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.creditCard.code = event.target.value;
    this.setState({ userData });
  };

  updateDeliveryAddressAddress = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.deliveryAddress.address = event.target.value;
    this.setState({ userData });
  };

  updateDeliveryAddressZip = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.deliveryAddress.zip = event.target.value;
    this.setState({ userData });
  };

  updateDepositAmount = (event) => {
    this.setState({ depositAmount: event.target.value });
  };

  depositToAccount = () => {
    /**
     * Make API call
     */
    console.log("deopsitToAccount", this.state.depositAmount);
    this.setState({ depositAmount: 0 });
  };

  saveInfo = () => {
    /**
     * Make API call
     */
    console.log("saveInfo", this.state.userData);
  };

  render() {
    if (!this.state.userData) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="pageHeader">Account</div>
        <table align="center">
          <tbody>
            <tr>
              <td>Credit Card</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>cc number:</td>
              <td>
                <input
                  type="text"
                  maxLength={16}
                  onChange={this.updateCreditCardNumber}
                  value={this.state.userData.creditCard.number}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>cc expiry:</td>
              <td>
                <input
                  type="text"
                  maxLength={5}
                  onChange={this.updateCreditCardExpiry}
                  value={this.state.userData.creditCard.expiry}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>cc code:</td>
              <td>
                <input
                  type="text"
                  maxLength={3}
                  onChange={this.updateCreditCardCode}
                  value={this.state.userData.creditCard.code}
                />
              </td>
            </tr>
            <tr>
              <td>Delivery Address</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>address:</td>
              <td>
                <input
                  type="text"
                  onChange={this.updateDeliveryAddressAddress}
                  value={this.state.userData.deliveryAddress.address}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>zip:</td>
              <td>
                <input
                  type="text"
                  maxLength={5}
                  onChange={this.updateDeliveryAddressZip}
                  value={this.state.userData.deliveryAddress.zip}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={css.saveInfoButtonContainer}>
          <button className="button" onClick={this.saveInfo}>
            <div className={css.saveInfoButton}>Save Info</div>
          </button>
        </div>
        <div className={css.accountBalance}>
          <div>
            Account Balance:{" "}
            <span className={css.accountBalanceAmount}>
              ${this.state.userData.accountBalance}
            </span>
          </div>
          <div>
            <input
              type="number"
              value={this.state.depositAmount}
              onChange={this.updateDepositAmount}
              style={{ marginRight: "25px" }}
            />
            <button className="button" onClick={this.depositToAccount}>
              Deposit To Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
