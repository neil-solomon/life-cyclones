import React from "react";
import css from "./Menu.module.css";

const roleToPages = {
  visitor: ["Homepage", "AllProducts"],
  registered: [
    "Homepage",
    "AllProducts",
    "AccountHistory",
    "Forum",
    "ViewComplaints",
    "MakeComplaints",
    "Account",
    "AccountHistory",
  ],
  clerk: [
    "Homepage",
    "Forum",
    "ViewComplaints",
    "MakeComplaints",
    "DeliveryAuction",
  ],
  manager: ["Homepage", "Forum", "MakeComplaints", "Blacklist"],
  delivery: [
    "Homepage",
    "ViewComplaints",
    "DeliveryAuction",
    "DeliveryTracking",
  ],
  computer: ["Homepage", "ViewComplaints"],
};

export default class Menu extends React.Component {
  state = {};

  render() {
    if (!this.props.menuVisible) {
      return null;
    }

    return (
      <div className={css.container}>
        <div>
          <strong>{this.props.userRole} menu</strong>
          <button onClick={this.props.toggleMenuVisible}>close menu</button>
        </div>
        {roleToPages[this.props.userRole].map((page) => (
          <div key={page}>
            <button onClick={() => this.props.updatePageView(page)}>
              {page}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
