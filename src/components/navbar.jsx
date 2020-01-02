import React, { Component } from "react";
import NavbarListener from "../listeners/navabarListener";
import "../css/navbar.css";
import { Link } from "react-router-dom";

class Nabvar extends Component {
  navbarItemClicked(clickedItemCode) {
    this.state.navbarListener.navbarItemClicked(clickedItemCode);
  }

  constructor(props) {
    super(props);

    let navbarListener = props.navbarListener;

    if (!navbarListener) {
      navbarListener = new NavbarListener();
    }

    let navbarItems = props.navbarItems;

    if (!navbarItems) {
      navbarItems = [];
    }

    this.state = { navbarListener, navbarItems };
  }

  render() {
    let items = this.state.navbarItems.map(item =>
      this.renderNavbarItem(item.code, item.label, item.active)
    );

    return <nav className="nav nav-pills justify-content-center">{items}</nav>;
  }

  renderNavbarItem(code, label, active) {
    let cls = "nav-item nav-link";

    if (active) {
      cls += " active";
    }

    return (
      <Link
        to={"/" + code}
        className={cls}
        key={code}
        onClick={() => this.navbarItemClicked(code)}
        href="#"
      >
        {label}
      </Link>
    );
  }
}

export default Nabvar;
