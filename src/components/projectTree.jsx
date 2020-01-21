import React, { Component } from "react";
import ProjectMenu from "./projectMenu";
import * as projectsService from "../services/projectsService";
import "../css/treeContainer.css";
import Tree from "react-d3-tree";

class ProjectTree extends Component {
  // on info state, when clicking a node, color remains the same, and a node clicked event is fired up
  INFO_TREE_STATE = "info";

  // on select project state, selected project color changes
  SELECT_PROJECTS_TREE_STATE = "select";

  constructor(props){
    super(props);
    this.state = {
      dependencyTree: this.getDependencyTree(props),
      projectId: props.match.params.projectId,
      selectedProjectId: props.match.params.projectId,
      treeState: "info",
      clicked: false,
      selectedNodes: {}
    }
  }

  getDependencyTree(props) {
    return projectsService.getProjectTree(props.match.projectId);     
  }

  render() {
    return (
      <div className="project-dependencytree-container row">
        <div ref={tc => (this.treeContainer = tc)} className="col-sm-8">
          {this.renderProjectDependencyTree()}
        </div>
        <div className="col-sm container">
          <ProjectMenu projectId={this.state.selectedProjectId} />
        </div>
      </div>
    );
  }

  componentDidMount(){
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      },
    });
  }

  renderProjectDependencyTree() {
    return (
      <Tree
        data={this.getTreeData()}
        collapsible={false}
        orientation="vertical"
        translate={this.state.translate}
        transitionDuration = {this.state.clicked ? "0" : "300"}
        onClick={this.projectNodeClicked}
        separation={{
          siblings: 1.5,
          nonSiblings: 1.5
        }}
        scaleExtent={{
          min: 0.4,
          max: 0.8
        }}
      />
    );
  }

  projectNodeClicked = (data, evt) => {
    const projectId = data.name;
    this.setState({clicked : true, selectedProjectId: projectId})
    this.updateNodeSelections(projectId);
  };

  getTreeData() {
    console.log(this.state.dependencyTree);
    return this.dependencyTreeToTreeDataMap(this.state.dependencyTree);
  }

  dependencyTreeToTreeDataMap(node) {
    const data = {};

    data.name = node.projectId;

    const attributes = {
      version: node.version
    };

    if (node.versionUsed) {
      attributes["version used"] = node.versionUsed;
    }

    data.attributes = attributes;
    data.nodeSvgShape = this.getNodeShape(node.projectId);

    // compute children recursively
    const children = [];
    for (const c of node.children) {
      children.push(this.dependencyTreeToTreeDataMap(c));
    }
    data.children = children;

    return data;
  }

  getNodeShape(projectId) {
    return {
      shape: "circle",
      shapeProps: {
        r: 10,
        fill: this.computeColor(projectId)
      }
    };
  }

  computeColor(projectId) {
    const selectedNodes = this.state.selectedNodes;
    const selected = selectedNodes[projectId];

    if (!selected) {
      if (projectId === this.props.match.params.projectId) {
        return "grey";
      }

      return "white";
    }
    return this.state.treeState === "info" ? "blue" : "green";
  }

  updateNodeSelections(selectedProjectId) {
    const newSelection = { ...this.state.selectedNodes };

    if(this.state.treeState === "info"){
      for(const projectId in newSelection){
        if(projectId !== selectedProjectId){
          newSelection[projectId] = false;
        }
      }      
    }

    newSelection[selectedProjectId] = newSelection[selectedProjectId] ? false : true;
    this.setState({
      selectedNodes: newSelection
    });
  }
}

export default ProjectTree;
