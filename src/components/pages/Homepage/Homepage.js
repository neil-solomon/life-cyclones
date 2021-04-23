import React from "react";
import css from "./Homepage.module.css";

import cpu from "../../../mockProducts/cpu.png";
import flashDrive from "../../../mockProducts/flashDrive.png";
import gpu from "../../../mockProducts/gpu.png";
import laptop from "../../../mockProducts/laptop.png";
import mac from "../../../mockProducts/mac.png";
import sdCard from "../../../mockProducts/sdCard.png";

export default class Homepage extends React.Component {
  state = {};

  getBestSelling = () => {
    /**
     * Make API Call
     */
    return [
      { name: "cpu", imageSrc: cpu },
      { name: "flashDrive", imageSrc: flashDrive },
      { name: "gpu", imageSrc: gpu },
    ];
  };

  getManagersPicks = () => {
    /**
     * Make API Call
     */
    return [
      { name: "laptop", imageSrc: laptop },
      { name: "mac", imageSrc: mac },
      { name: "sdCard", imageSrc: sdCard },
    ];
  };

  render() {
    return (
      <div>
        <div className={css.greeting}>
          Hello {this.props.user.username}! Welcome to Life Cyclones Online
          Computer Store.
        </div>
        <div className={css.productList}>
          <div className={css.subtitle}>Best Selling</div>
          {this.getBestSelling().map((product) => (
            <div className={css.imageContainer} key={product.name}>
              <img
                src={product.imageSrc}
                alt="productImage"
                className={css.image}
              />
            </div>
          ))}
        </div>
        <div className={css.productList}>
          <div className={css.subtitle}>Managers Picks</div>
          {this.getManagersPicks().map((product) => (
            <div className={css.imageContainer} key={product.name}>
              <img
                src={product.imageSrc}
                alt="productImage"
                className={css.image}
              />
            </div>
          ))}
        </div>
        {/* <h1>Homepage</h1>
        <h2>
          Hello {this.props.user.username}! Your role is {this.props.user.role}.
        </h2>
        {this.props.user.role === "visitor" && (
          <h3>
            The homepage and menu render differently according to the type of
            user that is logged in. To test this click Login, enter a username,
            then click the Login button. For username use "registered",
            "manager", "clerk", "delivery", or "computer".
          </h3>
        )}
        Includes a list of the 3 most popular products and a list of 3 products
        chosen by the manager. */}
      </div>
    );
  }
}
