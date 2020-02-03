import React, { Component } from "react";
import Cancel from "./cancel";
import "../css/actionStepHeader.css";
import Execute from "./execute";

class ActionHeader extends Component {
  render() {
    return (
      <div
        className={"row step-header-container " + this.computeContainerClass()}
      >
        <div className="col-sm-8">
          <p>{this.props.label}</p>
        </div>
        <div className="col-sm-2">
          <Cancel
            onCancelClick={this.props.onActionExit}
            cancelDisabled={this.props.actionTaken}
          />
        </div>
        <div className="col-sm-2">
          <Execute
            onExecuteClicked={this.props.onExecuteClicked}
            executeDisabled={this.props.actionTaken}
          />
        </div>
      </div>
    );
  }

  computeContainerClass() {
    let containerClass = "step-header-enabled";
    if (this.props.stepDisabled) {
      containerClass = "step-header-disabled";
    }
    return containerClass;
  }
}

export default ActionHeader;
