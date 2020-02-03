import React, { Component } from "react";
import "../css/projectMenu.css";
import ProjectActions from "./projectActions";
import ProjectTypeInfo from "./projectTypeInfo";
import GitInfo from "./gitInfo";
import Action from "./action";

class ProjectMenu extends Component {
  state = {
    actionType: "info",
    actionCompleted: false
  };

  render() {
    if (this.state.actionType === "info") {
      return this.renderProjectInfo();
    } else if (this.state.actionType === "gitUpdate") {
      return this.renderGitUpdateAction();
    } else if (this.state.actionType === "mavenBuild") {
      return this.renderMavenBuildAction();
    }
  }

  renderProjectInfo() {
    return (
      <React.Fragment>
        <div className="row action-row container">
          <ProjectActions
            onActionButtonClicked={actionCode =>
              this.updateTakingAction(actionCode)
            }
          />
        </div>
        <div className="row project-type-info-row">
          <ProjectTypeInfo projectTypeInfo={this.props.projectTypeInfo} />
        </div>
        <div className="row git-info-row">
          <GitInfo projectGitInfo={this.props.projectGitInfo} />
        </div>
      </React.Fragment>
    );
  }

  renderGitUpdateAction() {
    return (
      <Action
        onActionExit={() => this.updateTakingAction("info")}
        onActionExecuted={() => this.actionExecuted("gitUpdate")}
        onActionCompleted={() => this.actionCompleted("gitUpdate")}
        selectedProjects={this.props.selectedProjects}
        actionCompleted={this.state.actionCompleted}
        actionStatusText="Update git projects"
      />
    );
  }

  renderMavenBuildAction() {
    return (
      <Action
        onActionExit={() => this.updateTakingAction("info")}
        onActionExecuted={() => this.actionExecuted("mavenBuild")}
        onActionCompleted={() => this.actionCompleted("mavenBuild")}
        selectedProjects={this.props.selectedProjects}
        actionCompleted={this.state.actionCompleted}
        actionStatusText="Build maven projects"
      />
    );
  }

  updateTakingAction(actionCode) {
    this.setState({ actionType: actionCode });
    this.props.onSelectionStateChange(actionCode);
  }
}

export default ProjectMenu;
