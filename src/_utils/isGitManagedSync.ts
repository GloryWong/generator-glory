import { spawnSync } from 'child_process';
import { isGitInstalledSync } from './isGitInstalledSync';

export function isGitManagedSync(dir?: string) {
  if (!isGitInstalledSync()) {
    return false;
  }

  const { status, stdout } = spawnSync(
    'git',
    ['rev-parse', '--is-inside-work-tree'],
    {
      cwd: dir ?? process.cwd(),
    },
  );

  return status === 0 && stdout.toString().trim() === 'true';
}
