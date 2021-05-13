/*
Blacklist

Manager can blacklist or un-blacklist any user such as registered user,
delivery, or computer company
*/

import React from "react";
import css from "./Blacklist.module.css";
import axios from "axios";

export default class Blacklist extends React.Component {
  state = {
    blacklist: [],
    email: "",
    reason: "",
  };

  componentDidMount = () => {
    this.getBlackList();
  };

  getBlackList = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Avoid_Emails")
      .then((response) => {
        console.log("getBlackList", response.data.results);
        const blacklist = response.data.results.map((result) => {
          return {
            email: result.Email,
            message: result.Manager_Comments,
            objectId: result.objectId,
          };
        });
        this.setState({ blacklist: blacklist });
      })
      .catch((error) => {
        console.log("getBlackList", error);
      });
  };

  removeFromBlacklist = (objectId) => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .delete("https://parseapi.back4app.com/classes/Avoid_Emails/" + objectId)
      .then((response) => {
        console.log("removeFromBlacklist", response.data);
        this.getBlackList();
        this.props.getBlackListEmails();
      })
      .catch((error) => {
        console.log("removeFromBlacklist", error);
      });
  };

  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  updateReason = (event) => {
    this.setState({ reason: event.target.value });
  };

  addToBlackList = () => {
    const data = {
      Email: this.state.email,
      Manager_Comments: this.state.reason,
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Avoid_Emails", data)
      .then((response) => {
        console.log("addToBlackList", response.data);
        this.setState({ email: "", reason: "" });
        this.getBlackList();
        this.props.getBlackListEmails();
      })
      .catch((error) => {
        console.log("addToBlackList", error);
      });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Blacklist</div>
        <div className={css.tableContainer}>
          <table align="center" className={css.table}>
            <tbody>
              <tr>
                <td>
                  <strong>Email</strong>
                </td>
                <td>
                  <strong>Offense</strong>
                </td>
                <td>
                  <strong>Remove From Blacklist</strong>
                </td>
              </tr>
              {this.state.blacklist.map((email, index) => (
                <tr key={email.objectId}>
                  <td>{email.email}</td>
                  <td>{email.message}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => this.removeFromBlacklist(email.objectId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={css.addToBlackList}>
          <div>
            <strong>Add Email To Blacklist</strong>
          </div>
          <table align="center" className={css.table}>
            <tbody>
              <tr>
                <td>Email:</td>
                <td>
                  <input value={this.state.email} onChange={this.updateEmail} />
                </td>
              </tr>
              <tr>
                <td>Reason:</td>
                <td>
                  <textarea
                    type="text"
                    value={this.state.reason}
                    onChange={this.updateReason}
                    rows={3}
                    cols={50}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="button"
            onClick={this.addToBlackList}
            style={{ marginTop: 10 }}
          >
            Add To Blacklist
          </button>
        </div>
      </div>
    );
  }
}
