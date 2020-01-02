import React, { Component } from "react";
import "../css/project.css";
import mavenIcon from "../img/mvn_icon.png";
import { Link } from "react-router-dom";

class Project extends Component {
  render() {
    let icon = this.getIcon();

    return (
      <div className="project">
        <Link
          to={this.props.projectsCode + "/tree/" + this.props.projectId}
          className="row"
        >
          <div className="col-sm-8">
            <p>{this.props.projectId}</p>
          </div>
          <div className="col-sm-4">
            <img className="img-fluid" alt="project icon" src={icon} />
          </div>
        </Link>
      </div>
    );
  }

  getIcon() {
    if (this.props.projectType === "maven") {
      return mavenIcon;
    }

    return "";
  }
}

export default Project;
