/*
Make Complaints

Registered user can file a complaint against another registered user, delivery company, or clerk.
Clerk user can file a complaint against a registered user or delivery company.
Manager user can file a complaint against a registered user or clerk.
*/

import React from "react";
import css from "./MakeComplaints.module.css";
import axios from "axios";
import { notification } from "antd";

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

    var data = {
      from_against:
        this.props.allUsers[this.props.currentUserObjectId].role +
        "_" +
        this.props.allUsers[this.state.userSelect].role,
      message: this.state.message,
    };

    switch (this.props.allUsers[this.state.userSelect].role) {
      case "registered":
        data.registered = {
          __type: "Pointer",
          className: "Registered_User",
          objectId: this.props.allUsers[this.state.userSelect].objectId,
        };
        break;
      case "clerk":
        data.clerk = {
          __type: "Pointer",
          className: "Store_Clerk",
          objectId: this.props.allUsers[this.state.userSelect].objectId,
        };
        break;
      case "manager":
        data.manager = {
          __type: "Pointer",
          className: "Store_Manager",
          objectId: this.props.allUsers[this.state.userSelect].objectId,
        };
        break;
      case "computer":
        data.computer = {
          __type: "Pointer",
          className: "Computer",
          objectId: this.props.allUsers[this.state.userSelect].objectId,
        };
        break;
      case "delivery":
        data.delivery = {
          __type: "Pointer",
          className: "Delivery",
          objectId: this.props.allUsers[this.state.userSelect].objectId,
        };
        break;
      default:
        break;
    }

    switch (this.props.allUsers[this.props.currentUserObjectId].role) {
      case "registered":
        data.registered = {
          __type: "Pointer",
          className: "Registered_User",
          objectId:
            this.props.allUsers[this.props.currentUserObjectId].objectId,
        };
        break;
      case "clerk":
        data.clerk = {
          __type: "Pointer",
          className: "Store_Clerk",
          objectId:
            this.props.allUsers[this.props.currentUserObjectId].objectId,
        };
        break;
      case "manager":
        data.manager = {
          __type: "Pointer",
          className: "Store_Manager",
          objectId:
            this.props.allUsers[this.props.currentUserObjectId].objectId,
        };
        break;
      case "computer":
        data.computer = {
          __type: "Pointer",
          className: "Computer",
          objectId:
            this.props.allUsers[this.props.currentUserObjectId].objectId,
        };
        break;
      case "delivery":
        data.delivery = {
          __type: "Pointer",
          className: "Delivery",
          objectId:
            this.props.allUsers[this.props.currentUserObjectId].objectId,
        };
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
        if (
          this.props.allUsers[this.props.currentUserObjectId].role === "manager"
        ) {
          this.updateWarnings(this.state.userSelect);
        }
        this.setState({
          message: "",
        });
      })
      .catch((error) => {
        console.log("submitComplaint", error);
      });
  };

  updateWarnings = (user) => {
    var url;
    switch (this.props.allUsers[user].role) {
      case "delivery":
        url = "Delivery";
        break;
      case "registered":
        url = "Registered_User";
        break;
      case "manager":
        url = "Store_Manager";
        break;
      case "clerk":
        url = "Store_Clerk";
        break;
      case "computer":
        url = "Computer";
        break;
      default:
        break;
    }

    const data = {
      warnings: this.props.allUsers[user].numWarnings + 1,
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .put("https://parseapi.back4app.com/classes/" + url + "/" + user, data)
      .then((response) => {
        console.log("updateWarnings", response.data);
        this.props.getAllUsers();
        if (this.props.allUsers[user].numWarnings === 2) {
          this.addToBlackList(user);
        }
      })
      .catch((error) => {
        console.log("updateWarnings", error);
      });
  };

  addToBlackList = (user) => {
    const data = {
      Email: this.props.allUsers[user].email,
      Manager_Comments: "User has 3 complaints.",
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Avoid_Emails", data)
      .then((response) => {
        console.log("addToBlackList", response.data);
        notification.open({
          message: "BlackList",
          description:
            this.props.allUsers[user].username +
            " has been automatically added to BlackList.",
        });
        this.props.getBlackListEmails();
      })
      .catch((error) => {
        console.log("addToBlackList", error);
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
                        this.props.allUsers[user].role !==
                          this.props.allUsers[this.props.currentUserObjectId]
                            .role
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
            {this.props.allUsers[this.props.currentUserObjectId].role ===
              "manager" &&
              this.state.userSelect !== "-" && (
                <tr>
                  <td>Warnings:</td>
                  <td>
                    {this.props.allUsers[this.state.userSelect].numWarnings}
                  </td>
                </tr>
              )}
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
