import React, { Component } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import NavbarListener from "./listeners/navabarListener";
import NavbarComponentListener from "./listeners/navbarComponentListener";
import Projects from "./components/projects";
import ProjectTree from "./components/projectTree";
import Settings from "./components/settings";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  PROJECT_CONTAINER_CODE = "projects";
  SETTINGS_CONTAINER_CODE = "settings";
  LOGS_CONTAINER_CODE = "logs";

  state = {
    navbarItems: [
      { code: this.PROJECT_CONTAINER_CODE, label: "Projects", active: true },
      { code: this.SETTINGS_CONTAINER_CODE, label: "Settings", active: false }
    ]
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar
            navbarItems={this.state.navbarItems}
            navbarListener={this.getNavbarListener()}
          />
          <main className="container-fluid">
            <Route
              exact
              path="/"
              render={this.routeRenderProjectsComponent()}
            />
            <Route
              exact
              path={"/" + this.PROJECT_CONTAINER_CODE}
              render={this.routeRenderProjectsComponent()}
            />
            <Route
              path={"/" + this.PROJECT_CONTAINER_CODE + "/tree/:projectId"}
              component={ProjectTree}
            />
            <Route
              path={"/" + this.SETTINGS_CONTAINER_CODE}
              render={this.routeRenderSettingsComponent()}
            />
          </main>
        </Router>
      </React.Fragment>
    );
  }

  routeRenderProjectsComponent() {
    return props => (
      <Projects
        {...props}
        navbarComponentListener={this.getNavbarItemComponentListener()}
        navbarItemCode={this.PROJECT_CONTAINER_CODE}
      />
    );
  }

  routeRenderSettingsComponent() {
    return props => (
      <Settings
        {...props}
        navbarComponentListener={this.getNavbarItemComponentListener()}
        navbarItemCode={this.SETTINGS_CONTAINER_CODE}
      />
    );
  }

  getNavbarListener() {
    const onNavbarItemClicked = code => this.navbarItemActivated(code);
    return new NavbarListener(onNavbarItemClicked);
  }

  getNavbarItemComponentListener() {
    const onNavbarDefinedItemMounted = code => this.navbarItemActivated(code);
    return new NavbarComponentListener(onNavbarDefinedItemMounted);
  }

  navbarItemActivated(code) {
    this.state.navbarItems.forEach(item => {
      if (item.code === code) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    let updatedItems = [...this.state.navbarItems];
    this.setState({ navbarItems: updatedItems });
  }
}

export default App;
