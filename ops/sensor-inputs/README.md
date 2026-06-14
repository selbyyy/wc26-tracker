# Sensor Inputs

The preferred path is an automated Google API refresh:

```bash
npm run sensors:refresh
```

This pulls Search Console and GA4 data into local CSV files, then generates
`ops/weekly-reports/seo-sensor-snapshot.md`. Complete the one-time setup in
[`ops/google-sensor-setup.md`](../google-sensor-setup.md) first.

Manual CSV exports remain a fallback. Drop them here before running
`npm run sensors:seo`.

## `search-console.csv`

Expected columns can use Google Search Console names:

- `Query`
- `Page`
- `Clicks`
- `Impressions`
- `CTR`
- `Position`

## `analytics-pages.csv`

Expected columns can use GA4/Plausible-style names:

- `Page` or `Page path`
- `Views`, `Pageviews`, `Screen page views`, or `Sessions`
- `Engagement rate`, `Engaged sessions`, or `Average engagement time`
- `Commercial clicks`, `Outbound clicks`, `Key events`, or `Conversions`

## `analytics-events.csv`

Expected columns can use:

- `Page` or `Page path`
- `Event` or `Event name`
- `Count` or `Event count`

## `analytics-acquisition.csv`

Expected columns can use:

- `Page` or `Page path`
- `Source / medium` or `Source medium`
- `Channel` or `Default channel group`
- `Views`, `Pageviews`, or `Screen page views`
- `Sessions`

Run:

```bash
npm run sensors:seo
```

The report is written to `ops/weekly-reports/seo-sensor-snapshot.md`.

The report includes:

- 100-click sprint progress.
- Total Google clicks and impressions.
- Average organic CTR.
- Analytics pageview/session totals.
- Planning action panel views.
- Commercial or route-alert click totals.
- Commercial event summaries by page.
- Acquisition source summaries by page.
- Query/page opportunities for the next AI loop change.
