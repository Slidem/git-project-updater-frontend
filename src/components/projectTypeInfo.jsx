import React, { Component } from "react";
import * as projectsService from "../services/projectsService";

class ProjectTypeInfo extends Component {
  render() {
    const projectInfo = this.getProjectInfo();

    return (
      <div className="project-type-info-container col-sm">
        <div className="project-type-info-title row">{this.renderTitle()}</div>
        <div className="project-type-info-info row">
          {this.renderMainInfo(projectInfo)}
        </div>
        <div className="project-type-info-info row">
          {this.renderDetailsJson(projectInfo)}
        </div>
      </div>
    );
  }

  renderTitle() {
    return (
      <h5>
        Project <i class="fa fa-info" aria-hidden="true"></i>
      </h5>
    );
  }

  renderMainInfo(projectInfo) {
    return (
      <div className="project-main-info-container col-sm">
        <div className="row">
          <div className="col-sm">
            <p>Project id:</p>
          </div>
          <div className="col-sm">
            <p>{projectInfo.projectId}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <p>Project type</p>
          </div>
          <div className="col-sm">
            <p>{projectInfo.projectType}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <p>Path</p>
          </div>
          <div className="col-sm">
            <p>{projectInfo.path}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <p>Version</p>
          </div>
          <div className="col-sm">
            <p>{projectInfo.version}</p>
          </div>
        </div>
      </div>
    );
  }

  renderDetailsJson(projectInfo) {
    return (
      <div className="project-details-container col-sm">
        <div class="row">
          <div className="col-sm">
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

  getProjectInfo() {
    return projectsService.getProjectInfo(this.props.projectId);
  }
}

export default ProjectTypeInfo;
