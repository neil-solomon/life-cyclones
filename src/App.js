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
    user: {
      username: "visitor",
      userId: "",
      role: "visitor",
    },
    users: {
      computer: {},
      delivery: {},
      registered_user: {},
      store_clerk: {},
      store_manager: {},
    },
    pageView: "Homepage",
    loginVisible: false,
    menuVisible: false,
    productPage_product_id: "",
  };

  componentDidMount = () => {
    this.getAllUsers();
  };

  getAllUsers = () => {
    this.getComputers();
    this.getDeliverys();
    this.getRegistered_Users();
    this.getStore_Clerks();
    this.getStore_Managers();
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
        var computers = {};
        for (const user of response.data.results) {
          computers[user.cCompany_Email] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.warnings,
          };
        }
        var users = _.cloneDeep(this.state.users);
        users.computer = computers;
        this.setState({ users });
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
        var deliverys = {};
        for (const user of response.data.results) {
          deliverys[user.dc_email] = {
            tracking_id: user.tracking_id,
            username: user.dc_email,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.warnings,
          };
        }
        var users = _.cloneDeep(this.state.users);
        users.delivery = deliverys;
        this.setState({ users });
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
        var registereds = {};
        for (const user of response.data.results) {
          registereds[user.email] = {
            username: user.username,
            objectId: user.objectId,
            password: user.password,
            numWarnings: user.num_of_warnings,
          };
        }
        var users = _.cloneDeep(this.state.users);
        users.registered_user = registereds;
        this.setState({ users });
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
        var clerks = {};
        for (const user of response.data.results) {
          clerks[user.sc_email] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: 0,
          };
        }
        var users = _.cloneDeep(this.state.users);
        users.store_clerk = clerks;
        this.setState({ users });
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
        var managers = {};
        for (const user of response.data.results) {
          managers[user.sm_email] = {
            username: user.name,
            objectId: user.objectId,
            password: user.password,
            numWarnings: 0,
          };
        }
        var users = _.cloneDeep(this.state.users);
        users.store_manager = managers;
        this.setState({ users });
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
    var goodLogin = false;
    var role = "visitor";
    var user;

    if (
      this.state.users.delivery[userData.email] &&
      this.state.users.delivery[userData.email].password === userData.password
    ) {
      user = _.cloneDeep(this.state.users.delivery[userData.email]);
      user.role = "delivery";
      user.email = userData.email;
      this.setState({ user });
    } else if (
      this.state.users.computer[userData.email] &&
      this.state.users.computer[userData.email].password === userData.password
    ) {
      user = _.cloneDeep(this.state.users.computer[userData.email]);
      user.role = "computer";
      user.email = userData.email;
      this.setState({ user });
    } else if (
      this.state.users.registered_user[userData.email] &&
      this.state.users.registered_user[userData.email].password ===
        userData.password
    ) {
      user = _.cloneDeep(this.state.users.registered_user[userData.email]);
      user.role = "registered";
      user.email = userData.email;
      this.setState({ user });
    } else if (
      this.state.users.store_clerk[userData.email] &&
      this.state.users.store_clerk[userData.email].password ===
        userData.password
    ) {
      user = _.cloneDeep(this.state.users.store_clerk[userData.email]);
      user.role = "clerk";
      user.email = userData.email;
      this.setState({ user });
    } else if (
      this.state.users.store_manager[userData.email] &&
      this.state.users.store_manager[userData.email].password ===
        userData.password
    ) {
      user = _.cloneDeep(this.state.users.store_manager[userData.email]);
      user.role = "manager";
      user.email = userData.email;
      this.setState({
        user,
      });
    } else {
      notification.error({
        message: "Error",
        description: "Incorrect email or password.",
      });
    }

    console.log("login", userData);
  };

  signUp = (userData) => {
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
      user: {
        username: "visitor",
        userId: "",
        role: "visitor",
      },
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
          user={this.state.user}
        />
        <Login
          loginVisible={this.state.loginVisible}
          toggleLoginVisible={this.toggleLoginVisible}
          login={this.login}
          logout={this.logout}
          signUp={this.signUp}
          user={this.state.user}
        />
        <Menu
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          user={this.state.user}
          updatePageView={this.updatePageView}
        />
        <Content
          pageView={this.state.pageView}
          user={this.state.user}
          menuVisible={this.state.menuVisible}
          toggleMenuVisible={this.toggleMenuVisible}
          goToProductPage={this.goToProductPage}
          productPage_product_id={this.state.productPage_product_id}
        />
      </div>
    );
  }
}
