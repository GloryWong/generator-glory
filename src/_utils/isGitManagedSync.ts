import { spawnSync } from 'child_process';

export function isGitManagedSync(dir?: string) {
  const { status, stdout } = spawnSync(
    'git',
    ['rev-parse', '--is-inside-work-tree'],
    {
      cwd: dir ?? process.cwd(),
    },
  );

  return status === 0 && stdout.toString().trim() === 'true';
}
