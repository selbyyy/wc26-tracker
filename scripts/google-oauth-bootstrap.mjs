import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { chmodSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { fetchJson, googleScopes, requiredEnv } from './google-api-common.mjs';

const redirectUri = 'http://127.0.0.1:53682/oauth2callback';
const envPath = '.env.sensors.local';
const state = randomBytes(24).toString('hex');

const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authorizationUrl.search = new URLSearchParams({
  client_id: requiredEnv('GOOGLE_OAUTH_CLIENT_ID'),
  redirect_uri: redirectUri,
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
  scope: googleScopes.join(' '),
  state,
}).toString();

function updateLocalEnv(refreshToken) {
  const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
  const withoutRefreshToken = existing
    .split(/\r?\n/)
    .filter((line) => !line.startsWith('GOOGLE_OAUTH_REFRESH_TOKEN='))
    .filter(Boolean);

  withoutRefreshToken.push(`GOOGLE_OAUTH_REFRESH_TOKEN=${refreshToken}`);
  writeFileSync(envPath, `${withoutRefreshToken.join('\n')}\n`, { mode: 0o600 });
  chmodSync(envPath, 0o600);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', redirectUri);

  if (url.pathname !== '/oauth2callback') {
    response.writeHead(404).end('Not found');
    return;
  }

  if (url.searchParams.get('state') !== state) {
    response.writeHead(400).end('State mismatch. Close this tab and run npm run sensors:oauth again.');
    server.close();
    return;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    response.writeHead(400).end(`Google authorization failed: ${url.searchParams.get('error') ?? 'missing code'}`);
    server.close();
    return;
  }

  try {
    const payload = await fetchJson('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: requiredEnv('GOOGLE_OAUTH_CLIENT_ID'),
        client_secret: requiredEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!payload.refresh_token) {
      throw new Error('Google did not return a refresh token. Revoke the app grant and run the bootstrap again.');
    }

    updateLocalEnv(payload.refresh_token);
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('WC26 sensor authorization complete. You can close this tab.');
    console.log(`Saved GOOGLE_OAUTH_REFRESH_TOKEN to ${envPath}.`);
  } catch (error) {
    response.writeHead(500).end(error.message);
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(53682, '127.0.0.1', () => {
  console.log('Opening Google authorization in Chrome.');
  console.log(`If Chrome does not open, visit:\n${authorizationUrl}`);
  execFile('open', [authorizationUrl.toString()]);
});
