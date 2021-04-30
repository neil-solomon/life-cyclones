/*
  All Products
  
  Visitors can view a list of all products.
  Registered users can view a list of all products.
  Manager can view a list of all products.
 */

import React from "react";
import css from "./AllProducts.module.css";
import ProductSmall from "../../ProductSmall";

export default class AllProducts extends React.Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    /**
     * Make API call
     */
    const products = [
      {
        name: "CPU",
        price: 25.99,
        company: "Dell",
        product_id: "111",
      },
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

    this.setState({ products });
  };

  render() {
    return (
      <div className={css.container}>
        <div className="pageHeader">All Products</div>
        {this.state.products.map((product) => (
          <ProductSmall
            name={product.name}
            price={product.price}
            company={product.company}
            product_id={product.product_id}
            goToProductPage={this.props.goToProductPage}
          />
        ))}
      </div>
    );
  }
}
