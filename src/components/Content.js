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
  constructor(props) {
    super(props);

    this.pageView_timeout = null;
    this.overlay_timeout = null;

    this.state = {
      pageView: "Homepage",
      contentContainerFade: css.fadeIn,
      overlayVisible: false,
      overlayFade: css.fadeIn,
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.pageView_timeout);
    clearTimeout(this.overlay_timeout);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.pageView !== this.props.pageView) {
      this.setState({ contentContainerFade: css.fadeOut });
      this.pageView_timeout = setTimeout(() => {
        this.setState({
          pageView: this.props.pageView,
          contentContainerFade: css.fadeIn,
        });
      }, 250);
    }

    if (!prevProps.menuVisible && this.props.menuVisible) {
      this.setState({ overlayVisible: true, overlayFade: css.fadeIn });
    } else if (prevProps.menuVisible && !this.props.menuVisible) {
      this.setState({ overlayFade: css.fadeOut });
      this.overlay_timeout = setTimeout(() => {
        this.setState({
          overlayVisible: false,
        });
      }, 250);
    }
  };

  render() {
    var content;
    switch (this.state.pageView) {
      case "Account":
        content = <Account user={this.props.user} />;
        break;
      case "Account History":
        content = <AccountHistory user={this.props.user} />;
        break;
      case "All Products":
        content = <AllProducts user={this.props.user} />;
        break;
      case "Blacklist":
        content = <Blacklist user={this.props.user} />;
        break;
      case "Delivery Auction":
        content = <DeliveryAuction user={this.props.user} />;
        break;
      case "Delivery Tracking":
        content = <DeliveryTracking user={this.props.user} />;
        break;
      case "Forum":
        content = <Forum user={this.props.user} />;
        break;
      case "Homepage":
        content = <Homepage user={this.props.user} />;
        break;
      case "Make Complaints":
        content = <MakeComplaints user={this.props.user} />;
        break;
      case "Product":
        content = <Product user={this.props.user} />;
        break;
      case "View Complaints":
        content = <ViewComplaints user={this.props.user} />;
        break;
      default:
        content = "ERROR: Content.js can't find the proper page.";
    }

    return (
      <>
        <div className={this.state.contentContainerFade}>{content}</div>
        {this.state.overlayVisible && (
          <div
            className={css.overlay + " " + this.state.overlayFade}
            onClick={this.props.toggleMenuVisible}
          ></div>
        )}
      </>
    );
  }
}
