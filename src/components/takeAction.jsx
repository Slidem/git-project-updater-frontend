import React, { Component } from "react";
import "../css/takeAction.css";

class TakeAction extends Component {
  render() {
    return (
      <div className="take-action-container">
        <button
          onClick={this.props.onActionButtonClicked}
          className="btn btn-primary"
          disabled={this.props.cancelDisabled}
        >
          {" "}
          Take action <i className="fa fa-gavel" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}
export default TakeAction;
