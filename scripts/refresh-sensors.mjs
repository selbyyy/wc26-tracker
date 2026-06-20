import { spawnSync } from 'node:child_process';

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  return result.status ?? 1;
}

const pullStatus = run('node', ['--env-file-if-exists=.env.sensors.local', 'scripts/pull-google-sensors.mjs']);
const seoStatus = run('node', ['scripts/seo-sensors.mjs']);

if (pullStatus !== 0) {
  console.error('Google sensor pull failed. Snapshot was regenerated from the latest local CSV inputs; check input timestamps before treating metrics as fresh.');
  process.exit(pullStatus);
}

process.exit(seoStatus);
