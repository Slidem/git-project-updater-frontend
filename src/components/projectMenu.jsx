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
    return (
      <div className="project-menu-container overflow-auto">{menuType}</div>
    );
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
            projectId={this.props.projectId}
            onActionButtonClicked={() => this.updateTakingAction(true)}
          />
        </div>
        <div className="row actions-row">
          <ProjectTypeInfo projectId={this.props.projectId} />
        </div>
        <div className="row actions-row">
          <GitInfo projectId={this.props.projectId} />
        </div>
      </React.Fragment>
    );
  }

  updateTakingAction(boolValue) {
    this.setState({ takingAction: boolValue });
  }
}

export default ProjectMenu;
