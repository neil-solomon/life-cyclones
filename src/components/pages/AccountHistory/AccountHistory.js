/*
Account History

Registered user can view past account activity such as product comments,
product complaints, product votes (stars), delivery complaints, clerk
complaints, and purchases.
*/

import React from "react";
import css from "./AccountHistory.module.css";
import { StarFilled } from "@ant-design/icons";

const userDataKeyToHeader = {
  purchases: "Purchases",
  productComments: "Product Comments",
  productRatings: "Product Ratings",
  productComplaints: "Product Complaints",
  clerkComplaints: "Clerk Complaints",
  deliveryComplaints: "Delivery Complaints",
};

export default class AccountHistory extends React.Component {
  state = {
    userData: null,
  };

  componentDidMount = () => {
    this.getUserData();
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
    if (!this.state.userData) {
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
