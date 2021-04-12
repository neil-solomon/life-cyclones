import React from "react";
import css from "./Content.module.css";

import Account from "./pages/Account/Account";
import AccountHistory from "./pages/AccountHistory/AccountHistory";
import AllProducts from "./pages/AllProducts/AllProducts";
import Blacklist from "./pages/Blacklist/Blacklist";
import DeliveryAuction from "./pages/DeliveryAuction/DeliveryAuction";
import DeliveryTracking from "./pages/DeliveryTracking/DeliveryTracking";
import Forum from "./pages/Forum/Forum";
import Homepage from "./pages/Homepage/Homepage";
import MakeComplaints from "./pages/MakeComplaints/MakeComplaints";
import Product from "./pages/Product/Product";
import ViewComplaints from "./pages/ViewComplaints/ViewComplaints";

export default class Content extends React.Component {
  state = {};

  render() {
    switch (this.props.pageView) {
      case "Account":
        return <Account user={this.props.user} />;
      case "AccountHistory":
        return <AccountHistory user={this.props.user} />;
      case "AllProducts":
        return <AllProducts user={this.props.user} />;
      case "Blacklist":
        return <Blacklist user={this.props.user} />;
      case "DeliveryAuction":
        return <DeliveryAuction user={this.props.user} />;
      case "DeliveryTracking":
        return <DeliveryTracking user={this.props.user} />;
      case "Forum":
        return <Forum user={this.props.user} />;
      case "Homepage":
        return <Homepage user={this.props.user} />;
      case "MakeComplaints":
        return <MakeComplaints user={this.props.user} />;
      case "Product":
        return <Product user={this.props.user} />;
      case "ViewComplaints":
        return <ViewComplaints user={this.props.user} />;
      default:
        return null;
    }
  }
}
