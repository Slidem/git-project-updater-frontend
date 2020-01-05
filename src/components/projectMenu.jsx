import React, { Component } from "react";
import "../css/projectMenu.css";
import TakeAction from "./takeAction";
import ActionMenu from "./actionMenu";
import ProjectTypeInfo from "./projectTypeInfo";
import GitInfo from "./gitInfo";

class ProjectMenu extends Component {
  state = {
    takingAction: false
  };

  render() {
    const menuType = this.chooseMenyTypeBasedOnActionType();
    return <div className="project-menu-container">{menuType}</div>;
  }

  chooseMenyTypeBasedOnActionType() {
    if (this.state.takingAction) {
      return this.renderActionMenu();
    } else {
      return this.renderProjectInfo();
    }
  }

  renderActionMenu() {
    return (
      <ActionMenu actionMenuExited={() => this.updateTakingAction(false)} />
    );
  }

  renderProjectInfo() {
    return (
      <React.Fragment>
        <div className="row">
          <TakeAction
            onActionButtonClicked={() => this.updateTakingAction(true)}
          />
        </div>
        <div className="row actions-row">
          <ProjectTypeInfo />
        </div>
        <div className="row actions-row">
          <GitInfo />
        </div>
      </React.Fragment>
    );
  }

  updateTakingAction(boolValue) {
    this.setState({ takingAction: boolValue });
  }
}

export default ProjectMenu;
