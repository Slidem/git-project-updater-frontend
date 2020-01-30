import * as apiRegistry from "../registry/apiRegistry"
import httpService from "./httpService"

export async function getProjectIds(){
  const p = await httpService.get(apiRegistry.getProjectsUrl());
  return p.data;
}

export async function getProjectTree(projectId) {
  const p = await httpService.get(apiRegistry.getProjectsUrl() + "/" + projectId + "/tree");
  return p.data;
}

export async function getProjectInfo(projectId) {
  const p = await httpService.get(apiRegistry.getProjectsUrl() + "/" + projectId + "/info");
  return p.data;
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
