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
    companyIdToCompanyName: {},
  };

  componentDidMount = () => {
    this.getBestSelling();
    this.getManagersPicks();
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

  getBestSelling = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Products")
      .then((response) => {
        console.log("getBestSelling", response.data.results);
        var products = [];
        for (const product of response.data.results) {
          products.push({
            product_id: product.product_id,
            object_id: product.objectId,
            price: product.price,
            companyObjectId: product.computer_company.objectId,
            company: "",
            name: product.product_name,
            description: product.product_description,
            imageSrc: product.Image.url,
            sales: product.sales,
          });
        }

        products.sort((a, b) => {
          if (a.sales > b.sales) {
            return -1;
          }
          return 1;
        });

        const bestSelling = [
          _.cloneDeep(products[0]),
          _.cloneDeep(products[1]),
          _.cloneDeep(products[2]),
        ];

        this.setState({ bestSelling: bestSelling });
      })
      .catch((error) => {
        console.log("getBestSelling", error);
      });
  };

  getManagersPicks = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/manager_select")
      .then((response) => {
        console.log("getManagersPicks", response.data.results);
        var selectedProducts = [
          response.data.results[0].product_one.objectId,
          response.data.results[0].product_two.objectId,
          response.data.results[0].product_three.objectId,
        ];

        for (const product of selectedProducts) {
          axios.defaults.headers = {
            "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
            "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
          };
          axios
            .get("https://parseapi.back4app.com/classes/Products", {
              params: { where: { objectId: product } },
            })
            .then((response) => {
              console.log("getManagersPicks ", product, response.data.results);
              var managersPicks = _.cloneDeep(this.state.managersPicks);
              managersPicks.push({
                product_id: response.data.results[0].product_id,
                object_id: response.data.results[0].objectId,
                price: response.data.results[0].price,
                companyObjectId:
                  response.data.results[0].computer_company.objectId,
                company: "",
                name: response.data.results[0].product_name,
                description: response.data.results[0].product_description,
                imageSrc: response.data.results[0].Image.url,
                sales: response.data.results[0].sales,
              });
              this.setState({ managersPicks });
            })
            .catch((error) => {
              console.log("getManagersPicks", product, error);
            });
        }
      })
      .catch((error) => {
        console.log("getManagersPicks", error);
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
