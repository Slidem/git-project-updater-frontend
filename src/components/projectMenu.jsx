import React, { Component } from "react";
import "../css/projectMenu.css";
import ProjectActions from "./projectActions";
import ProjectTypeInfo from "./projectTypeInfo";
import GitInfo from "./gitInfo";
import Action from "./action";
import * as projectsService from "../services/projectsService";

class ProjectMenu extends Component {
  state = {
    actionType: "info",
    actionCompleted: false,
    actionTaken: false,
    actionStatusText: ""
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
        actionTaken={this.state.actionTaken}
        actionStatusText={this.state.actionStatusText}
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
        actionTaken={this.state.actionTaken}
        actionStatusText={this.state.actionStatusText}
      />
    );
  }

  actionExecuted(actionCode) {
    if (actionCode === "gitUpdate") {
      this.updateSelectedGitProjects();
      return;
    }

    if (actionCode === "mavenBuild") {
      this.setState({ actionCompleted: true });
      return;
    }
  }

  updateSelectedGitProjects() {
    this.setState({
      actionCompleted: false,
      actionTaken: true,
      actionStatusText: "Updating git projects"
    });

    let resultPromise = null;
    for (const projectId in this.props.selectedProjects) {
      if (!this.props.selectedProjects[projectId]) {
        return;
      }
      if (resultPromise === null) {
        resultPromise = projectsService
          .updateProject(projectId)
          .then(result => this.updateGitProjectResultHandler(result));
      } else {
        resultPromise = resultPromise.then(prevUpdateResponse =>
          this.updateNextGitProject(prevUpdateResponse, projectId)
        );
      }
    }
    if (resultPromise != null) {
      resultPromise.then(lastUpdateStatus => {
        this.setState({
          actionCompleted: true,
          actionTaken: false,
          actionStatusText:
            lastUpdateStatus === "success"
              ? "Git projects updated successfully"
              : "Git projects update failed. Check logs for more info"
        });
      });
    }
  }

  updateGitProject(projectId) {
    return projectsService
      .updateProject(projectId)
      .then((result) => this.updateGitProjectResultHandler(result));
  }

  updateGitProjectResultHandler(result) {
    const { status, message } = result;
    this.setState({ actionStatusText: message });
    if (status !== "success") {
    } else {
      this.setState({ actionCompleted: true });
    }
    return status;
  }

  updateNextGitProject(prevProjectStatus, projectId) {
    if (prevProjectStatus !== "success") {
      return;
    }
    return this.updateGitProjectResultHandler(projectId);
  }

  updateTakingAction(actionCode) {
    this.setState({ actionType: actionCode });
    this.props.onSelectionStateChange(actionCode);
  }
}

export default ProjectMenu;
