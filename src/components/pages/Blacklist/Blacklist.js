/*
Blacklist

Manager can blacklist or un-blacklist any user such as registered user,
delivery, or computer company
*/

import React from "react";
import css from "./Blacklist.module.css";

export default class Blacklist extends React.Component {
  state = {
    blacklist: [],
    username: "",
    reason: "",
  };

  componentDidMount = () => {
    this.getBlackList();
  };

  getBlackList = () => {
    /**
     * Make API call
     */
    const blacklist = [
      {
        username: "user1",
        message: "Complained too much.",
      },
      {
        username: "user9",
        message: "Used inappropriate language in the forum.",
      },
      {
        username: "user25",
        message: "Lied when complaining about a clerk.",
      },
    ];

    this.setState({ blacklist: blacklist });
  };

  removeFromBlacklist = (username, indexInBlacklist) => {
    /**
     * Make API call
     */
    console.log("removeFromBlacklist", username);
  };

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  updateReason = (event) => {
    this.setState({ reason: event.target.value });
  };

  addToBlackList = () => {
    /**
     * Make API call
     */
    console.log("addToBlackList", this.state.username, this.state.reason);
    this.setState({ username: "", reason: "" });
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
                  <strong>User</strong>
                </td>
                <td>
                  <strong>Offense</strong>
                </td>
                <td>
                  <strong>Remove From Blacklist</strong>
                </td>
              </tr>
              {this.state.blacklist.map((user, index) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.message}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() =>
                        this.removeFromBlacklist(user.username, index)
                      }
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
            <strong>Add User To Blacklist</strong>
          </div>
          <table align="center" className={css.table}>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>
                  <input
                    value={this.state.username}
                    onChange={this.updateUsername}
                  />
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
