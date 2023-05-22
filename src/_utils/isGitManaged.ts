import { isGitInstalled } from './isGitInstalled';
import { spawnPromise } from './spawnPromise';

export async function isGitManaged(dir?: string) {
  if (!(await isGitInstalled())) {
    return false;
  }

  const { code, stdout } = await spawnPromise(
    'git',
    ['rev-parse', '--is-inside-work-tree'],
    {
      cwd: dir ?? process.cwd(),
    },
  );

  return code === 0 && stdout.trim() === 'true';
}
