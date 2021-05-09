/*
Forum

Visitors can view posts in the forum.
Registered users can view and post to the forum.
Store clerk can view and post to the forum.
Store manager can view and post to the forum, and delete other users posts.
*/

import React from "react";
import css from "./Forum.module.css";
import axios from "axios";

export default class Forum extends React.Component {
  constructor(props) {
    super(props);

    this.defaultMessage = "Post a message!";

    this.state = {
      posts: [],
      message: this.defaultMessage,
    };
  }

  componentDidMount = () => {
    this.getPosts();
  };

  scrollPosts = () => {
    var element = document.getElementById("forumPostsBox");
    if (!element) return;
    element.scrollTop = 1000000000000;
  };

  getPosts = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Forum_Post")
      .then((response) => {
        console.log("getPosts", response.data.results);
        var posts = response.data.results.map((post) => ({
          objectId: post.objectId,
          message: post.Message,
          user: post.User,
          userObjectId: post.User_id,
          dateTime: post.updatedAt,
        }));
        posts.sort((a, b) => {
          if (a.dateTime > b.dateTime) return 1;
          if (a.dateTime < b.dateTime) return -1;
          return 0;
        });

        this.setState({ posts });
        this.scrollPosts();
      })
      .catch((error) => {
        console.log("getPosts", error);
      });
  };

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  postMessage = () => {
    const data = {
      Message: this.state.message,
      User: this.props.allUsers[this.props.currentUserObjectId].username,
      User_id: {
        __type: "Pointer",
        className: "Registered_User",
        objectId: this.props.allUsers[this.props.currentUserObjectId].objectId,
      },
      Forum_post_id: (this.state.posts.length + 1).toString(),
      time_created_updated: "",
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Forum_Post", data)
      .then((response) => {
        console.log("postMessage", response.data);
        this.getPosts();
      })
      .catch((error) => {
        console.log("postMessage", error);
      });
  };

  deletePost = (post_id) => {
    /**
     * Make API call
     */

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .delete("https://parseapi.back4app.com/classes/Forum_Post/" + post_id)
      .then((response) => {
        console.log("deletePost", response.data);
        this.getPosts();
      })
      .catch((error) => {
        console.log("deletePost", error);
      });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Forum</div>
        <div className={css.posts} id="forumPostsBox">
          {this.state.posts.map((post) => (
            <div key={post.objectId} className={css.post}>
              <div>
                <div className={css.postUser}>{post.user}</div>
                <div className={css.postDateTime}>{post.dateTime}</div>
                {this.props.allUsers[this.props.currentUserObjectId].role ===
                  "manager" && (
                  <div className={css.deletePostContainer}>
                    <button
                      className="button"
                      onClick={() => this.deletePost(post.objectId)}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
              <div>{post.message}</div>
            </div>
          ))}
        </div>
        {(this.props.allUsers[this.props.currentUserObjectId].role ===
          "registered" ||
          this.props.allUsers[this.props.currentUserObjectId].role ===
            "manager" ||
          this.props.allUsers[this.props.currentUserObjectId].role ===
            "clerk") && (
          <div className={css.postMessage}>
            <textarea
              rows={3}
              cols={75}
              onChange={this.updateMessage}
              value={this.state.message}
              style={{
                color:
                  this.state.message === this.defaultMessage
                    ? "rgb(33,33,33,.5)"
                    : "rgb(33,33,33,1)",
              }}
            />
            <div className={css.postMessageButtonContainer}>
              <button className="button" onClick={this.postMessage}>
                Post Message
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
