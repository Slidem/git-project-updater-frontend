import React, { Component } from "react";
import * as projectsService from "../services/projectsService";
import "../css/projectInfo.css";
import InfoPanel from "./infoPanel";

class ProjectTypeInfo extends Component {
  render() {
    const projectInfo = this.getProjectInfo();

    return (
      <InfoPanel
        title={"Project"}
        rows={this.getProjectInfoAsPanelRows(projectInfo)}
        additionalData={this.renderDetailsAsJson(projectInfo)}
      />
    );
  }

  getProjectInfo() {
    return projectsService.getProjectInfo(this.props.projectId);
  }

  renderDetailsAsJson(projectInfo) {
    return (
      <div className="project-details-container col-sm">
        <div class="row">
          <div className="col-sm project-property-title">
            <p>Details: </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <pre>{JSON.stringify(projectInfo.details, undefined, 2)}</pre>
          </div>
        </div>
      </div>
    );
  }

  getProjectInfoAsPanelRows(projectInfo) {
    return {
      "Project id": projectInfo.projectId,
      "Project type": projectInfo.projectType,
      Path: projectInfo.path,
      Version: projectInfo.version
    };
  }
}

export default ProjectTypeInfo;
