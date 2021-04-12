import React from "react";
import css from "./Product.module.css";

export default class Product extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Product</h1>
        Visitor can view all of the details of a product.
        <br />
        Registered user can view all of the details of a product, purchase the
        product, comment on the product, file a complaint against the product,
        and vote (star) the product.
        <br />
        Manager can select the product for inclusion on the Homepage.
      </div>
    );
  }
}
