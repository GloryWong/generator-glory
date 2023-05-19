// import { spawn } from 'child_process';
import { spawnPromise } from './spawnPromise';

export async function isGitManaged(dir?: string) {
  const { code, stdout } = await spawnPromise(
    'git',
    ['rev-parse', '--is-inside-work-tree'],
    {
      cwd: dir ?? process.cwd(),
    },
  );

  return code === 0 && stdout.trim() === 'true';
}
