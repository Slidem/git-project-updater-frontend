import React, { Component } from "react";
import "../css/selectedProjects.css";

class SelectedProjects extends Component {

  render() {
    return (
        <div className="container selected-projects-container">{this.renderSelectedProjects()}</div>
    );
  }

  renderSelectedProjects() {
    const selectedProjects = this.props.selectedProjects;
    const rendered = [];
    for (const projectId in selectedProjects) {
      if (selectedProjects.hasOwnProperty(projectId)) {
        const checked = selectedProjects[projectId] ? "true" : "";
        rendered.push(
          <div className="row">
            <div className="col-sm selected-project-label-container">
              <p>{projectId}</p>
            </div>
            <div className="col-sm selected-project-checkbox-container">
              <input type="checkbox" checked={checked} disabled={true}></input>
            </div>
          </div>
        );
      }
    }
    return rendered;
  }
}

export default SelectedProjects;
