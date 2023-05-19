//

import { spawnPromise } from './spawnPromise';

export async function getGitBranchName(dir?: string) {
  const { code, stdout, stderr } = await spawnPromise(
    'git',
    ['symbolic-ref', 'HEAD'],
    { cwd: dir ?? process.cwd() },
  );

  if (code === 0) {
    return stdout.trim().replace(/^refs\/heads\//, '');
  } else {
    throw new Error(`Command failed with code ${code}: ${stderr}`);
  }
}
