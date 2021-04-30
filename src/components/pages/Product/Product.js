/**
Product

Visitor can view all of the details of a product.
Registered user can view all of the details of a product, purchase the
product, comment on the product, file a complaint against the product,
and vote (star) the product.
Manager can select the product for inclusion on the Homepage.
*/

import React from "react";
import css from "./Product.module.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    this.defaultComment = "Post a comment!";
    this.numStars = new Array(5).fill(null);

    this.state = {
      product: null,
      comment: this.defaultComment,
      rating: 0,
    };
  }

  componentDidMount = () => {
    this.getProduct();
  };

  getProduct = () => {
    /**
     * Make API call using this.props.product_id
     */
    const product = {
      name: "example product",
      price: 999,
      company: "Microsoft",
      rating: 3.7,
      comments: [
        "this product sucks...",
        "I love this product!",
        "It's not fast enough.",
        "Mine has lasted forever!",
      ],
    };
    this.setState({ product });
  };

  postComment = () => {};

  updateComment = (event) => {
    this.setState({ comment: event.target.value });
  };

  postComment = () => {
    /**
     * Make API call
     */
    console.log("postComment", this.props.product_id, this.state.comment);
  };

  addToHomepage = () => {
    /**
     * Make API call
     */
    console.log("addToHomepage", this.props.product_id);
  };

  updateRating = (rating) => {
    /**
     * Make API call
     */
    this.setState({ rating });
  };

  purchaseProduct = () => {
    /**
     * Make API call
     * check if the user has valid credit card, or enough funds in account to make purchase
     */
    console.log("purchaseProduct", this.props.product_id);
  };

  render() {
    if (!this.state.product) {
      return <div>Loading...</div>;
    }

    return (
      <div className={css.container}>
        <div className="pageHeader">Product</div>
        <div className={css.name}>{this.state.product.name}</div>
        <div>Seller: {this.state.product.company}</div>
        <div className={css.price}>${this.state.product.price}</div>
        <div>
          <StarFilled style={{ color: "rgb(255, 205, 0)" }} />
          {this.state.product.rating}
        </div>
        {this.props.user.role === "registered" && (
          <div>
            <button className="button" onClick={this.purchaseProduct}>
              <div style={{ fontSize: "1.25em" }}>BUY NOW</div>
            </button>
          </div>
        )}
        <div className={css.comments}>
          {this.state.product.comments.map((comment) => (
            <div>"{comment}"</div>
          ))}
        </div>
        {this.props.user.role === "manager" && (
          <div className={css.addToHomepage}>
            <button className="button" onClick={this.addToHomepage}>
              Add To Homepage
            </button>
          </div>
        )}
        {this.props.user.role === "registered" && (
          <div>
            <div className={css.postComment}>
              <textarea
                rows={3}
                cols={75}
                onChange={this.updateComment}
                value={this.state.comment}
                style={{
                  color:
                    this.state.comment === this.defaultComment
                      ? "rgb(33,33,33,.5)"
                      : "rgb(33,33,33,1)",
                }}
              >
                Post a comment!
              </textarea>
              <br />
              <button className="button" onClick={this.postComment}>
                Post Comment
              </button>
            </div>
            <div className={css.rateProduct}>
              <span className={css.rateProductMessage}>Rate This Product:</span>
              {this.numStars.map((star, index) => (
                <>
                  {this.state.rating > index ? (
                    <StarFilled
                      className={css.star}
                      onClick={() => this.updateRating(index + 1)}
                      style={{ color: "rgb(255, 205, 0)" }}
                    />
                  ) : (
                    <StarOutlined
                      className={css.star}
                      onClick={() => this.updateRating(index + 1)}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
