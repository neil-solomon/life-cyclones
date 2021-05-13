import React from "react";
import css from "./App.module.css";
import "antd/dist/antd.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Login from "./components/Login";
import axios from "axios";
import _ from "lodash";
import { notification } from "antd";

export default class App extends React.Component {
  state = {
    currentUserObjectId: "visitor",
    allUsers: {
      visitor: {
        username: "visitor",
        objectId: "",
        password: "",
        numWarnings: "",
        email: "",
        role: "visitor",
      },
    },
    blackListEmails: new Set(),
    pageView: "Homepage",
    loginVisible: false,
    menuVisible: false,
    productPage_product_id: "",
  };

  componentDidMount = () => {
    this.getAllUsers();
    this.getBlackListEmails();
  };

  getAllUsers = () => {
    this.getComputers();
    this.getDeliverys();
    this.getRegistered_Users();
    this.getStore_Clerks();
    this.getStore_Managers();
  };

  getBlackListEmails = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Avoid_Emails")
      .then((response) => {
        console.log("getBlackListEmails", response.data.results);
        var blackListEmails = new Set();
        for (const result of response.data.results) {
          blackListEmails.add(result.Email);
        }
        this.setState({ blackListEmails });
      })
      .catch((error) => {
        console.log("getBlackListEmails", error);
      });
  };

  getComputers = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Computer")
      .then((response) => {
        console.log("getComputers", response.data.results);
        var allUsers = _.cloneDeep(this.state.allUsers);
        for (const user of response.data.results) {
          allUsers[user.objectId] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.warnings,
            email: user.cCompany_Email,
            role: "computer",
          };
        }
        this.setState({ allUsers });
      })
      .catch((error) => {
        console.log("getComputers", error);
      });
  };

  getDeliverys = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Delivery")
      .then((response) => {
        console.log("getDeliverys", response.data.results);
        var allUsers = _.cloneDeep(this.state.allUsers);
        for (const user of response.data.results) {
          allUsers[user.objectId] = {
            tracking_id: user.tracking_id,
            username: user.dc_email,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.warnings,
            email: user.dc_email,
            role: "delivery",
          };
        }
        this.setState({ allUsers });
      })
      .catch((error) => {
        console.log("getDeliverys", error);
      });
  };

  getRegistered_Users = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Registered_User")
      .then((response) => {
        console.log("getRegistered_Users", response.data.results);
        var allUsers = _.cloneDeep(this.state.allUsers);
        for (const user of response.data.results) {
          allUsers[user.objectId] = {
            username: user.username,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.num_of_warnings,
            email: user.email,
            role: "registered",
          };
        }
        this.setState({ allUsers });
      })
      .catch((error) => {
        console.log("getRegistered_Users", error);
      });
  };

  getStore_Clerks = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Store_Clerk")
      .then((response) => {
        console.log("getStore_Clerks", response.data.results);
        var allUsers = _.cloneDeep(this.state.allUsers);
        for (const user of response.data.results) {
          allUsers[user.objectId] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: 0,
            email: user.sc_email,
            role: "clerk",
          };
        }
        this.setState({ allUsers });
      })
      .catch((error) => {
        console.log("getStore_Clerks", error);
      });
  };

  getStore_Managers = () => {
    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .get("https://parseapi.back4app.com/classes/Store_Manager")
      .then((response) => {
        console.log("getStore_Managers", response.data.results);
        var allUsers = _.cloneDeep(this.state.allUsers);
        for (const user of response.data.results) {
          allUsers[user.objectId] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: 0,
            email: user.sm_email,
            role: "manager",
          };
        }
        this.setState({ allUsers });
      })
      .catch((error) => {
        console.log("getStore_Managers", error);
      });
  };

  toggleMenuVisible = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  toggleLoginVisible = () => {
    this.setState({
      loginVisible: !this.state.loginVisible,
      menuVisible: false,
    });
  };

  login = (userData) => {
    if (this.state.blackListEmails.has(userData.email)) {
      notification.error({
        message: "Error",
        description: "Entered email is on blacklist.",
      });
      return;
    }

    var goodLogin = false;

    for (const user in this.state.allUsers) {
      if (
        this.state.allUsers[user].email === userData.email &&
        this.state.allUsers[user].password === userData.password
      ) {
        goodLogin = true;
        this.setState({
          currentUserObjectId: this.state.allUsers[user].objectId,
        });
        break;
      }
    }

    if (!goodLogin) {
      notification.error({
        message: "Error",
        description: "Incorrect email or password.",
      });
    }
  };

  signUp = (userData) => {
    if (this.state.blackListEmails.has(userData.email)) {
      notification.error({
        message: "Error",
        description: "Entered email is on blacklist.",
      });
      return;
    }

    const data = {
      username: userData.email,
      password: userData.password,
      email: userData.email,
    };

    axios.defaults.headers = {
      "X-Parse-Application-Id": process.env.REACT_APP_API_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
    };
    axios
      .post("https://parseapi.back4app.com/classes/Registered_User", data)
      .then((response) => {
        console.log("signUp", response.data);
        this.getRegistered_Users();
        this.loginAfterSignUpTimeout = setTimeout(
          () => this.login(userData),
          1000
        );
      })
      .catch((error) => {
        console.log("signUp", error);
      });
  };

  logout = () => {
    this.setState({
      currentUserObjectId: "visitor",
      pageView: "Homepage",
    });
  };

  updatePageView = (pageView) => {
    this.setState({ pageView: pageView, menuVisible: false });
  };

  goToProductPage = (product_id) => {
    this.setState({ productPage_product_id: product_id });
    this.updatePageView("Product");
  };

  render() {
    return (
      <div className={css.container}>
        <Header
          toggleLoginVisible={this.toggleLoginVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          updatePageView={this.updatePageView}
          allUsers={this.state.allUsers}
          currentUserObjectId={this.state.currentUserObjectId}
        />
        <Login
          loginVisible={this.state.loginVisible}
          toggleLoginVisible={this.toggleLoginVisible}
          login={this.login}
          logout={this.logout}
          signUp={this.signUp}
          allUsers={this.state.allUsers}
          currentUserObjectId={this.state.currentUserObjectId}
        />
        <Menu
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          allUsers={this.state.allUsers}
          currentUserObjectId={this.state.currentUserObjectId}
          updatePageView={this.updatePageView}
        />
        <Content
          pageView={this.state.pageView}
          user={this.state.user}
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          goToProductPage={this.goToProductPage}
          productPage_product_id={this.state.productPage_product_id}
          allUsers={this.state.allUsers}
          currentUserObjectId={this.state.currentUserObjectId}
          getAllUsers={this.getAllUsers}
          getBlackListEmails={this.getBlackListEmails}
        />
      </div>
    );
  }
}
