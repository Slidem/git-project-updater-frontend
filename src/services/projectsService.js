import * as apiRegistry from "../registry/apiRegistry";
import httpService from "./httpService";

export async function getProjectIds() {
  const p = await httpService.get(apiRegistry.getProjectsUrl());
  return p.data;
}

export async function getProjectTree(projectId) {
  const p = await httpService.get(
    apiRegistry.getProjectsUrl() + "/" + projectId + "/tree"
  );
  return p.data;
}

export async function getProjectInfo(projectId) {
  const p = await httpService.get(
    apiRegistry.getProjectsUrl() + "/" + projectId + "/info"
  );
  return p.data;
}

export async function updateProject(projectId) {
  const result = await httpService.post(
    apiRegistry.getProjectsUrl() + "/" + projectId + "/git",
    {}
  );
  return result.data;
}

export async function buildProject(projectId) {
  const result = await httpService.post(
    apiRegistry.getProjectsUrl() + "/" + projectId + "/build",
    {}
  );
  return result.data;
}
