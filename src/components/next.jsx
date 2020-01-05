import React, { Component } from "react";

class Next extends Component {
  render() {
    let containerClass = this.props.containerStyle;
    if (!containerClass) {
      containerClass = "";
    }

    return (
      <div className={containerClass}>
        <button
          className="btn btn-default"
          disabled={this.props.onNextDisabled}
          onClick={this.props.onNextClicked}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default Next;
