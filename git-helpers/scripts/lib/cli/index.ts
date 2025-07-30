import { execSync } from 'node:child_process';

/** Run a command and return its output from stdout */
export function runCli(cmd: string) {
  return execSync(cmd).toString().trim();
}