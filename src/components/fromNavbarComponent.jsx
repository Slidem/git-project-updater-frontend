import { Component } from "react";

/**
 * Root class for components defined also in the navbar
 */
class NavbarDefinedComponent extends Component {
  componentDidMount() {
    this.props.navbarComponentListener.navbarItemMounted(
      this.props.navbarItemCode
    );
  }
}

export default NavbarDefinedComponent;
