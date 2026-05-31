import { writeFileSync } from 'node:fs';

export const googleScopes = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
];

export function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}.`);
  return value;
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.text();
  let payload;

  try {
    payload = body ? JSON.parse(body) : {};
  } catch {
    payload = { raw: body };
  }

  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${url} failed (${response.status}): ${JSON.stringify(payload)}`);
  }

  return payload;
}

export async function getAccessToken() {
  const payload = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requiredEnv('GOOGLE_OAUTH_CLIENT_ID'),
      client_secret: requiredEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
      refresh_token: requiredEnv('GOOGLE_OAUTH_REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    }),
  });

  if (!payload.access_token) throw new Error('Google token refresh did not return an access token.');
  return payload.access_token;
}

export function csv(rows, columns) {
  const quote = (value) => {
    const string = String(value ?? '');
    return /[",\n\r]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
  };

  return [
    columns.map((column) => quote(column.label)).join(','),
    ...rows.map((row) => columns.map((column) => quote(column.value(row))).join(',')),
    '',
  ].join('\n');
}

export function writeCsv(path, rows, columns) {
  writeFileSync(path, csv(rows, columns));
  console.log(`Wrote ${path} (${rows.length} rows)`);
}

export function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

export function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return isoDate(date);
}
