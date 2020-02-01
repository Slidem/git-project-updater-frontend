import React, { Component } from "react";
import InfoPanel from "./infoPanel";
import FileList from "./fileList";

class GitInfo extends Component {
  render() {
    const panelTitle = this.renderPanelTitle();
    const gitBranchInfoPanel = this.renderGitBranchInfoPanel(this.props.projectGitInfo);
    const gitLastCommitPanel = this.renderGitLastCommitPanel(this.props.projectGitInfo);
    const gitWorkDirPanel = this.renderGitWorkDirData(this.props.projectGitInfo);

    return (
      <div className="project-type-info-container col-sm">
        {panelTitle}
        {gitBranchInfoPanel}
        {gitLastCommitPanel}
        {gitWorkDirPanel}
      </div>
    );
  }

  renderPanelTitle() {
    return (
      <div className="row">
        <InfoPanel title={"Git"} />
      </div>
    );
  }

  renderGitBranchInfoPanel(gitInfo) {
    if (!gitInfo){
      return null;
    }
    return (
      <div className="row">
        <InfoPanel
          title={"Branch"}
          rows={this.getGitBranchInfoAsRows(gitInfo)}
        />
      </div>
    );
  }

  renderGitLastCommitPanel(gitInfo) {
    if (!gitInfo){
      return null;
    }
    return (
      <div className="row">
        <InfoPanel
          title={"Last commit"}
          rows={this.getGitLastCommitInfoAsRows(gitInfo)}
        />
      </div>
    );
  }

  getGitBranchInfoAsRows(gitInfo) {
    return {
      "Local branch": gitInfo.branch.local,
      "Remote branch": gitInfo.branch.remote
    };
  }

   
  
  getGitLastCommitInfoAsRows(gitInfo) {
    const lastCommit = gitInfo.lastCommit;
    return {
      "Commit date": lastCommit.date,
      "Author name": lastCommit.authorName,
      "Author email": lastCommit.authorEmail,
      "Commit message": lastCommit.message
    };
  }


  renderGitWorkDirData(gitInfo) {
    if (!gitInfo){
      return null;
    }

    const { modified, newFiles, deleted } = gitInfo.workingDir;
    return (
      <div className="col-sm">
        <div className="row">
          <FileList
            folderTitleColor={"green"}
            folderName={"modified"}
            files={modified}
          />
        </div>
        <div className="row">
          <FileList
            folderTitleColor={"blue"}
            folderName={"new"}
            files={newFiles}
          />
        </div>
        <div className="row">
          <FileList
            folderTitleColor={"red"}
            folderName={"deleted"}
            files={deleted}
          />
        </div>
      </div>
    );
  }
 
}

export default GitInfo;
