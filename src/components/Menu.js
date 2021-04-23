import React from "react";
import css from "./Menu.module.css";
import {
  AppstoreOutlined,
  CommentOutlined,
  AlertOutlined,
  DislikeOutlined,
  CreditCardOutlined,
  BookOutlined,
  SolutionOutlined,
  AimOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const roleToPages = {
  visitor: [
    // "Homepage",
    "All Products",
    "Forum",
  ],
  registered: [
    // "Homepage",
    "All Products",
    "Forum",
    "View Complaints",
    "Make Complaints",
    "Account",
    "Account History",
  ],
  clerk: [
    // "Homepage",
    "Forum",
    "View Complaints",
    "Make Complaints",
    "Delivery Auction",
  ],
  manager: [
    // "Homepage",
    "Forum",
    "Make Complaints",
    "Blacklist",
  ],
  delivery: [
    // "Homepage",
    "View Complaints",
    "Delivery Auction",
    "Delivery Tracking",
  ],
  computer: [
    // "Homepage",
    "View Complaints",
  ],
};

const pageToIcon = {
  "All Products": <AppstoreOutlined />,
  Forum: <CommentOutlined />,
  "View Complaints": <AlertOutlined />,
  "Make Complaints": <DislikeOutlined />,
  Account: <CreditCardOutlined />,
  "Account History": <BookOutlined />,
  Blacklist: <SolutionOutlined />,
  "Delivery Auction": <DollarOutlined />,
  "Delivery Tracking": <AimOutlined />,
};

export default class Menu extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div
          className={css.container}
          style={{ left: this.props.menuVisible ? 0 : -305 }}
        >
          {/* <div>
            <strong>{this.props.user.role} menu</strong>
          </div> */}
          {roleToPages[this.props.user.role].map((page, index) => (
            <div
              key={page + this.props.menuVisible}
              onClick={() => this.props.updatePageView(page)}
              className={css.menuItem}
              style={{ animationDelay: (0.1 * (index + 2)).toString() + "s" }}
            >
              {pageToIcon[page]} {page}
            </div>
          ))}
          <div
            key={"credits" + this.props.menuVisible}
            className={css.credits}
            style={{
              animationDelay:
                (
                  0.1 *
                  (roleToPages[this.props.user.role].length + 3)
                ).toString() + "s",
              marginTop:
                window.innerHeight -
                50 * (roleToPages[this.props.user.role].length + 2),
            }}
          >
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
        </div>
      </div>
    );
  }
}
