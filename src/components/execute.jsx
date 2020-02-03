import React, { Component } from "react";

class Execute extends Component {
  render() {
    let containerClass = this.props.containerStyle;
    if (!containerClass) {
      containerClass = "";
    }

    return (
      <div className={containerClass}>
        <button
          className="btn btn-default"
          onClick={this.props.onExecuteClicked}
          disabled={this.props.executeDisabled}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default Execute;
