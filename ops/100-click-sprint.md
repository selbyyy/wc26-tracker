# 100 Click Sprint

Goal: reach the first 100 Google organic clicks for WC26 Chances, then use the sensor report to decide what to scale.

See `ops/world-cup-growth-milestones.md` for the tournament-calendar version of this sprint. As of June 5, 2026, the original June 10 target is a stretch target because the site is still in indexing/canonical migration.

## Target

- Primary metric: 100 Google Search Console clicks.
- Secondary metrics: 1,000+ impressions, 3%+ CTR on the best query/page pair, 10+ outbound commercial clicks or route-alert clicks.
- Time box: May 28, 2026 to first 100 Google organic clicks. The original June 10 target was missed because indexing and canonical migration lagged.
- Source of truth: Search Console export processed by `npm run sensors:seo`.

## Tournament-Live Recovery

As of June 14, 2026, the tournament is live and Google organic clicks remain 0.
The sprint should not wait passively for broad SEO pickup.

Immediate priority order:

1. Current-slate page: keep `/world-cup-2026-games-today` visible from home and `/matches`.
2. Indexed pages first: use already indexed team/chances pages to internally link toward current matches and cities.
3. Human-reviewed distribution: answer fresh match-day, ticket, and travel questions with useful schedule context and link only when directly helpful.
4. Indexing checks: monitor the today page plus priority match/city pages through URL Inspection.
5. CTR tests only after impressions reach 300-500 with repeated zero-click rows on live pages.

## Focus Pages

1. Home page: "World Cup 2026 team cities" and broad team-route discovery.
2. Team pages: top demand teams first, especially USA, Mexico, Argentina, Brazil, England, Spain, France, Portugal.
3. Today page: current match slate and shareable match-day landing page.
4. Match pages: exact matchup and current-slate intent.
5. Cities page: host-city and travel planning intent.
6. Scenarios page: knockout route and bracket-path intent.

## Daily Loop

1. Export Search Console query/page CSV and analytics page CSV into `ops/sensor-inputs/`.
2. Run `npm run sensors:seo`.
3. Review `ops/weekly-reports/seo-sensor-snapshot.md`.
4. Add one row to `ops/seo-opportunity-log.md` before changing any page.
5. Ship one focused improvement: title/meta, internal link, page section, CTA placement, or missing page.

## Current Sensor Capability

The sensor layer can pull Google API data and generate local CSV inputs after
the one-time OAuth setup in `ops/google-sensor-setup.md`:

- Google organic query/page clicks, impressions, CTR, and position from Search Console.
- GA4 pageviews, sessions, and engagement rate.
- Commercial outbound clicks and route-alert clicks from GA4 events.
- Acquisition source and medium by page from GA4.
- URL Inspection coverage, canonical, and fetch status for priority URLs.

Manual CSV exports remain available as a fallback.

## First Moves

- Submit `https://wc26chances.com/sitemap.xml` in Google Search Console.
- Verify analytics is live with either `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- Share 8 priority team URLs manually to force discovery and collect early behavior signals.
- Add dedicated city pages after the first sensor report confirms host-city impressions.
- Keep all ticket and hotel language neutral until partner availability is verified.

## Pass / Fail

Pass: 100 organic clicks with at least one query/page pair showing repeatable impressions.

Fail: fewer than 100 clicks and no page with 100+ impressions. If this happens, prioritize indexing, internal links, and more specific pages before monetization work.
