import * as apiRegistry from "../registry/apiRegistry";
import httpService from "./httpService";

export async function getSettings() {
  const p = await httpService.get(apiRegistry.getProjectsUrl() + "/settings");
  return p.data;
}
