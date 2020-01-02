import React, { Component } from "react";
import settingsIcon from "../img/settingsIcon.png";
import "../css/settings.css";
import * as settingsService from "../services/settingsService";

class Settings extends Component {
  render() {
    let settings = this.getSettings();

    return (
      <div className="settings-container mx-auto">
        <div className="settings-tab">
          <div className="row">
            <div className="col-sm-8">
              <h5>Settings</h5>
            </div>
            <div className="col-sm-4">
              <img
                src={settingsIcon}
                alt="settings icon"
                className="mx-auto d-block"
              />
            </div>
          </div>
          <div className="row">
            <table className="table"></table>
            <tbody>
              <tr>
                <td>Git username</td>
                <td>{settings.gitUsername}</td>
              </tr>
              <tr>
                <td>Git password</td>
                <td>{settings.gitPassword}</td>
              </tr>
              <tr>
                <td>Projects type</td>
                <td>{settings.projectType}</td>
              </tr>
              <tr>
                <td>Projects root directory</td>
                <td>{settings.projectsRootDirectories}</td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    );
  }

  getSettings() {
    const settings = settingsService.getSettings();
    return {
      gitUsername: settings.gitCredentials.username,
      gitPassword: settings.gitCredentials.password,
      projectType: settings.projectsType,
      projectsRootDirectories: settings.projectsRootDirectories
    };
  }
}

export default Settings;
