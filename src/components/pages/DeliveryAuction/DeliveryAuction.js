/*
Delivery Auction

Delivery companies can view purchases and place bids on them.
Store clerks can select the winning bid and enter a reason for the selection.
*/

import React from "react";
import css from "./DeliveryAuction.module.css";
import axios from "axios";
import _ from "lodash";

export default class DeliveryAuction extends React.Component {
  state = {
    purchases: [],
  };

  componentDidMount = () => {
    this.getPurchases();
  };

  getPurchases = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Purchase")
      .then((response) => {
        console.log("getPurchases", response.data.results);
        var purchaseObjectId_to_index = {};
        var purchases = [];
        for (const purchase of response.data.results) {
          purchaseObjectId_to_index[purchase.objectId] = purchases.length;
          purchases.push({
            purchaseObjectId: purchase.objectId,
            deliverySelected: purchase?.delivery?.objectId,
            bids: [],
          });
        }

        this.getBids(purchases, purchaseObjectId_to_index);
      })
      .catch((error) => {
        console.log("getPurchases", error);
      });
  };

  getBids = (purchases, purchaseObjectId_to_index) => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Bidding")
      .then((response) => {
        for (const bid of response.data.results) {
          purchases[purchaseObjectId_to_index[bid.purchase.objectId]].bids.push(
            {
              price: bid.price,
              deliveryCompany: bid.delivery.objectId,
            }
          );
        }
        this.setState({ purchases });
      })
      .catch((error) => {
        console.log("getBids", error);
      });
  };

  submitBid = (purchaseIndex) => {
    /**
     * Make API call
     */
    console.log("submitBid", purchaseIndex);
    var inputElement = document.getElementById("bidInput_" + purchaseIndex);
    if (!inputElement) return;

    const bidValue = inputElement.value;
    if (bidValue === "" || isNaN(parseFloat(bidValue))) return;

    console.log("submitBid", bidValue, this.state.purchases[purchaseIndex]);

    const data = {
      purchase: {
        __type: "Pointer",
        className: "Purchase",
        objectId: this.state.purchases[purchaseIndex].purchaseObjectId,
      },
      price: parseFloat(bidValue),
      delivery: {
        __type: "Pointer",
        className: "Delivery",
        objectId: this.props.currentUserObjectId,
      },
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Bidding", data)
      .then((response) => {
        console.log("submitBid", response.data);
        this.getPurchases();
      })
      .catch((error) => {
        console.log("submitBid", error);
      });
  };

  submitBidSelection = (purchaseIndex) => {
    /**
     * Make API call
     */
    var selectElement = document.getElementById("bidSelect_" + purchaseIndex);
    var selectCommentElement = document.getElementById(
      "bidSelectComment_" + purchaseIndex
    );
    if (!selectElement || !selectCommentElement) return;

    console.log(
      "submitBidSelection",
      this.state.purchases[purchaseIndex].bids[parseInt(selectElement.value)]
    );

    const data = {
      delivery: {
        __type: "Pointer",
        className: "Delivery",
        objectId:
          this.state.purchases[purchaseIndex].bids[
            parseInt(selectElement.value)
          ].deliveryCompany,
      },
      tracking_info:
        "Assigned to delivery company: " +
        this.props.allUsers[
          this.state.purchases[purchaseIndex].bids[
            parseInt(selectElement.value)
          ].deliveryCompany
        ].username,
    };

    console.log(data);
    // return;

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .put(
        "https://parseapi.back4app.com/classes/Purchase/" +
          this.state.purchases[purchaseIndex].purchaseObjectId,
        data
      )
      .then((response) => {
        console.log("submitBidSelection", response.data.results);
        this.getPurchases();
      })
      .catch((error) => {
        console.log("submitBidSelection", error);
      });
  };

  render() {
    console.log(this.state.purchases);
    return (
      <div>
        <div className="pageHeader">Delivery Auction</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tbody>
              <tr>
                <td>
                  <strong>Purchase ID</strong>
                </td>
                <td>
                  <strong>Bids</strong>
                </td>
                <td>
                  <strong>
                    {this.props.allUsers[this.props.currentUserObjectId]
                      .role === "delivery"
                      ? "Enter Bid"
                      : "Select Bid"}
                  </strong>
                </td>
              </tr>
              {this.state.purchases.map((purchase, index0) => (
                <tr key={purchase.purchaseObjectId}>
                  <td>{purchase.purchaseObjectId}</td>
                  <td>
                    {purchase.bids.map((bid, index1) => (
                      <div
                        key={
                          "bidList" +
                          purchase.purchaseObjectId +
                          bid.deliveryCompany +
                          bid.amount
                        }
                      >
                        <span className={css.bidAmount}>${bid.price}</span>
                        {" - "}
                        {this.props.allUsers[bid.deliveryCompany].username}
                      </div>
                    ))}
                  </td>
                  <td>
                    {this.props.allUsers[this.props.currentUserObjectId]
                      .role === "delivery" && (
                      <>
                        <input
                          type="text"
                          id={"bidInput_" + index0}
                          style={{ marginRight: 10, width: 100 }}
                        />
                        <button
                          className="button"
                          onClick={() => this.submitBid(index0)}
                        >
                          Submit
                        </button>
                      </>
                    )}
                    {this.props.allUsers[this.props.currentUserObjectId]
                      .role === "clerk" && (
                      <>
                        <div style={{ marginBottom: 5 }}>
                          <select
                            style={{ width: 200 }}
                            id={"bidSelect_" + index0}
                          >
                            {purchase.bids.map((bid, index1) => (
                              <option
                                key={
                                  "bidSelect" +
                                  purchase.purchaseObjectId +
                                  bid.deliveryCompany +
                                  bid.amount
                                }
                                value={index1}
                              >
                                ${bid.price} -{" "}
                                {
                                  this.props.allUsers[bid.deliveryCompany]
                                    .username
                                }
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <textarea
                            row={3}
                            cols={30}
                            id={"bidSelectComment_" + index0}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <button
                            className="button"
                            onClick={() => this.submitBidSelection(index0)}
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
