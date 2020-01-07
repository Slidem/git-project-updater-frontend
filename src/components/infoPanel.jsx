import React, { Component } from "react";
import "../css/infoPanel.css";
import InfoRow from "./infoRow";
import InfoTitle from "./infoTitle";

class InfoPanel extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="info-panel-container col-sm">
          {this.renderTitle()}
          {this.renderRows()}
          {this.props.additionalData}
        </div>
      </React.Fragment>
    );
  }

  renderTitle() {
    return <InfoTitle value={this.props.title} />;
  }

  renderRows() {
    const rows = this.props.rows;
    const renderedRows = [];
    for (const key in rows) {
      if (rows.hasOwnProperty(key)) {
        renderedRows.push(<InfoRow label={key} value={rows[key]} />);
      }
    }
    return renderedRows;
  }
}

export default InfoPanel;
