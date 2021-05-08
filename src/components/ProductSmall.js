/**
This component is used when showing a list of products, and displays key information about the product.
*/

import React from "react";
import css from "./ProductSmall.module.css";

export default class Product extends React.Component {
  state = {};

  render() {
    return (
      <div
        className={css.container}
        onClick={() => this.props.goToProductPage(this.props.product_id)}
      >
        <div className={css.productInfo}>
          <div className={css.name}>{this.props.name}</div>
          <div className={css.seller}>Sold By: {this.props.company}</div>
          <div className={css.price}>${this.props.price}</div>
        </div>
        <div className={css.productImageContainer}>
          <img src={this.props.imageSrc} className={css.image} />
        </div>
      </div>
    );
  }
}
