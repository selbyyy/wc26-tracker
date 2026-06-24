import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { daysAgo, fetchJson, getAccessToken, writeCsv } from './google-api-common.mjs';

const root = process.cwd();
const inputDir = resolve(root, 'ops/sensor-inputs');
const searchConsolePath = resolve(inputDir, 'search-console.csv');
const analyticsPagesPath = resolve(inputDir, 'analytics-pages.csv');
const analyticsEventsPath = resolve(inputDir, 'analytics-events.csv');
const analyticsAcquisitionPath = resolve(inputDir, 'analytics-acquisition.csv');
const urlInspectionPath = resolve(inputDir, 'url-inspection.csv');
const siteUrl = process.env.GSC_SITE_URL?.trim() || 'https://www.wc26chances.com/';
const ga4PropertyId = process.env.GA4_PROPERTY_ID?.trim() || '539351001';
const inspectionTimeoutMs = Number(process.env.URL_INSPECTION_TIMEOUT_MS?.trim() || 15000);
const defaultInspectionUrls = [
  'https://www.wc26chances.com/',
  'https://www.wc26chances.com/world-cup-2026-games-today',
  'https://www.wc26chances.com/teams/argentina',
  'https://www.wc26chances.com/teams/usa',
  'https://www.wc26chances.com/world-cup-2026-chances-by-team',
  'https://www.wc26chances.com/matches/netherlands-vs-japan-world-cup-2026-match-10',
  'https://www.wc26chances.com/matches/argentina-vs-algeria-world-cup-2026-match-19',
  'https://www.wc26chances.com/cities/dallas',
  'https://www.wc26chances.com/market/will-argentina-win-the-2026-fifa-world-cup',
];
const inspectionUrls = (process.env.URL_INSPECTION_URLS?.trim()
  ? process.env.URL_INSPECTION_URLS.split(',')
  : defaultInspectionUrls)
  .map((url) => url.trim())
  .filter(Boolean);
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

async function inspectUrl(inspectionUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), inspectionTimeoutMs);

  try {
    const payload = await fetchJson('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers,
      signal: controller.signal,
      curlMaxTimeSeconds: Math.ceil(inspectionTimeoutMs / 1000),
      body: JSON.stringify({
        inspectionUrl,
        siteUrl,
      }),
    });
    const result = payload.inspectionResult?.indexStatusResult ?? {};

    return {
      url: inspectionUrl,
      coverageState: result.coverageState ?? '',
      indexingState: result.indexingState ?? '',
      pageFetchState: result.pageFetchState ?? '',
      robotsTxtState: result.robotsTxtState ?? '',
      userCanonical: result.userCanonical ?? '',
      googleCanonical: result.googleCanonical ?? '',
      lastCrawlTime: result.lastCrawlTime ?? '',
      sitemap: (result.sitemap ?? []).join(' | '),
      error: '',
    };
  } catch (error) {
    return {
      url: inspectionUrl,
      coverageState: '',
      indexingState: '',
      pageFetchState: '',
      robotsTxtState: '',
      userCanonical: '',
      googleCanonical: '',
      lastCrawlTime: '',
      sitemap: '',
      error: error.name === 'AbortError'
        ? `URL Inspection timed out after ${inspectionTimeoutMs}ms`
        : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function pullUrlInspection() {
  const rows = [];
  for (const inspectionUrl of inspectionUrls) {
    rows.push(await inspectUrl(inspectionUrl));
  }

  writeCsv(urlInspectionPath, rows, [
    { label: 'URL', value: (row) => row.url },
    { label: 'Coverage state', value: (row) => row.coverageState },
    { label: 'Indexing state', value: (row) => row.indexingState },
    { label: 'Page fetch state', value: (row) => row.pageFetchState },
    { label: 'Robots.txt state', value: (row) => row.robotsTxtState },
    { label: 'User canonical', value: (row) => row.userCanonical },
    { label: 'Google canonical', value: (row) => row.googleCanonical },
    { label: 'Last crawl time', value: (row) => row.lastCrawlTime },
    { label: 'Sitemap', value: (row) => row.sitemap },
    { label: 'Error', value: (row) => row.error },
  ]);
}

async function pullAnalytics() {
  const dateRanges = [{
    startDate: process.env.GA4_START_DATE?.trim() || '28daysAgo',
    endDate: process.env.GA4_END_DATE?.trim() || 'yesterday',
  }];
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${ga4PropertyId}:runReport`;
  const [pagesPayload, eventsPayload, acquisitionPayload] = await Promise.all([
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
            values: ['planning_action_panel_view', 'ticket_planning_click', 'hotel_planning_click', 'route_alert_click'],
          },
        },
      },
      limit: '10000',
    }),
    post(url, {
      dateRanges,
      dimensions: [
        { name: 'pagePath' },
        { name: 'sessionSourceMedium' },
        { name: 'sessionDefaultChannelGroup' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
      ],
      limit: '10000',
    }),
  ]);

  const eventRows = [];
  const clicksByPage = new Map();
  for (const row of eventsPayload.rows ?? []) {
    const page = row.dimensionValues?.[0]?.value ?? '';
    const eventName = row.dimensionValues?.[1]?.value ?? '';
    const count = Number(row.metricValues?.[0]?.value ?? 0);
    eventRows.push({ page, eventName, count });
    if (eventName.endsWith('_click')) {
      clicksByPage.set(page, (clicksByPage.get(page) ?? 0) + count);
    }
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

  writeCsv(analyticsEventsPath, eventRows, [
    { label: 'Page', value: (row) => row.page },
    { label: 'Event', value: (row) => row.eventName },
    { label: 'Count', value: (row) => row.count },
  ]);

  const acquisitionRows = (acquisitionPayload.rows ?? []).map((row) => ({
    page: row.dimensionValues?.[0]?.value ?? '',
    sourceMedium: row.dimensionValues?.[1]?.value ?? '',
    channel: row.dimensionValues?.[2]?.value ?? '',
    views: row.metricValues?.[0]?.value ?? 0,
    sessions: row.metricValues?.[1]?.value ?? 0,
  }));

  writeCsv(analyticsAcquisitionPath, acquisitionRows, [
    { label: 'Page', value: (row) => row.page },
    { label: 'Source / medium', value: (row) => row.sourceMedium },
    { label: 'Channel', value: (row) => row.channel },
    { label: 'Views', value: (row) => row.views },
    { label: 'Sessions', value: (row) => row.sessions },
  ]);
}

await Promise.all([pullSearchConsole(), pullAnalytics(), pullUrlInspection()]);
console.log('Google sensor refresh complete.');
