import React, { Component } from "react";

class FileList extends Component {
  render() {
    return (
      <div className="file-list-container container">
        <div className="row" style={{ color: this.props.folderTitleColor }}>
          <div className="col-sm">
            <h5>
              <i class="fa fa-archive" aria-hidden="true"></i>{" "}
              {this.props.folderName}{" "}
            </h5>
          </div>
        </div>
        {this.renderFileRows()}
      </div>
    );
  }

  renderFileRows() {
    const rows = [];
    for (const file of this.props.files) {
      rows.push(
        <div className="row" key="file">
          <div className="col-sm offset-sm-1 file-list-item">{file}</div>
        </div>
      );
    }
    return rows;
  }
}

export default FileList;
