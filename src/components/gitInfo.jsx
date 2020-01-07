import React, { Component } from "react";
import * as projectsService from "../services/projectsService";
import InfoTitle from "./infoTitle";
import InfoPanel from "./infoPanel";
import FileList from "./fileList";

class GitInfo extends Component {
  render() {
    const gitInfo = this.getGitInfo();
    const panelTitle = this.renderPanelTitle();
    const gitBranchInfoPanel = this.renderGitBranchInfoPanel(gitInfo);
    const gitLastCommitPanel = this.renderGitLastCommitPanel(gitInfo);
    const gitWorkDirPanel = this.renderGitWorkDirData(gitInfo);

    return (
      <div className="project-type-info-container col-sm">
        {panelTitle}
        {gitBranchInfoPanel}
        {gitLastCommitPanel}
        {gitWorkDirPanel}
      </div>
    );
  }

  getGitInfo() {
    return projectsService.getProjectGitInfo();
  }

  renderPanelTitle() {
    return (
      <div className="row">
        <InfoPanel title={"Git"} />
      </div>
    );
  }

  renderGitBranchInfoPanel(gitInfo) {
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
    return (
      <div className="row">
        <InfoPanel
          title={"Last commit"}
          rows={this.getGitLastCommitInfoAsRows(gitInfo)}
        />
      </div>
    );
  }

  renderGitWorkDirData(gitInfo) {
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
}

export default GitInfo;
