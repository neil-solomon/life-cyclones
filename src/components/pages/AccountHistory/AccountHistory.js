/*
Account History

Registered user can view past account activity such as product comments,
product complaints, product votes (stars), delivery complaints, clerk
complaints, and purchases.
*/

import React from "react";
import css from "./AccountHistory.module.css";
import { StarFilled } from "@ant-design/icons";
import axios from "axios";
import _ from "lodash";

const userDataKeyToHeader = {
  purchases: "Purchases",
  productReviews: "Product Reviews",
  complaints: "Complaints Made",
};

export default class AccountHistory extends React.Component {
  state = {
    userData: null,
  };

  componentDidMount = () => {
    this.getAllUserData();
  };

  getAllUserData = () => {
    this.getPurchases();
    this.getProductReviews();
    this.getComplaints();
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
        var purchases = [];
        for (const purchase of response.data.results) {
          if (purchase.user.objectId === this.props.user.objectId) {
            purchases.push({
              productObjectId: purchase.product.objectId,
              dateTime: purchase.createdAt,
            });
          }
        }
        var userData = _.cloneDeep(this.state.userData);
        if (userData === null) {
          userData = {};
        }
        userData.purchases = purchases;
        this.setState({ userData });
      })
      .catch((error) => {
        console.log("getPurchases", error);
      });
  };

  getProductReviews = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Product_Comments")
      .then((response) => {
        console.log("getProductReviews", response.data.results);
        var productReviews = [];
        for (const review of response.data.results) {
          if (review.user.objectId === this.props.user.objectId) {
            productReviews.push({
              productObjectId: review.product.objectId,
              dateTime: review.updatedAt,
              rating: review.stars,
              message: review.message,
            });
          }
        }
        var userData = _.cloneDeep(this.state.userData);
        if (userData === null) {
          userData = {};
        }
        userData.productReviews = productReviews;
        this.setState({ userData });
      })
      .catch((error) => {
        console.log("getProductReviews", error);
      });
  };

  getComplaints = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Complaints")
      .then((response) => {
        console.log("getComplaints", response.data.results);
        var complaints = [];
        for (const complaint of response.data.results) {
          if (complaint.user.objectId === this.props.user.objectId) {
            complaints.push({
              dateTime: complaint.updatedAt,
              message: complaint.message,
            });
            switch (complaint.from_against.split("_")[1]) {
              case "manager":
                complaints[complaints.length - 1].against =
                  "manager - " + complaint.manager.objectId;
                break;
              case "storeClerk":
                complaints[complaints.length - 1].against =
                  "store clerk - " + complaint.store_clerk.objectId;
                break;
              case "computerStore":
                complaints[complaints.length - 1].against =
                  "computer store - " + complaint.computer_store.objectId;
                break;
              default:
                break;
            }
          }
        }
        if (complaints.length === 0) {
          return;
        }
        var userData = _.cloneDeep(this.state.userData);
        if (userData === null) {
          userData = {};
        }
        userData.complaints = complaints;
        this.setState({ userData });
      })
      .catch((error) => {
        console.log("getComplaints", error);
      });
  };

  getUserData = () => {
    /**
     * Make API call
     */
    const userData = {
      purchases: [
        {
          product_id: "111",
          dateTime: "2020-04-29_07:15",
        },
        {
          product_id: "222",
          dateTime: "2020-05-19_17:27",
        },
      ],
      productComments: [
        {
          product_id: "111",
          dateTime: "2020-04-30_07:15",
          message: "This product is great!",
        },
      ],
      productRatings: [
        {
          product_id: "111",
          dateTime: "2020-04-30_07:15",
          rating: 4,
        },
        {
          product_id: "222",
          dateTime: "2020-05-20_07:15",
          rating: 2,
        },
      ],
      productComplaints: [
        {
          product_id: "222",
          dateTime: "2020-05-20_07:15",
          message: "It's not fast enough.",
        },
      ],
      deliveryComplaints: [
        {
          deliveryCompany: "PC Delivery Inc",
          dateTime: "2020-05-20_06:15",
          message: "The driver kicked my dog when he dropped off my package.",
        },
      ],
      clerkComplaints: [
        {
          clerk: "userClerk1",
          dateTime: "2020-04-29_08:15",
          message: "The clerk told me the wrong price for the product.",
        },
      ],
    };

    this.setState({ userData: userData });
  };

  render() {
    if (this.state.userData === null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="pageHeader">Account History</div>
        <div className={css.tableContainer}>
          <table align="center">
            <tbody>
              {Object.keys(this.state.userData).map((userDataKey) => (
                <>
                  <tr key={userDataKey} className={css.row}>
                    <td className={css.rowHeader}>
                      {userDataKeyToHeader[userDataKey]}
                    </td>
                    <td>
                      {this.state.userData[userDataKey].map(
                        (userDataEntryElement, index) => (
                          <div
                            className={css.userDataElementEntry}
                            key={"userDataEntryElement" + index}
                          >
                            {Object.keys(userDataEntryElement).map(
                              (userDataEntryElementKey) => (
                                <div key={userDataEntryElementKey}>
                                  {userDataEntryElementKey}:{" "}
                                  {
                                    userDataEntryElement[
                                      userDataEntryElementKey
                                    ]
                                  }
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.spacerRow}></td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
