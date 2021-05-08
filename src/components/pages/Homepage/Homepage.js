/**
  Homepage
  
  Includes a list of the 3 most popular products and a list of 3 products
  chosen by the manager.
 */
import React from "react";
import css from "./Homepage.module.css";
import ProductSmall from "../../ProductSmall";

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
      {
        name: "DDRAM",
        price: 219.99,
        company: "AMD",
        product_id: "111",
      },
      {
        name: "Chromebook",
        price: 200,
        company: "Apple",
        product_id: "555",
      },
      {
        name: "Life Cyclones T-shirt",
        price: 19.99,
        company: "Life Cyclones",
        product_id: "666",
      },
    ];
  };

  getManagersPicks = () => {
    /**
     * Make API Call
     */
    return [
      {
        name: "GPU",
        price: 21.99,
        company: "AMD",
        product_id: "222",
      },
      {
        name: "Mac Book",
        price: 2000,
        company: "Apple",
        product_id: "333",
      },
      {
        name: "Hard Drive",
        price: 19.99,
        company: "Samsung",
        product_id: "444",
      },
    ];
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Homepage</div>
        <div className={css.greeting}>
          Hello {this.props.user.username}!
          <br />
          Welcome to Life Cyclones Online Computer Store.
        </div>
        <div className={css.productList}>
          <div className={css.subtitle}>Best Selling</div>
          {this.getBestSelling().map((product) => (
            <ProductSmall
              name={product.name}
              price={product.price}
              company={product.company}
              product_id={product.product_id}
              goToProductPage={this.props.goToProductPage}
            />
          ))}
        </div>
        <div className={css.productList}>
          <div className={css.subtitle}>Managers Picks</div>
          {this.getManagersPicks().map((product) => (
            <ProductSmall
              name={product.name}
              price={product.price}
              company={product.company}
              product_id={product.product_id}
              goToProductPage={this.props.goToProductPage}
            />
          ))}
        </div>
      </div>
    );
  }
}
