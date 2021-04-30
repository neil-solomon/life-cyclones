/*
Delivery Tracking

Delivery company can enter tracking information for each purchase that
they are in charge of delivering.
*/

import React from "react";
import css from "./DeliveryTracking.module.css";

export default class DeliveryTracking extends React.Component {
  state = {
    purchases: [],
  };

  componentDidMount = () => {
    this.getPurchases();
  };

  getPurchases = () => {
    /**
     * Make API call
     * Get the purchases which the current delivery user is responsible for
     */

    const purchases = [
      {
        purchase_id: "1234",
        deliveryStatus: "in the warehouse",
      },
      {
        purchase_id: "1111",
        deliveryStatus: "out for delivery",
      },
      {
        purchase_id: "4321",
        deliveryStatus: "5 stops away",
      },
      {
        purchase_id: "3333",
        deliveryStatus: "delivered",
      },
    ];

    this.setState({ purchases: purchases });
  };

  updateDeliveryStatus = (purchase_id, purchaseIndex) => {
    /**
     * Make API call
     */

    var inputElement = document.getElementById(
      "updateDeliveryStatusInput_" + purchaseIndex
    );
    if (!inputElement) return;

    console.log(
      "updateDeliveryStatus",
      purchase_id,
      purchaseIndex,
      inputElement.value
    );
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Delivery Tracking</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tbody>
              <tr>
                <td>
                  <strong>Purchase ID</strong>
                </td>
                <td>
                  <strong>Delivery Status</strong>
                </td>
                <td>
                  <strong>Update Delivery Status</strong>
                </td>
              </tr>
              {this.state.purchases.map((purchase, index) => (
                <tr key={purchase.purchase_id}>
                  <td>{purchase.purchase_id}</td>
                  <td>{purchase.deliveryStatus}</td>
                  <td>
                    <input
                      type="text"
                      id={"updateDeliveryStatusInput_" + index}
                      style={{ marginRight: 10 }}
                    />
                    <button
                      className="button"
                      onClick={() =>
                        this.updateDeliveryStatus(purchase.purchase_id, index)
                      }
                    >
                      Update
                    </button>
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
