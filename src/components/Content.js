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
        return <Account />;
      case "AccountHistory":
        return <AccountHistory />;
      case "AllProducts":
        return <AllProducts />;
      case "Blacklist":
        return <Blacklist />;
      case "DeliveryAuction":
        return <DeliveryAuction />;
      case "DeliveryTracking":
        return <DeliveryTracking />;
      case "Forum":
        return <Forum />;
      case "Homepage":
        return <Homepage />;
      case "MakeComplaints":
        return <MakeComplaints />;
      case "Product":
        return <Product />;
      case "ViewComplaints":
        return <ViewComplaints />;
      default:
        return null;
    }
  }
}
