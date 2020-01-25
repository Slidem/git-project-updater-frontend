import React from "react";
import * as projectsService from "../services/projectsService";
import "../css/projects.css";
import Project from "./project";
import NavbarDefinedComponent from "./fromNavbarComponent";

class Projects extends NavbarDefinedComponent {
  static MAX_PROJECTS_ON_ROW = 3;
  static DEFAULT_PROJECTS_CODE = "projects";


  state = {
    projectIds: []
  }

  componentDidMount(){
    super.componentDidMount();
    projectsService.getProjectIds().then(projectIds => {
      this.setState({projectIds})
    });
  }

  render() {
    return <div className="projects-container">{this.getRows()}</div>;
  }

  getRows() {
    const rows = [];
    let row = [];
    let rowCount = 1;
    let count = 0;
    if (! this.state.projectIds){
      return;
    }
    for (const projectId of this.state.projectIds) {
      count += 1;
      row.push(
        <div key={projectId} className="col-sm">
          <Project
            projectId={projectId}
            //TODO: get project type from settings service
            projectType="maven"
            linkRoot={this.getLinkRoot()}
          />
        </div>
      );
      if (count % Projects.MAX_PROJECTS_ON_ROW === 0) {
        rows.push(
          <div key={rowCount} className="row">
            {row}
          </div>
        );
        row = [];
        rowCount += 1;
      }
    }
    return rows;
  }

  getLinkRoot() {
    let projectsCode = this.props.navbarItemCode;
    if (!projectsCode) {
      projectsCode = Projects.DEFAULT_PROJECTS_CODE;
    }
    return projectsCode + "/tree/";
  }
}

export default Projects;
