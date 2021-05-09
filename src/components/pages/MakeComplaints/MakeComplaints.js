/*
Make Complaints

Registered user can file a complaint against another registered user, delivery company, or clerk.
Clerk user can file a complaint against a registered user or delivery company.
Manager user can file a complaint against a registered user or clerk.
*/

import React from "react";
import css from "./MakeComplaints.module.css";
import axios from "axios";

export default class MakeComplaints extends React.Component {
  state = {
    userSelect: "-",
    message: "",
  };

  updateUserSelect = (event) => {
    this.setState({ userSelect: event.target.value });
  };

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  submitComplaint = () => {
    console.log("submitComplaint", this.state.userSelect, this.state.message);
    if (this.state.message === "" || this.state.userSelect === "-") return;

    var againstUser = {
      __type: "Pointer",
      objectId: this.props.allUsers[this.state.userSelect].objectId,
    };

    var data = {
      from_against:
        this.props.allUsers[this.props.currentUserObjectId].role +
        "_" +
        this.props.allUsers[this.state.userSelect].role,
      message: this.state.message,
      user: {
        __type: "Pointer",
        className: "Registered_User",
        objectId: this.props.allUsers[this.props.currentUserObjectId].objectId,
      },
    };

    switch (this.props.allUsers[this.state.userSelect].role) {
      case "clerk":
        againstUser.className = "Store_Clerk";
        data.store_clerk = againstUser;
        break;
      case "manager":
        againstUser.className = "Store_Manager";
        data.manager = againstUser;
        break;
      case "computer":
        againstUser.className = "Computer";
        data.computer_store = againstUser;
        break;
      default:
        break;
    }

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Complaints", data)
      .then((response) => {
        console.log("submitComplaint", response.data);
      })
      .catch((error) => {
        console.log("submitComplaint", error);
      });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Make Complaints</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tr>
              <td>Username:</td>
              <td>
                <select
                  value={this.state.userSelect}
                  onChange={this.updateUserSelect}
                >
                  <option value="-">-</option>
                  {Object.keys(this.props.allUsers)
                    .filter(
                      (user) =>
                        user !== "visitor" &&
                        this.props.allUsers[user].role !== "delivery" &&
                        this.props.allUsers[user].role !== "registered"
                    )
                    .map((user) => (
                      <option
                        key={this.props.allUsers[user].objectId}
                        value={this.props.allUsers[user].objectId}
                      >
                        {this.props.allUsers[user].username} -{" "}
                        {this.props.allUsers[user].role}
                      </option>
                    ))}
                </select>
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
