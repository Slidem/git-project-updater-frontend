import React, { Component } from "react";
import Cancel from "./cancel";
import "../css/actionStepHeader.css";
import Next from "./next";

class ActionStepHeader extends Component {
  render() {
    return (
      <div
        className={"row step-header-container " + this.computeContainerClass()}
      >
        <div className="col-sm-8">
          <p>{this.props.stepLabel}</p>
        </div>
        <div className="col-sm-2">
          <Cancel
            onCancelClick={() => this.props.onStepExit(this.props.stepCode)}
            cancelDisabled={this.props.stepDisabled}
          />
        </div>
        <div className="col-sm-2">
          <Next
            onNextClicked={() => this.props.onStepExecuted(this.props.stepCode)}
            onNextDisabled={this.props.stepDisabled || this.props.nextDisabled}
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

export default ActionStepHeader;
