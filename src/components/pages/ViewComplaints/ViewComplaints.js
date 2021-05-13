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
            complaint.from_against.split("_")[1] ===
            this.props.allUsers[this.props.currentUserObjectId].role
          ) {
            complaints.push({
              objectId: complaint.objectId,
              dateTime: complaint.updatedAt,
              userWhoMadeComplaint:
                complaint[complaint.from_against.split("_")[0]].objectId,
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
                <strong>Date &amp; Time</strong>
              </td>
              <td>
                <strong>Complaint Message</strong>
              </td>
            </tr>
            {this.state.complaints.map((complaint, index) => (
              <tr key={index}>
                <td>
                  {this.props.allUsers[complaint.userWhoMadeComplaint].username}
                  {" - "}
                  {this.props.allUsers[complaint.userWhoMadeComplaint].role}
                </td>
                <td>{complaint.dateTime}</td>
                <td>{complaint.message}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
