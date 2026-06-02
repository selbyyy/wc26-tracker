# SEO Opportunity Log

Use this file to record search opportunities before changing pages.

| Date | Source | Query / Intent | Target Page | Current Signal | Proposed Change | Status | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-28 | Strategy | Team schedule and city intent | `/teams/[slug]` | Existing team pages | Strengthen titles, metadata, schema, CTAs | Planned | Pending |
| 2026-05-28 | Strategy | Host city match intent | `/cities` and future `/cities/[slug]` | Single city index page | Add dedicated city pages when data model is ready | Backlog | Pending |
| 2026-05-28 | Strategy | Ticket and travel planning intent | Team/city pages | No commercial surfaces yet | Add neutral planning CTA and tracked outbound clicks | Planned | Pending |
| 2026-05-28 | 100-click sprint | Priority team route discovery | `/teams/usa`, `/teams/mexico`, `/teams/argentina`, `/teams/brazil`, `/teams/england`, `/teams/spain`, `/teams/france`, `/teams/portugal` | No Search Console data yet | Submit sitemap, verify indexing, share priority URLs, then use first impressions to tune titles/internal links | Active | Target: 100 clicks by 2026-06-10 |
| 2026-05-30 | 100-click sprint | Schedule by team index intent | `/world-cup-2026-schedule-by-team` | Live sensors unavailable in this run; prior P1 backlog identified this exact query class | Add a dedicated schedule-by-team hub with every team, cities, opponents, stadiums, CTAs, FAQ schema, home link, and sitemap entry | Shipped | Monitor impressions and clicks after Google recrawls sitemap |
| 2026-06-01 | Search Console API | Argentina odds queries still resolve to retired URL | `/market/will-argentina-win-the-2026-fifa-world-cup` -> `/teams/argentina` | 39 impressions, 0 clicks, average position 88.6; live 301 works; sitemap reports 52 submitted and 0 indexed pages | Preserve the redirect, prioritize recrawl/indexing, and avoid duplicate odds content until Google processes the current URLs | Active | Monitor whether impressions migrate to `/teams/argentina` |
| 2026-06-01 | Search Console URL Inspection | Homepage canonical consolidation | `/` | Search Console reports the www homepage as duplicate and currently selects `https://wc26chances.com/`; production non-www already redirects to www with HTTP 307 | Request recrawl first; if Google continues selecting non-www after processing, evaluate a permanent redirect at the domain layer | Active | Homepage added to priority crawl queue |
| 2026-06-01 | Product positioning review | Team chances and route-planning intent | `/` and `/teams/[slug]` | Domain promises chances, but the homepage leads with schedule; team pages contain a planning model below the fold; Search Console impressions are already concentrated in Argentina odds queries | Make chances the first product answer while preserving the dedicated schedule hub for schedule intent | Shipped | Monitor chance/odds impressions, clicks, and team-page engagement after recrawl |
| 2026-06-02 | User feedback | Clarify modelled advance probability | `/` and `/teams/[slug]` | `96% modelled chance to advance` can be misread as a tournament-winning probability | Rename the metric as chance to reach the knockout stage | Shipped | Monitor engagement and search migration after recrawl |
| 2026-06-02 | Search Console growth loop | Chances-by-team index intent | `/world-cup-2026-chances-by-team` | Google is testing odds queries for Argentina and Japan, while the site lacks a dedicated index page that explains and links the modelled team chances | Add a focused comparison hub with all teams, clear model labelling, FAQ schema, sitemap inclusion, and prominent internal links | Shipped | Submit for indexing and monitor crawl distribution |

## How To Use

Add one row before each SEO change. After at least 7 days, update the result with clicks, impressions, CTR, position, outbound clicks, or revenue.
