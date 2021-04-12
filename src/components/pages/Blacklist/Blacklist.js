import React from "react";
import css from "./Blacklist.module.css";

export default class Blacklist extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Blacklist</h1>
        Manager can blacklist or un-blacklist any user such as registered user,
        delivery, or computer company
      </div>
    );
  }
}
