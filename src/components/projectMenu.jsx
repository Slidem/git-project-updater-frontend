import React, { Component } from "react";
import "../css/projectMenu.css";
import ProjectActions from "./projectActions";
import ProjectTypeInfo from "./projectTypeInfo";
import GitInfo from "./gitInfo";
import Action from "./action";
import * as projectsService from "../services/projectsService";
import ProjectActionExecution from "../services/projectActionExecution";

class ProjectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionType: "info",
      actionCompleted: false,
      actionTaken: false,
      actionStatusText: ""
    };

    this.updateGitProjectActionExecution = new ProjectActionExecution(
      this,
      projectId => projectsService.updateProject(projectId),
      "Updating git projects...",
      "Update of git projects finished successfully",
      "Update of git projects failed... Check logs"
    );

    this.buildMavenProjectsActionExecution = new ProjectActionExecution(
      this,
      projectId => projectsService.buildProject(projectId),
      "Building maven projects...",
      "Maven projects successfully built",
      "Maven projects build  failed... Check logs"
    );
  }

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
        onActionExecuted={() =>
          this.updateGitProjectActionExecution.execute(
            this.props.selectedProjects
          )
        }
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
        onActionExecuted={() =>
          this.buildMavenProjectsActionExecution.execute(
            this.props.selectedProjects
          )
        }
        selectedProjects={this.props.selectedProjects}
        actionCompleted={this.state.actionCompleted}
        actionTaken={this.state.actionTaken}
        actionStatusText={this.state.actionStatusText}
      />
    );
  }

  updateTakingAction(actionCode) {
    this.setState({ actionType: actionCode });
    this.props.onSelectionStateChange(actionCode);
  }
}

export default ProjectMenu;
