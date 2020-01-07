import React, { Component } from "react";
import "../css/infoRow.css";

class InfoRow extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row info-row">
          <div className="col-sm-3 info-row-label">
            <p>{this.props.label}:</p>
          </div>
          <div className="col-sm info-row-value">
            <p>{this.props.value}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InfoRow;
