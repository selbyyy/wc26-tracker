import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { daysAgo, fetchJson, getAccessToken, writeCsv } from './google-api-common.mjs';

const root = process.cwd();
const inputDir = resolve(root, 'ops/sensor-inputs');
const searchConsolePath = resolve(inputDir, 'search-console.csv');
const analyticsPagesPath = resolve(inputDir, 'analytics-pages.csv');
const siteUrl = process.env.GSC_SITE_URL?.trim() || 'https://www.wc26chances.com/';
const ga4PropertyId = process.env.GA4_PROPERTY_ID?.trim() || '539351001';
const accessToken = await getAccessToken();
const headers = {
  authorization: `Bearer ${accessToken}`,
  'content-type': 'application/json',
};

mkdirSync(inputDir, { recursive: true });

async function post(url, body) {
  return fetchJson(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

async function pullSearchConsole() {
  const endDate = process.env.GSC_END_DATE?.trim() || daysAgo(2);
  const startDate = process.env.GSC_START_DATE?.trim() || daysAgo(30);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const payload = await post(url, {
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    rowLimit: 25000,
    dataState: 'final',
  });

  const rows = (payload.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? '',
    page: row.keys?.[1] ?? '',
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));

  writeCsv(searchConsolePath, rows, [
    { label: 'Query', value: (row) => row.query },
    { label: 'Page', value: (row) => row.page },
    { label: 'Clicks', value: (row) => row.clicks },
    { label: 'Impressions', value: (row) => row.impressions },
    { label: 'CTR', value: (row) => row.ctr },
    { label: 'Position', value: (row) => row.position },
  ]);
}

async function pullAnalytics() {
  const dateRanges = [{
    startDate: process.env.GA4_START_DATE?.trim() || '28daysAgo',
    endDate: process.env.GA4_END_DATE?.trim() || 'yesterday',
  }];
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${ga4PropertyId}:runReport`;
  const [pagesPayload, eventsPayload] = await Promise.all([
    post(url, {
      dateRanges,
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'engagementRate' },
      ],
      limit: '10000',
    }),
    post(url, {
      dateRanges,
      dimensions: [{ name: 'pagePath' }, { name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: ['ticket_planning_click', 'hotel_planning_click', 'route_alert_click'],
          },
        },
      },
      limit: '10000',
    }),
  ]);

  const clicksByPage = new Map();
  for (const row of eventsPayload.rows ?? []) {
    const page = row.dimensionValues?.[0]?.value ?? '';
    const count = Number(row.metricValues?.[0]?.value ?? 0);
    clicksByPage.set(page, (clicksByPage.get(page) ?? 0) + count);
  }

  const rows = (pagesPayload.rows ?? []).map((row) => {
    const page = row.dimensionValues?.[0]?.value ?? '';
    return {
      page,
      views: row.metricValues?.[0]?.value ?? 0,
      sessions: row.metricValues?.[1]?.value ?? 0,
      engagementRate: row.metricValues?.[2]?.value ?? 0,
      commercialClicks: clicksByPage.get(page) ?? 0,
    };
  });

  writeCsv(analyticsPagesPath, rows, [
    { label: 'Page', value: (row) => row.page },
    { label: 'Views', value: (row) => row.views },
    { label: 'Sessions', value: (row) => row.sessions },
    { label: 'Engagement rate', value: (row) => row.engagementRate },
    { label: 'Commercial clicks', value: (row) => row.commercialClicks },
  ]);
}

await Promise.all([pullSearchConsole(), pullAnalytics()]);
console.log('Google sensor refresh complete.');
