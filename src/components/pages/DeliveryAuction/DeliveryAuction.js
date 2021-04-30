/*
Delivery Auction

Delivery companies can view purchases and place bids on them.
Store clerks can select the winning bid and enter a reason for the selection.
*/

import React from "react";
import css from "./DeliveryAuction.module.css";

export default class DeliveryAuction extends React.Component {
  state = {
    purchases: [],
  };

  componentDidMount = () => {
    this.getPurchases();
  };

  getPurchases = () => {
    /**
     * Make API call
     */
    const purchases = [
      {
        purchase_id: "111",
        bids: [
          {
            deliveryCompany: "Fast Delivery Inc",
            amount: 5.99,
          },
          {
            deliveryCompany: "UPS",
            amount: 4.99,
          },
        ],
      },
      {
        purchase_id: "222",
        bids: [
          {
            deliveryCompany: "Fast Delivery Inc",
            amount: 3.99,
          },
          {
            deliveryCompany: "FedEx",
            amount: 5.99,
          },
          {
            deliveryCompany: "UPS",
            amount: 4.99,
          },
        ],
      },

      {
        purchase_id: "333",
        bids: [
          {
            deliveryCompany: "UPS",
            amount: 4.99,
          },
        ],
      },
      {
        purchase_id: "444",
        bids: [
          {
            deliveryCompany: "Fast Delivery Inc",
            amount: 6.99,
          },
          {
            deliveryCompany: "FedEx",
            amount: 5.49,
          },
          {
            deliveryCompany: "UPS",
            amount: 4.59,
          },
          {
            deliveryCompany: "USPS",
            amount: 4.99,
          },
        ],
      },
    ];

    this.setState({ purchases: purchases });
  };

  submitBid = (purchaseIndex) => {
    /**
     * Make API call
     */
    var inputElement = document.getElementById("bidInput_" + purchaseIndex);
    if (!inputElement) return;

    const bidValue = parseInt(inputElement.value);
    if (isNaN(bidValue)) return;

    console.log(
      "submitBid",
      bidValue,
      this.state.purchases[purchaseIndex].purchase_id
    );
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
            <tr>
              <td>
                <strong>Purchase ID</strong>
              </td>
              <td>
                <strong>Bids</strong>
              </td>
              <td>
                <strong>
                  {this.props.user.role === "delivery"
                    ? "Enter Bid"
                    : "Select Bid"}
                </strong>
              </td>
            </tr>
            {this.state.purchases.map((purchase, index0) => (
              <tr key={purchase.purchase_id}>
                <td>{purchase.purchase_id}</td>
                <td>
                  {purchase.bids.map((bid, index1) => (
                    <div
                      key={
                        "bidList" + purchase.purchase_id + bid.deliveryCompany
                      }
                    >
                      <span className={css.bidAmount}>${bid.amount}</span>
                      {" - "}
                      {bid.deliveryCompany}
                    </div>
                  ))}
                </td>
                <td>
                  {this.props.user.role === "delivery" && (
                    <>
                      <input
                        type="number"
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
                  {this.props.user.role === "clerk" && (
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
                                purchase.purchase_id +
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
          </table>
        </div>
      </div>
    );
  }
}
