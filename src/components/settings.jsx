import React from "react";
import settingsIcon from "../img/settingsIcon.png";
import "../css/settings.css";
import * as settingsService from "../services/settingsService";
import NavbarDefinedComponent from "./fromNavbarComponent";

class Settings extends NavbarDefinedComponent {
  render() {
    let settings = this.getSettings();

    return (
      <div className="settings-container mx-auto">
        <div className="row">
          <div className="col-sm-2">
            <h5>Settings</h5>
          </div>
          <div className="col-sm-3">
            <img
              src={settingsIcon}
              alt="settings icon"
              className="mx-auto d-block settings-icon"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm">Git username</div>
          <div className="col-sm">{settings.gitUsername}</div>
        </div>
        <div className="row">
          <div className="col-sm">Git password</div>
          <div className="col-sm">{settings.gitPassword}</div>
        </div>
        <div className="row">
          <div className="col-sm">Projects type</div>
          <div className="col-sm">{settings.projectType}</div>
        </div>
        <div className="row">
          <div className="col-sm">Projects root directory</div>
          <div className="col-sm">{settings.projectsRootDirectories}</div>
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
