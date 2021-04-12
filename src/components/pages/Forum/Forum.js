import React from "react";
import css from "./Forum.module.css";

export default class Forum extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Forum</h1>
        Visitors can view posts in the forum.
        <br />
        Registered users can view and post to the forum.
        <br />
        Store clerk can view and post to the forum.
        <br />
        Store manager can view and post to the forum, and delete other users
        posts.
      </div>
    );
  }
}
