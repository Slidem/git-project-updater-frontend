import React from "react";
import settingsIcon from "../img/settingsIcon.png";
import "../css/settings.css";
import * as settingsService from "../services/settingsService";
import NavbarDefinedComponent from "./fromNavbarComponent";

class Settings extends NavbarDefinedComponent {
  state = {
    settings: {
      gitUsername: "",
      gitPassword: "",
      projectType: "",
      projectsRootDirectories: ""
    }
  };

  render() {
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
          <div className="col-sm">{this.state.settings.gitUsername}</div>
        </div>
        <div className="row">
          <div className="col-sm">Git password</div>
          <div className="col-sm">{this.state.settings.gitPassword}</div>
        </div>
        <div className="row">
          <div className="col-sm">Projects type</div>
          <div className="col-sm">{this.state.settings.projectType}</div>
        </div>
        <div className="row">
          <div className="col-sm">Projects root directory</div>
          <div className="col-sm">
            {this.state.settings.projectsRootDirectories}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    settingsService.getSettings().then(result => {
      console.log(result);
      this.setState({
        settings: {
          gitUsername: result.gitCredentials.username,
          gitPassword: result.gitCredentials.password,
          projectType: result.projectsType,
          projectsRootDirectories: result.projectsRootDirectories
        }
      });
    });
  }
}

export default Settings;
