# 100 Click Sprint

Goal: reach the first 100 Google organic clicks for WC26 Chances, then use the sensor report to decide what to scale.

## Target

- Primary metric: 100 Google Search Console clicks.
- Secondary metrics: 1,000+ impressions, 3%+ CTR on the best query/page pair, 10+ outbound commercial clicks or route-alert clicks.
- Time box: May 28, 2026 to June 10, 2026.
- Source of truth: Search Console export processed by `npm run sensors:seo`.

## Focus Pages

1. Home page: "World Cup 2026 team cities" and broad team-route discovery.
2. Team pages: top demand teams first, especially USA, Mexico, Argentina, Brazil, England, Spain, France, Portugal.
3. Cities page: host-city and travel planning intent.
4. Scenarios page: knockout route and bracket-path intent.

## Daily Loop

1. Export Search Console query/page CSV and analytics page CSV into `ops/sensor-inputs/`.
2. Run `npm run sensors:seo`.
3. Review `ops/weekly-reports/seo-sensor-snapshot.md`.
4. Add one row to `ops/seo-opportunity-log.md` before changing any page.
5. Ship one focused improvement: title/meta, internal link, page section, CTA placement, or missing page.

## Current Sensor Capability

The sensor layer can measure traffic from CSV exports today:

- Google organic clicks and impressions from Search Console.
- Pageviews or sessions from analytics exports.
- Commercial outbound clicks, route-alert clicks, key events, or conversions from analytics exports.

Direct API pulling from Search Console or GA4 is a later automation step.

## First Moves

- Submit `https://wc26chances.com/sitemap.xml` in Google Search Console.
- Verify analytics is live with either `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- Share 8 priority team URLs manually to force discovery and collect early behavior signals.
- Add dedicated city pages after the first sensor report confirms host-city impressions.
- Keep all ticket and hotel language neutral until partner availability is verified.

## Pass / Fail

Pass: 100 organic clicks with at least one query/page pair showing repeatable impressions.

Fail: fewer than 100 clicks and no page with 100+ impressions. If this happens, prioritize indexing, internal links, and more specific pages before monetization work.
