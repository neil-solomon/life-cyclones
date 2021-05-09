/*
This component is a sidebar which contains the navigation elements for the app.
*/

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
    "All Products",
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
          {roleToPages[
            this.props.allUsers[this.props.currentUserObjectId].role
          ] && (
            <>
              {roleToPages[
                this.props.allUsers[this.props.currentUserObjectId].role
              ].map((page, index) => (
                <div
                  key={page + this.props.menuVisible}
                  onClick={() => this.props.updatePageView(page)}
                  className={css.menuItem}
                  style={{
                    animationDelay: (0.1 * (index + 1)).toString() + "s",
                  }}
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
                      (roleToPages[
                        this.props.allUsers[this.props.currentUserObjectId].role
                      ].length +
                        3)
                    ).toString() + "s",
                  marginTop:
                    window.innerHeight +
                    35 -
                    50 *
                      (roleToPages[
                        this.props.allUsers[this.props.currentUserObjectId].role
                      ].length +
                        3),
                }}
              >
                <div>&copy; Life Cyclones 2021</div>
                <div>
                  <div>
                    Icons made by{" "}
                    <a
                      href="https://www.freepik.com"
                      title="Freepik"
                      target="_blank"
                      rel="noopener"
                    >
                      Freepik
                    </a>{" "}
                    from{" "}
                    <a
                      href="https://www.flaticon.com/"
                      title="Flaticon"
                      target="_blank"
                      rel="noopener"
                    >
                      www.flaticon.com
                    </a>
                  </div>
                </div>
                <div>
                  Image from{" "}
                  <a
                    href="https://www.microcenter.com/"
                    title="Micro Center"
                    target="_blank"
                    rel="noopener"
                  >
                    Micro Center
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
