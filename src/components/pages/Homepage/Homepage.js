/**
  Homepage
  
  Includes a list of the 3 most popular products and a list of 3 products
  chosen by the manager.
 */
import React from "react";
import css from "./Homepage.module.css";
import ProductSmall from "../../ProductSmall";
import axios from "axios";
import _ from "lodash";

export default class Homepage extends React.Component {
  state = {
    bestSelling: [],
    managersPicks: [],
  };

  componentDidMount = () => {
    this.getBestSelling();
    this.getManagersPicks();
  };

  getBestSelling = () => {
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

        const bestSelling = [
          _.cloneDeep(products[0]),
          _.cloneDeep(products[1]),
          _.cloneDeep(products[2]),
        ];

        this.setState({ bestSelling: bestSelling });
      })
      .catch((error) => {
        console.log("getProducts", error);
      });
  };

  getManagersPicks = () => {
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

        const managersPicks = [
          _.cloneDeep(products[1]),
          _.cloneDeep(products[2]),
          _.cloneDeep(products[3]),
        ];

        this.setState({ managersPicks: managersPicks });
      })
      .catch((error) => {
        console.log("getProducts", error);
      });
  };

  render() {
    return (
      <div>
        <div className="pageHeader">Homepage</div>
        <div className={css.greeting}>
          Hello {this.props.allUsers[this.props.currentUserObjectId].username}
          !
          <br />
          Welcome to Life Cyclones Online Computer Store.
        </div>
        <div className={css.productList}>
          <div className={css.subtitle}>Best Selling</div>
          {this.state.bestSelling.map((product) => (
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
        <div className={css.productList}>
          <div className={css.subtitle}>Managers Picks</div>
          {this.state.managersPicks.map((product) => (
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
      </div>
    );
  }
}
