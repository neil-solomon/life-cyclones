/*
Account

Registered user can view account info such as credit card, account balance, and delivery address.
*/

import React from "react";
import css from "./Account.module.css";
import _ from "lodash";
import axios from "axios";

export default class Account extends React.Component {
  state = {
    userData: {
      creditCard: { number: "", expiry: "", code: "" },
      deliveryAddress: { address: "", zip: "" },
      name: { firstName: "", lastName: "" },
      accountBalance: 0,
    },
    depositAmount: 0,
    userPaymentObjectId: "",
  };

  componentDidMount = () => {
    this.getUserData();
  };

  getUserData = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Payment")
      .then((response) => {
        console.log("getUserData", response.data.results);
        for (const purchase of response.data.results) {
          if (purchase.user.objectId === this.props.user.objectId) {
            var userData = _.cloneDeep(this.state.userData);
            userData.creditCard.number = purchase.credit_card_num;
            userData.deliveryAddress.address = purchase.delivery_address;
            userData.name.firstName = purchase.first_name;
            userData.name.lastName = purchase.last_name;
            this.setState({ userData, userPaymentObjectId: purchase.objectId });
          }
        }
      })
      .catch((error) => {
        console.log("getUserData", error);
      });
  };

  updateFirstName = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.name.firstName = event.target.value;
    this.setState({ userData });
  };

  updateLastName = (event) => {
    var userData = _.cloneDeep(this.state.userData);
    userData.name.lastName = event.target.value;
    this.setState({ userData });
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
    const data = {
      delivery_address: this.state.userData.deliveryAddress.address,
      credit_card_num: this.state.userData.creditCard.number,
      first_name: this.state.userData.name.firstName,
      last_name: this.state.userData.name.lastName,
      user: {
        __type: "Pointer",
        className: "Registered_User",
        objectId: this.props.user.objectId,
      },
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };

    if (this.state.userPaymentObjectId === "") {
      axios
        .post("https://parseapi.back4app.com/classes/Payment", data)
        .then((response) => {
          console.log("saveInfo post", response.data);
        })
        .catch((error) => {
          console.log("saveInfo post", error);
        });
    } else {
      axios
        .put(
          "https://parseapi.back4app.com/classes/Payment/" +
            this.state.userPaymentObjectId,
          data
        )
        .then((response) => {
          console.log("saveInfo put", response.data);
        })
        .catch((error) => {
          console.log("saveInfo put", error);
        });
    }
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
              <td>Name</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>first name:</td>
              <td>
                <input
                  type="text"
                  onChange={this.updateFirstName}
                  value={this.state.userData.name.firstName}
                  style={{ width: 150 }}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>last name:</td>
              <td>
                <input
                  type="text"
                  onChange={this.updateLastName}
                  value={this.state.userData.name.lastName}
                  style={{ width: 150 }}
                />
              </td>
            </tr>
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
                  onChange={this.updateCreditCardNumber}
                  value={this.state.userData.creditCard.number}
                  style={{ width: 150 }}
                />
              </td>
            </tr>
            {/* <tr>
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
            </tr> */}
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
                  style={{ width: 300 }}
                />
              </td>
            </tr>
            {/* <tr>
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
            </tr> */}
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
