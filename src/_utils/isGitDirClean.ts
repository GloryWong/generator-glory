import { isGitManaged } from './isGitManaged';
import { spawnPromise } from './spawnPromise';

export async function isGitDirClean(dir?: string) {
  if (!(await isGitManaged(dir))) {
    throw new Error('Current directory is not managed by git.');
  }

  const { stdout } = await spawnPromise('git', ['status', '--porcelain'], {
    cwd: dir ?? process.cwd(),
  });
  return stdout.trim().length === 0;
}
