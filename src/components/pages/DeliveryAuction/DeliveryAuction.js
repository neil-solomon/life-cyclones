/*
Delivery Auction

Delivery companies can view purchases and place bids on them.
Store clerks can select the winning bid and enter a reason for the selection.
*/

import React from "react";
import css from "./DeliveryAuction.module.css";
import axios from "axios";

export default class DeliveryAuction extends React.Component {
  state = {
    purchases: [],
  };

  componentDidMount = () => {
    this.getBids();
  };

  getBids = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Bidding")
      .then((response) => {
        /**
         * In the Bidding table, user is actually Purchase
         */
        var purchaseToBids = {};
        console.log("getBids", response.data.results);
        for (const bid of response.data.results) {
          if (purchaseToBids[bid.user.objectId]) {
            purchaseToBids[bid.user.objectId].push({
              deliveryCompanyObjectId: bid.delivery_company,
              amount: bid.price,
              product: bid.product,
            });
          } else {
            purchaseToBids[bid.user.objectId] = [
              {
                deliveryCompanyObjectId: bid.delivery_company,
                amount: bid.price,
                product: bid.product,
              },
            ];
          }
        }
        var purchases = [];
        for (const purchaseObjectId of Object.keys(purchaseToBids)) {
          purchases.push({
            purchaseObjectId: purchaseObjectId,
            bids: purchaseToBids[purchaseObjectId],
          });
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
    if (bidValue === "") return;

    console.log("submitBid", bidValue, this.state.purchases[purchaseIndex]);

    const data = {
      product: this.state.purchases[purchaseIndex].bids[0].product,
      price: bidValue,
      delivery_company: this.props.allUsers[this.props.currentUserObjectId]
        .objectId,
      user: {
        // In the Bidding table, user is actually Purchase
        __type: "Pointer",
        className: "Purchase",
        objectId: this.state.purchases[purchaseIndex].purchaseObjectId,
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
        this.getBids();
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

    const selectedBid = this.state.purchases[purchaseIndex].bids?.[
      selectElement?.value
    ];
    const bidComment = selectCommentElement.value;
    if (!selectedBid || !bidComment) return;

    console.log("submitBidSelection", selectedBid, bidComment);
  };

  render() {
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
                          bid.deliveryCompanyObjectId
                        }
                      >
                        <span className={css.bidAmount}>{bid.amount}</span>
                        {" - "}
                        {
                          this.props.allUsers[bid.deliveryCompanyObjectId]
                            .username
                        }
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
                                  bid.deliveryCompany
                                }
                                value={index1}
                              >
                                ${bid.amount} - {bid.deliveryCompany}
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
