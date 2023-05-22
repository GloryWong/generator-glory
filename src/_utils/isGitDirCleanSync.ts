import { spawnSync } from 'child_process';
import { isGitManagedSync } from './isGitManagedSync';

export function isGitDirCleanSync(dir?: string) {
  if (!isGitManagedSync(dir)) {
    throw new Error('Current directory is not managed by git.');
  }

  const { status, stdout } = spawnSync('git', ['status', '--porcelain'], {
    cwd: dir ?? process.cwd(),
  });

  if (status !== 0) {
    throw new Error(`Command failed with code ${status}.`);
  }

  return stdout.toString().trim().length === 0;
}
