/*
Forum

Visitors can view posts in the forum.
Registered users can view and post to the forum.
Store clerk can view and post to the forum.
Store manager can view and post to the forum, and delete other users posts.
*/

import React from "react";
import css from "./Forum.module.css";

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

  getPosts = () => {
    /**
     * Make API call
     */

    const posts = [
      {
        user: "user1",
        message: "Can anyone help me find a gpu?",
        dateTime: "2020-05-17_05:39",
        post_id: "111",
      },
      {
        user: "user2",
        message: "You can get a gpu on the All Products page.",
        dateTime: "2020-05-17_06:03",
        post_id: "222",
      },
      {
        user: "user1",
        message: "Thank you!",
        dateTime: "2020-05-17_06:24",
        post_id: "666",
      },
      {
        user: "user3",
        message: "This store is really great!",
        dateTime: "2020-05-08_13:28",
        post_id: "333",
      },
      {
        user: "user4",
        message: "What kind of laptop should I get?",
        dateTime: "2020-06-07_15:22",
        post_id: "444",
      },
      {
        user: "user5",
        message: "Get the newest Macbook!",
        dateTime: "2020-06-07_15:37",
        post_id: "555",
      },
    ];

    posts.sort((a, b) => {
      if (a.dateTime > b.dateTime) return 1;
      if (a.dateTime < b.dateTime) return -1;
      return 0;
    });

    this.setState({ posts: posts });
  };

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  postMessage = () => {
    /**
     * Make API call
     */

    console.log("postMessage", this.props.user.username, this.state.message);
  };

  deletePost = (post_id) => {
    /**
     * Make API call
     */

    console.log("deletePost", post_id);
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Forum</div>
        <div className={css.posts}>
          {this.state.posts.map((post) => (
            <div key={post.post_id} className={css.post}>
              <div>
                <div className={css.postUser}>{post.user}</div>
                <div className={css.postDateTime}>{post.dateTime}</div>
                {this.props.user.role === "manager" && (
                  <div className={css.deletePostContainer}>
                    <button
                      className="button"
                      onClick={() => this.deletePost(post.post_id)}
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
        {(this.props.user.role === "registered" ||
          this.props.user.role === "manager" ||
          this.props.user.role === "clerk") && (
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
