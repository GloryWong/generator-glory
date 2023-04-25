import { isScoped } from './isScoped';

export function getDefaultGithubRepoName(moduleName: string) {
  return isScoped(moduleName) ? moduleName.split('/')[1] : moduleName;
}
