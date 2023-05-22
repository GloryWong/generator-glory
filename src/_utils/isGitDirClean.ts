import { spawnPromise } from './spawnPromise';

export async function isGitDirClean(dir?: string) {
  const { stdout } = await spawnPromise('git', ['status', '--porcelain'], {
    cwd: dir ?? process.cwd(),
  });
  return stdout.trim().length === 0;
}
