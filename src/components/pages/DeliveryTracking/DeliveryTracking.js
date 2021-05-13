/*
Delivery Tracking

Delivery company can enter tracking information for each purchase that
they are in charge of delivering.
*/

import React from "react";
import css from "./DeliveryTracking.module.css";
import axios from "axios";
import _ from "lodash";

export default class DeliveryTracking extends React.Component {
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
        const purchases = response.data.results.filter((purchase) => {
          return typeof purchase.delivery !== "undefined";
        });
        this.setState({ purchases });
      })
      .catch((error) => {
        console.log("getPurchases", error);
      });
  };

  updateDeliveryStatus = (purchaseObjecId, purchaseIndex) => {
    var inputElement = document.getElementById(
      "updateDeliveryStatusInput_" + purchaseIndex
    );
    if (!inputElement || inputElement.value === "") return;

    const data = {
      tracking_info: inputElement.value,
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .put(
        "https://parseapi.back4app.com/classes/Purchase/" + purchaseObjecId,
        data
      )
      .then((response) => {
        console.log("updateDeliveryStatus", response.data.results);
        this.getPurchases();
      })
      .catch((error) => {
        console.log("updateDeliveryStatus", error);
      });
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
                <tr key={purchase.objectId}>
                  <td>{purchase.objectId}</td>
                  <td>{purchase.tracking_info}</td>
                  <td>
                    <input
                      type="text"
                      id={"updateDeliveryStatusInput_" + index}
                      style={{ marginRight: 10 }}
                    />
                    <button
                      className="button"
                      onClick={() =>
                        this.updateDeliveryStatus(purchase.objectId, index)
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
