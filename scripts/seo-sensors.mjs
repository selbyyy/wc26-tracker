import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const searchConsolePath = resolve(root, 'ops/sensor-inputs/search-console.csv');
const analyticsPagesPath = resolve(root, 'ops/sensor-inputs/analytics-pages.csv');
const outputPath = resolve(root, 'ops/weekly-reports/seo-sensor-snapshot.md');
const firstClickTarget = 100;

function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);

  const [headers = [], ...records] = rows;
  const normalizedHeaders = headers.map((header) => normalizeKey(header));

  return records.map((record) => Object.fromEntries(
    normalizedHeaders.map((header, index) => [header, record[index] ?? '']),
  ));
}

function normalizeKey(key) {
  return key.toLowerCase().replaceAll(/\s+/g, '_').replaceAll(/[^\w]/g, '');
}

function numberValue(value) {
  const cleaned = String(value ?? '').replaceAll('%', '').replaceAll(',', '').trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readCsvInput(path) {
  const exists = existsSync(path);
  return {
    exists,
    rows: exists ? parseCsv(readFileSync(path, 'utf8')) : [],
  };
}

function pick(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== '') return row[key];
  }

  return '';
}

const searchConsoleInput = readCsvInput(searchConsolePath);
const analyticsPagesInput = readCsvInput(analyticsPagesPath);

const searchRows = searchConsoleInput.rows.map((row) => ({
  query: pick(row, ['query', 'top_queries']),
  page: pick(row, ['page', 'pages', 'url', 'landing_page']),
  clicks: numberValue(pick(row, ['clicks'])),
  impressions: numberValue(pick(row, ['impressions'])),
  ctr: numberValue(pick(row, ['ctr', 'url_ctr'])) / (String(pick(row, ['ctr', 'url_ctr'])).includes('%') ? 100 : 1),
  position: numberValue(pick(row, ['position', 'average_position'])),
}));

const analyticsRows = analyticsPagesInput.rows.map((row) => ({
  page: pick(row, ['page', 'path', 'landing_page', 'page_path']),
  views: numberValue(pick(row, ['views', 'pageviews', 'screen_page_views', 'sessions'])),
  engagement: numberValue(pick(row, ['engagement_rate', 'engaged_sessions', 'average_engagement_time'])),
  commercialClicks: numberValue(pick(row, ['commercial_clicks', 'outbound_clicks', 'key_events', 'conversions'])),
}));

const highImpressionLowCtr = searchRows
  .filter((row) => row.impressions >= 100 && row.ctr > 0 && row.ctr < 0.03)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 12);

const strikingDistance = searchRows
  .filter((row) => row.position >= 8 && row.position <= 20)
  .sort((a, b) => a.position - b.position || b.impressions - a.impressions)
  .slice(0, 12);

const trafficNoCommercialAction = analyticsRows
  .filter((row) => row.views >= 50 && row.commercialClicks === 0)
  .sort((a, b) => b.views - a.views)
  .slice(0, 12);

const totalClicks = searchRows.reduce((sum, row) => sum + row.clicks, 0);
const totalImpressions = searchRows.reduce((sum, row) => sum + row.impressions, 0);
const totalViews = analyticsRows.reduce((sum, row) => sum + row.views, 0);
const totalCommercialClicks = analyticsRows.reduce((sum, row) => sum + row.commercialClicks, 0);
const averageCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
const clickProgress = Math.min(totalClicks / firstClickTarget, 1);

function table(rows, columns) {
  if (rows.length === 0) return '_No rows matched this sensor._';

  const header = `| ${columns.map((column) => column.label).join(' |')} |`;
  const divider = `| ${columns.map(() => '---').join(' |')} |`;
  const body = rows.map((row) => `| ${columns.map((column) => column.format(row)).join(' |')} |`);

  return [header, divider, ...body].join('\n');
}

function percent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function inputSummary(input, rowCount) {
  if (!input.exists) return 'missing';
  if (rowCount === 0) return 'present, 0 rows';
  return `present, ${rowCount} rows`;
}

function inputAction(input, rowCount, fileName) {
  if (!input.exists) return `Export and add \`${fileName}\`.`;
  if (rowCount === 0) return `Replace \`${fileName}\` with a non-empty export.`;
  return 'Ready for opportunity analysis.';
}

const generatedAt = new Date().toISOString().slice(0, 10);
const report = `# SEO Sensor Snapshot

Generated: ${generatedAt}

## Inputs

- Search Console: \`${searchConsolePath.replace(`${root}/`, '')}\` (${inputSummary(searchConsoleInput, searchRows.length)})
- Analytics pages: \`${analyticsPagesPath.replace(`${root}/`, '')}\` (${inputSummary(analyticsPagesInput, analyticsRows.length)})

## Input Readiness

| Input | Status | Next action |
| --- | --- | --- |
| Search Console | ${inputSummary(searchConsoleInput, searchRows.length)} | ${inputAction(searchConsoleInput, searchRows.length, 'ops/sensor-inputs/search-console.csv')} |
| Analytics pages | ${inputSummary(analyticsPagesInput, analyticsRows.length)} | ${inputAction(analyticsPagesInput, analyticsRows.length, 'ops/sensor-inputs/analytics-pages.csv')} |

## Traffic Summary

| Metric | Value |
| --- | --- |
| 100-click sprint progress | ${totalClicks} / ${firstClickTarget} (${percent(clickProgress)}) |
| Google organic clicks | ${totalClicks} |
| Google impressions | ${totalImpressions} |
| Average organic CTR | ${percent(averageCtr)} |
| Analytics pageviews/sessions | ${totalViews} |
| Commercial or route-alert clicks | ${totalCommercialClicks} |

## High Impressions, Low CTR

${table(highImpressionLowCtr, [
  { label: 'Query', format: (row) => row.query || 'n/a' },
  { label: 'Page', format: (row) => row.page || 'n/a' },
  { label: 'Impressions', format: (row) => String(row.impressions) },
  { label: 'CTR', format: (row) => percent(row.ctr) },
  { label: 'Position', format: (row) => row.position.toFixed(1) },
])}

## Ranking 8-20

${table(strikingDistance, [
  { label: 'Query', format: (row) => row.query || 'n/a' },
  { label: 'Page', format: (row) => row.page || 'n/a' },
  { label: 'Impressions', format: (row) => String(row.impressions) },
  { label: 'Position', format: (row) => row.position.toFixed(1) },
])}

## Traffic With No Commercial Action

${table(trafficNoCommercialAction, [
  { label: 'Page', format: (row) => row.page || 'n/a' },
  { label: 'Views', format: (row) => String(row.views) },
  { label: 'Commercial clicks', format: (row) => String(row.commercialClicks) },
  { label: 'Engagement signal', format: (row) => String(row.engagement) },
])}

## AI Loop Handoff

- Add one row to \`ops/seo-opportunity-log.md\` before changing a page from this report.
- Favor title/meta/internal-link changes for high-impression low-CTR rows.
- Favor page expansion and internal links for ranking 8-20 rows.
- Favor CTA placement or offer changes for traffic with no commercial action.
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, report);
console.log(`Wrote ${outputPath}`);
