/*
View Complaints

Registered user can view complaints filed against them.
Store clerk can view complaints filed against them.
Delivery company can view complaints filed against them.
Computer company can view complaints filed against their products.
*/

import React from "react";
import css from "./ViewComplaints.module.css";

export default class ViewComplaints extends React.Component {
  state = {
    complaints: [],
  };

  componentDidMount = () => {
    this.getComplaints();
  };

  getComplaints = () => {
    /**
     * Make API call
     * Get all complaints associated with the current user
     */

    const complaints = [
      {
        user: "manager",
        message: "Inappropriate language use in the forum.",
      },
      {
        user: "clerk9",
        message: "Customer asked too many annoying questions.",
      },
      {
        user: "FedEx",
        message: "Customer gave wrong delivery address.",
      },
    ];

    this.setState({ complaints: complaints });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">View Complaints</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tr>
              <td>
                <strong>User Who Made Complaint</strong>
              </td>
              <td>
                <strong>Complaint Message</strong>
              </td>
            </tr>

            {this.state.complaints.map((complaint, index) => (
              <tr key={index}>
                <td>{complaint.user}</td>
                <td>{complaint.message}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
