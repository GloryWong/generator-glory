import { spawn } from 'child_process';

export function spawnPromise(
  command: string,
  args?: Parameters<typeof spawn>[1],
  options?: Parameters<typeof spawn>[2],
) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>(
    (resolve, reject) => {
      const childProcess = spawn(command, args ?? [], options ?? {});

      let stdout = '';
      let stderr = '';

      childProcess.stdout?.on('data', (data) => {
        stdout += data;
      });

      childProcess.stderr?.on('data', (data) => {
        stderr += data;
      });

      childProcess.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      childProcess.on('error', (error) => {
        reject(error);
      });
    },
  );
}
