/*
View Complaints

Registered user can view complaints filed against them.
Store clerk can view complaints filed against them.
Delivery company can view complaints filed against them.
Computer company can view complaints filed against their products.
*/

import React from "react";
import css from "./ViewComplaints.module.css";
import axios from "axios";

export default class ViewComplaints extends React.Component {
  state = {
    complaints: [],
  };

  componentDidMount = () => {
    this.getComplaints();
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
          if (
            complaint?.manager?.objectId ===
              this.props.allUsers[this.props.currentUserObjectId].objectId ||
            complaint?.store_clerk?.objectId ===
              this.props.allUsers[this.props.currentUserObjectId].objectId ||
            complaint?.computer_store?.objectId ===
              this.props.allUsers[this.props.currentUserObjectId].objectId
          ) {
            complaints.push({
              objectId: complaint.objectId,
              dateTime: complaint.updatedAt,
              userWhoMadeComplaint: complaint.user.objectId,
              message: complaint.message,
            });
          }
        }
        this.setState({ complaints });
      })
      .catch((error) => {
        console.log("getComplaints", error);
      });
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
                <td>
                  {this.props.allUsers[complaint.userWhoMadeComplaint].username}
                </td>
                <td>{complaint.message}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
