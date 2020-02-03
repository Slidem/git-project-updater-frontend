import React, { Component } from "react";
import "../css/projectActions.css";

class ProjectActions extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-sm">
          <button
            onClick={() => this.props.onActionButtonClicked("gitUpdate")}
            className="btn btn-info btn-block action-btn"
          >
            Git update
          </button>
        </div>
        <div className="col-sm">
          <button
            onClick={() => this.props.onActionButtonClicked("mavenBuild")}
            className="btn btn-dark btn-block action-btn"
          >
            Maven build
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ProjectActions;
