import React, { PureComponent } from "react";
import * as projectsService from "../services/projectsService";
import "../css/treeContainer.css";
import Tree from "react-d3-tree";

class ProjectTree extends PureComponent {
  state = {};

  render() {
    let projectId = this.props.match.params.projectId;
    let projectDependencyTree = this.renderProjectDependencyTree(projectId);

    return (
      <div
        className="project-dependencytree-container"
        ref={tc => (this.treeContainer = tc)}
      >
        {projectDependencyTree}
      </div>
    );
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 5
      }
    });
  }

  renderProjectDependencyTree(projectId) {
    const dependencyTree = projectsService.getProjectTree(projectId);
    const treeData = this.dependencyTreeToTreeDataMap(dependencyTree);

    return (
      <Tree
        data={treeData}
        nodeSvgShape={this.getNodeShape()}
        collapsible="true"
        orientation="vertical"
        translate={this.state.translate}
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

  getNodeShape() {
    return {
      shape: "circle",
      shapeProps: {
        r: 10
      }
    };
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

    // compute children recursively
    const children = [];
    for (const c of node.children) {
      children.push(this.dependencyTreeToTreeDataMap(c));
    }
    data.children = children;

    return data;
  }
}

export default ProjectTree;
