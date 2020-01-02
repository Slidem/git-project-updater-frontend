import React, { Component } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import NavbarListener from "./listeners/navabarListener";
import Projects from "./components/projects";
import ProjectTree from "./components/projectTree";
import Settings from "./components/settings";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  PROJECT_CONTAINER_CODE = "projects";
  SETTINGS_CONTAINER_CODE = "settings";

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
          <main className="container">
            <Route exact path="/" component={Projects} />
            <Route
              exact
              path={"/" + this.PROJECT_CONTAINER_CODE}
              render={props => (
                <Projects
                  {...props}
                  projectsCode={this.PROJECT_CONTAINER_CODE}
                />
              )}
            />
            <Route
              path={"/" + this.PROJECT_CONTAINER_CODE + "/tree/:projectId"}
              component={ProjectTree}
            />
            <Route
              path={"/" + this.SETTINGS_CONTAINER_CODE}
              component={Settings}
            />
          </main>
        </Router>
      </React.Fragment>
    );
  }

  getNavbarListener() {
    return new NavbarListener(code => this.navbarItemClicked(code));
  }

  navbarItemClicked(code) {
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
