import { spawnSync } from 'child_process';

export function isGitInstalledSync() {
  const { status } = spawnSync('git', ['--version']);
  return status === 0;
}
