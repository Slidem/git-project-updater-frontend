import React, { Component } from "react";
import ActionHeader from "./actionStepHeader";
import SelectedProjects from "./selectedProjects";
import progress from "../img/progress.gif";
import "../css/action.css";

class Action extends Component {
  state = {
    actionTaken: false
  };

  render() {
    const updateProjects = () => this.updateSelectedProjects();
    return (
      <React.Fragment>
        <ActionHeader
          onActionExit={this.props.onActionExit}
          onExecuteClicked={updateProjects}
          actionTaken={this.state.actionTaken}
          label={!this.props.actionTaken ? "Select projects" : ""}
        />
        <SelectedProjects selectedProjects={this.props.selectedProjects} />
        {this.renderActionStatus()}
      </React.Fragment>
    );
  }

  updateSelectedProjects() {
    this.setState({ actionTaken: true });
    this.props.onActionExecuted();
  }

  renderActionStatus() {
    if(!this.props.actionTaken){
      return null;
    }
    
    let statusIndicator = null;
    if (!this.state.actionCompleted) {
      statusIndicator = <img alt="project icon" src={progress} width="80" height="80"></img>;
    } else {
      statusIndicator = (
        <button
          className="btn btn-success btn-circle btn-sm"
          onClick={this.props.actionCompleted}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
      );
    }


    const statusText = this.props.actionCompleted ? "Done !" : this.props.actionStatusText + " ...";

    return (
      <div className="row status-container">
        <div className="col-sm action-status-text-holder-container">
          <p>
            {statusText}
          </p>
        </div>
        <div className="col-sm"> {statusIndicator} </div>
      </div>
    );
  }
}

export default Action;