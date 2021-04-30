/*
Make Complaints

Registered user can file a complaint against another registered user, delivery company, or clerk.
Clerk user can file a complaint against a registered user or delivery company.
Manager user can file a complaint against a registered user or clerk.
*/

import React from "react";
import css from "./MakeComplaints.module.css";

const userRoleToUserComplain = {
  registered: ["registered user", "delivery company", "store clerk"],
  clerk: ["registered user", "delivery company"],
  manager: ["registered user", "store clerk"],
};

export default class MakeComplaints extends React.Component {
  state = {
    userType: "",
    username: "",
    message: "",
  };

  updateUserType = (event) => {
    this.setState({ userType: event.target.value });
  };

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  submitComplaint = () => {
    /**
     * Make API call
     */

    console.log(
      "submitComplaint",
      this.state.userType,
      this.state.username,
      this.state.message
    );

    this.setState({ userType: "", username: "", message: "" });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Make Complaints</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tr>
              <td>Type Of User:</td>
              <td>
                <select
                  value={this.state.userType}
                  onChange={this.updateUserType}
                >
                  {userRoleToUserComplain[this.props.user.role].map(
                    (userRole) => (
                      <option key={userRole} value={userRole}>
                        {userRole}
                      </option>
                    )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.updateUsername}
                />
              </td>
            </tr>
            <tr>
              <td>Message:</td>
              <td>
                <textarea
                  rows={3}
                  cols={50}
                  value={this.state.message}
                  onChange={this.updateMessage}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className={css.submitComplaintButtonContainer}>
          <button className="button" onClick={this.submitComplaint}>
            Submit Complaint
          </button>
        </div>
      </div>
    );
  }
}
