export function getProjects() {
  return {
    projectA: {
      id: "projectA",
      type: "maven"
    },
    projectB: {
      id: "projectB",
      type: "maven"
    },
    projectC: {
      id: "projectC",
      type: "maven"
    },
    projectD: {
      id: "projectD",
      type: "maven"
    },
    projectE: {
      id: "projectE",
      type: "maven"
    },
    projectF: {
      id: "projectF",
      type: "maven"
    },
    projectG: {
      id: "projectG",
      type: "maven"
    }
  };
}

export function getProjectTree(projectId) {
  return {
    projectId: "projectA",
    version: "0.0.1-SNAPSHOT",
    children: [
      {
        projectId: "cA",
        version: "0.0.2-SNAPSHOT",
        versionUsed: "0.0.1",
        children: []
      },
      {
        projectId: "cB",
        version: "0.0.3-SNAPSHOT",
        versionUsed: "0.0.2",
        children: []
      },
      {
        projectId: "cC",
        version: "0.0.1-SNAPSHOT",
        versionUsed: "0.0.1-SNAPSHOT",
        children: [
          {
            projectId: "ccA",
            version: "0.0.2-SNAPSHOT",
            versionUsed: "0.0.1",
            children: []
          },
          {
            projectId: "ccB",
            version: "0.0.3-SNAPSHOT",
            versionUsed: "0.0.2",
            children: []
          }
        ]
      }
    ]
  };
}

export function getProjectInfo(projectId) {
  return {
    projectId: projectId,
    projectType: "maven",
    path: "/some/path",
    version: "0.0.1-SNAPSHOT",
    details: {
      artifactId: "projectArtifact",
      groupId: "groupId",
      scope: "compile"
    }
  };
}

export function getProjectGitInfo(projectId) {
  return {
    branch: {
      local: "local-master",
      remote: "remote-master"
    },
    lastCommit: {
      hash: "233kjk3j",
      authorName: "Alex",
      authorEmail: "random@random.org",
      message: "Hello !",
      date: "some date as a str"
    },
    workingDir: {
      modified: ["/mod/a", "/mod/b", "/mod/c"],
      newFiles: ["/new/a", "/new/b", "/new/c"],
      deleted: ["/deleted/a", "/deleted/b", "/deleted/c"]
    }
  };
}
