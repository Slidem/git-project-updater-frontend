import React, { Component } from "react";

class InfoTitle extends Component {
  render() {
    return (
      <div className="col-sm">
        <div className="row info-panel-row">
          <h5>
            {this.props.value} <i class="fa fa-info" aria-hidden="true"></i>
          </h5>
        </div>
      </div>
    );
  }
}

export default InfoTitle;
