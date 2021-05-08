/*
  All Products
  
  Visitors can view a list of all products.
  Registered users can view a list of all products.
  Manager can view a list of all products.
 */

import React from "react";
import css from "./AllProducts.module.css";
import ProductSmall from "../../ProductSmall";
import axios from "axios";

export default class AllProducts extends React.Component {
  state = {
    products: [],
    companyIdToCompanyName: {},
  };

  componentDidMount = () => {
    this.getProducts();
    this.getCompanys();
  };

  getCompanys = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Computer")
      .then((response) => {
        console.log("getCompanys", response.data.results);
        var companyIdToCompanyName = {};
        for (const company of response.data.results) {
          companyIdToCompanyName[company.objectId] = company.name;
        }
        this.setState({ companyIdToCompanyName });
      })
      .catch((error) => {
        console.log("getCompanys", error);
      });
  };

  getProducts = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Products")
      .then((response) => {
        console.log("getProducts", response.data.results);
        var products = [];
        for (const product of response.data.results) {
          products.push({
            product_id: product.product_id,
            object_id: product.objectId,
            price: product.price,
            companyObjectId: product.computer_company.objectId,
            company: "",
            name: product.product_name,
            imageSrc: product.Image.url,
          });
        }
        this.setState({ products });
      })
      .catch((error) => {
        console.log("getProducts", error);
      });
  };

  render() {
    return (
      <div className={css.container}>
        <div className="pageHeader">All Products</div>
        {this.state.products.map((product) => (
          <ProductSmall
            key={product.object_id}
            name={product.name}
            price={product.price}
            company={
              this.state.companyIdToCompanyName?.[product.companyObjectId]
            }
            product_id={product.object_id}
            goToProductPage={this.props.goToProductPage}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
    );
  }
}
