# Sensor Inputs

Drop exported CSVs here before running the AI loop sensors.

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
- Commercial or route-alert click totals.
- Query/page opportunities for the next AI loop change.
