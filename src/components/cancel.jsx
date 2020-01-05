import React, { Component } from "react";

class Cancel extends Component {
  render() {
    let containerClass = this.props.containerStyle;
    if (!containerClass) {
      containerClass = "";
    }

    return (
      <div className={containerClass}>
        <button
          className="btn btn-default"
          onClick={this.props.onCancelClick}
          disabled={this.props.cancelDisabled}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default Cancel;
