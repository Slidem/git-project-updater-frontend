import React, { Component } from "react";
import "../css/projectInfo.css";
import InfoPanel from "./infoPanel";

class ProjectTypeInfo extends Component {

  render() {
    return (
      <InfoPanel
        title={"Project"}
        rows={this.getProjectInfoAsPanelRows(this.props.projectTypeInfo)}
        additionalData={this.renderDetailsAsJson(this.props.projectTypeInfo)}
      />
    );
  }

  renderDetailsAsJson(projectInfo) {
    if(!projectInfo){
      return "";
    }

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
    if(!projectInfo){
      return {}
    }

    return {
      "Project id": projectInfo.projectId,
      "Project type": projectInfo.projectType,
      Path: projectInfo.path,
      Version: projectInfo.version
    };
  }
}

export default ProjectTypeInfo;
