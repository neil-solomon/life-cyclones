import React from "react";
import css from "./Menu.module.css";

const roleToPages = {
  visitor: ["Homepage", "AllProducts", "Forum"],
  registered: [
    "Homepage",
    "AllProducts",
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
          <strong>{this.props.user.role} user menu</strong>
          <button onClick={this.props.toggleMenuVisible}>close menu</button>
        </div>
        <br />
        {roleToPages[this.props.user.role].map((page) => (
          <div key={page}>
            <button onClick={() => this.props.updatePageView(page)}>
              {page}
            </button>
          </div>
        ))}
        <div>&copy; Life Cyclones 2021</div>
        <div>
          <div>
            Icons made by{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}
