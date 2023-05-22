import { spawnPromise } from './spawnPromise';

export async function isGitInstalled() {
  const { code } = await spawnPromise('git', ['--version']);
  return code === 0;
}
