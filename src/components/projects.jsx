import React, { Component } from "react";
import * as projectsService from "../services/projectsService";
import "../css/projects.css";
import Project from "./project";

class Projects extends Component {
  MAX_PROJECTS_ON_ROW = 3;

  render() {
    return <div className="projects-container">{this.getRows()}</div>;
  }

  getRows() {
    let projects = projectsService.getProjects();
    let rows = [];
    let row = [];
    let count = 0;
    for (const [projectId, project] of Object.entries(projects)) {
      count += 1;
      row.push(
        <div className="col-sm">
          <Project
            projectId={projectId}
            projectType={project.type}
            projectsCode={this.props.projectsCode}
          />
        </div>
      );
      if (count % this.MAX_PROJECTS_ON_ROW === 0) {
        rows.push(<div className="row">{row}</div>);
        row = [];
      }
    }
    return rows;
  }
}

export default Projects;
