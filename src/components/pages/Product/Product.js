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
import { notification } from "antd";
import axios from "axios";

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    this.defaultComment = "Leave a comment!";
    this.numStars = new Array(5).fill(null);

    this.state = {
      product: null,
      rating: 0,
      comments: [],
      enteredComment: this.defaultComment,
      enteredRating: 0,
      company: "",
      getProductError: false,
    };
  }

  componentDidMount = () => {
    this.getProduct();
  };

  getProduct = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Products", {
        params: { where: { objectId: this.props.product_id } },
      })
      .then((response) => {
        console.log("getProduct", response.data.results);
        var product = {
          name: response.data.results[0].product_description,
          price: response.data.results[0].price,
          imageSrc: response.data.results[0].Image.url,
        };
        this.setState({ product });
        this.getCompany(response.data.results[0].computer_company.objectId);
        this.getComments();
      })
      .catch((error) => {
        console.log("getProduct", error);
        this.setState({ getProductError: true, product: {} });
      });
  };

  getCompany = (companyId) => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Computer", {
        params: { where: { objectId: companyId } },
      })
      .then((response) => {
        console.log("getCompany", response.data.results);
        this.setState({ company: response.data.results[0].name });
      })
      .catch((error) => {
        console.log("getCompany", error);
      });
  };

  getComments = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Product_Comments")
      .then((response) => {
        console.log("getComments", response.data.results);
        var comments = [];
        var ratingSum = 0;
        var numRatings = 0;
        for (const responseComment of response.data.results) {
          if (responseComment.product.objectId === this.props.product_id) {
            comments.push(responseComment.message);
            ratingSum += responseComment.stars;
            numRatings += 1;
          }
        }
        this.setState({
          comments,
          rating: numRatings > 0 ? ratingSum / numRatings : 0,
        });
      })
      .catch((error) => {
        console.log("getComments", error);
      });
  };

  updateComment = (event) => {
    this.setState({ enteredComment: event.target.value });
  };

  postReview = () => {
    const data = {
      message: this.state.enteredComment,
      stars: this.state.enteredRating,
      product: {
        __type: "Pointer",
        className: "Products",
        objectId: this.props.product_id,
      },
      user: {
        __type: "Pointer",
        className: "Registered_User",
        objectId: this.props.allUsers[this.props.currentUserObjectId].objectId,
      },
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Product_Comments", data)
      .then((response) => {
        console.log("postReview", response.data.results);
        this.getComments();
      })
      .catch((error) => {
        console.log("postReview", error);
      });
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
    this.setState({ enteredRating: rating });
  };

  handlePurchase = () => {
    /**
     * Check if user has valid payment
     */
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Payment")
      .then((response) => {
        console.log("handlePurchase", response.data.results);
        var validPayment = false;
        for (const purchase of response.data.results) {
          if (
            purchase.user.objectId ===
              this.props.allUsers[this.props.currentUserObjectId].objectId &&
            purchase.credit_card_num !== ""
          ) {
            validPayment = true;
            break;
          }
        }
        if (validPayment) {
          this.purchaseProduct();
        } else {
          notification.error({
            message: "Error",
            description: "Payment method is not valid.",
          });
        }
      })
      .catch((error) => {
        console.log("handlePurchase", error);
      });
  };

  purchaseProduct = () => {
    const data = {
      product: {
        __type: "Pointer",
        className: "Products",
        objectId: this.props.product_id,
      },
      user: {
        __type: "Pointer",
        className: "Registered_User",
        objectId: this.props.allUsers[this.props.currentUserObjectId].objectId,
      },
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Purchase", data)
      .then((response) => {
        console.log("purchaseProduct", response.data.results);
        notification.open({
          message: "Purchased",
          description: this.state.product.name + " has been purchased.",
        });
      })
      .catch((error) => {
        console.log("purchaseProduct", error);
      });
  };

  render() {
    if (!this.state.product) {
      return <div className={css.loading}>Loading...</div>;
    }

    if (this.state.getProductError) {
      return <div className={css.loading}>Error getting product data</div>;
    }

    return (
      <div className={css.container}>
        <div className="pageHeader">Product</div>
        <div>
          <img src={this.state.product.imageSrc} className={css.image} />
        </div>
        <div className={css.name}>{this.state.product.name}</div>
        <div>Seller: {this.state.company}</div>
        <div className={css.price}>${this.state.product.price}</div>
        <div>
          <StarFilled style={{ color: "rgb(255, 205, 0)" }} />
          {this.state.rating}
        </div>
        {this.props.allUsers[this.props.currentUserObjectId].role ===
          "registered" && (
          <div>
            <button className="button" onClick={this.handlePurchase}>
              <div style={{ fontSize: "1.25em" }}>BUY NOW</div>
            </button>
          </div>
        )}
        <div className={css.comments}>
          {this.state.comments.map((comment, index) => (
            <div key={comment + index}>"{comment}"</div>
          ))}
        </div>
        {this.props.allUsers[this.props.currentUserObjectId].role ===
          "manager" && (
          <div className={css.addToHomepage}>
            <button className="button" onClick={this.addToHomepage}>
              Add To Homepage
            </button>
          </div>
        )}
        {this.props.allUsers[this.props.currentUserObjectId].role ===
          "registered" && (
          <div>
            <div className={css.postComment}>
              <textarea
                rows={3}
                cols={75}
                onChange={this.updateComment}
                value={this.state.enteredComment}
                style={{
                  color:
                    this.state.comment === this.defaultComment
                      ? "rgb(33,33,33,.5)"
                      : "rgb(33,33,33,1)",
                }}
              >
                Post a comment!
              </textarea>
            </div>
            <div className={css.rateProduct}>
              <span className={css.rateProductMessage}>Rate This Product:</span>
              {this.numStars.map((star, index) => (
                <>
                  {this.state.enteredRating > index ? (
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
            <button className="button" onClick={this.postReview}>
              Post Review
            </button>
          </div>
        )}
      </div>
    );
  }
}
