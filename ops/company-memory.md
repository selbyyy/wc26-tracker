# Company Memory

This file is the durable operating memory for WC26 Chances.

Every daily, weekly, or manual growth loop must append a dated entry here, even if the run is blocked by missing credentials, missing exports, or lack of safe actions.

The purpose is to preserve the chain of context:

- what data was available
- what the system observed
- what decision was made
- what was executed
- what quality gates ran
- what should be checked next

Do not treat this as a changelog. A changelog says what changed. Company memory says why the company believed that change was the right next move.

## Entry Template

```md
## YYYY-MM-DD HH:mm TZ - Loop Name

### Inputs
- User instruction:
- Search Console:
- Analytics:
- Revenue / CTA:
- Site health:
- Code state:
- Relevant memory:

### Observations
- 

### Decision
- 

### Actions Taken
- 

### Files Changed
- 

### Quality Gates
- 

### Expected Impact
- 

### Follow-Up
- 
```

## 2026-05-29 - Company Memory Protocol Added

### Inputs
- User instruction: make every WC26 loop record its result, thinking, decisions, and execution as company memory.
- Search Console: not checked in this protocol update.
- Analytics: not checked in this protocol update.
- Revenue / CTA: not checked in this protocol update.
- Site health: not checked in this protocol update.
- Code state: working tree was clean before adding this memory protocol.
- Relevant memory: `ops/ai-loop.md` already defines sensors, policy, tools, quality gates, and learning mechanism.

### Observations
- The daily automation can inspect sensors and make safe improvements, but without a durable memory file it may lose the reasoning behind each change.
- `ops/experiments.md` records structured experiments, but it is not enough for day-by-day operating context.
- A dedicated append-only memory file gives future loops a place to recover prior observations, blocked states, decisions, and expected follow-ups.

### Decision
- Add `ops/company-memory.md` as the mandatory memory surface for daily, weekly, and manual loops.
- Update the AI loop and quality gate docs so future runs must append a memory entry before finishing.
- Update the daily automation prompt so the automation treats memory writing as required behavior, even when external credentials are missing.

### Actions Taken
- Created the company memory file with a reusable entry template.
- Documented the reason for the memory protocol in the first entry.
- Updated the active `WC26 Chances daily growth loop` automation so every run must read `/ops`, append to `ops/company-memory.md`, and update experiments or SEO opportunity logs when relevant.

### Files Changed
- `ops/company-memory.md`
- `ops/ai-loop.md`
- `ops/quality-gates.md`
- Codex automation: `wc26-chances-daily-growth-loop`

### Quality Gates
- Documentation-only change.
- No build required for this file alone.
- Automation prompt update preserved the existing daily schedule and active status.

### Expected Impact
- Future loops should become cumulative instead of isolated reports.
- Decisions should become auditable: future Codex runs can inspect not only what changed, but why.
- Blocked runs should still improve the system by recording the precise missing sensor or credential.

### Follow-Up
- Confirm the daily automation appends a new entry on its next run.
- Add weekly summaries in `ops/weekly-reports/` after enough daily entries accumulate.

## 2026-05-29 19:35 CST - Manual 100-Click Sensor Loop

### Inputs
- User instruction: Continue WC26 Chances under `/ops/ai-loop.md` and `/ops/company-memory.md`; read company memory first, check sensors and the 100-click milestone, safely execute if possible, and append this loop to company memory.
- Search Console: `ops/sensor-inputs/search-console.csv` was missing; `npm run sensors:seo` reported 0 Google organic clicks and 0 impressions.
- Analytics: `ops/sensor-inputs/analytics-pages.csv` was missing; `npm run sensors:seo` reported 0 pageviews/sessions and 0 commercial or route-alert clicks.
- Revenue / CTA: Commercial CTA components and tracking attributes are present on home, team, cities, and scenarios pages, but no analytics export is available to validate outbound click volume.
- Site health: `app/sitemap.ts` and `app/robots.ts` are present; local production build generated the index, cities, scenarios, robots, sitemap, and 49 team paths.
- Code state: Working tree already had protocol changes in `ops/ai-loop.md`, `ops/quality-gates.md`, and untracked `ops/company-memory.md`; this run preserved those and added sensor tooling/report changes.
- Relevant memory: The prior memory entry created the mandatory company-memory protocol. `ops/100-click-sprint.md` defines the first milestone as 100 Google organic clicks by 2026-06-10.

### Observations
- The 100-click sprint remains at 0 / 100 because both required sensor exports are absent.
- The previous sensor snapshot said "0 rows" for both inputs, which made missing CSV files look like valid empty exports.
- No Search Console or analytics signal exists yet to justify changing high-traffic metadata, page content, CTAs, or city-page scope.
- A safe improvement was available in the sensor layer: distinguish missing inputs from present-but-empty exports so future loops know the exact blocker.

### Decision
- Do not change user-facing schedule facts, titles, CTAs, or page content without real sensor rows.
- Improve `npm run sensors:seo` so the generated report clearly records missing, empty, or ready sensor inputs.
- Regenerate the sensor snapshot for 2026-05-29 and keep the sprint status at 0 / 100 until Search Console data arrives.

### Actions Taken
- Updated `scripts/seo-sensors.mjs` to track whether each CSV exists before parsing rows.
- Added an `Input Readiness` section to the generated SEO sensor snapshot with the exact next action for each missing or empty input.
- Ran `npm run sensors:seo`, producing a 2026-05-29 report that marks both sensor CSVs as missing.

### Files Changed
- `scripts/seo-sensors.mjs`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:seo` passed and wrote `ops/weekly-reports/seo-sensor-snapshot.md`.
- `npm run lint` passed.
- `npm run build` passed.
- SEO opportunity log was not updated because no page-level SEO change was made from sensor data.

### Expected Impact
- Future AI loops should no longer confuse missing exports with zero traffic.
- The next operator has a concrete blocker: add `ops/sensor-inputs/search-console.csv` and `ops/sensor-inputs/analytics-pages.csv`.
- The 100-click sprint remains conservative until real impressions, clicks, pageviews, and CTA events are available.

### Follow-Up
- Export Search Console query/page data to `ops/sensor-inputs/search-console.csv`.
- Export GA4/Plausible page or landing-page data with outbound/key-event counts to `ops/sensor-inputs/analytics-pages.csv`.
- Verify production analytics has `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` configured.
- Submit `https://www.wc26chances.com/sitemap.xml` in Google Search Console and manually share the eight priority team URLs from the sprint doc.

## 2026-05-30 10:07 CST - Daily 100-Click Growth Loop

### Inputs
- User instruction: Automated daily WC26 Chances growth loop for the first 100 organic clicks; read `/ops`, check Search Console and GA4/analytics sensors, safely iterate if possible, update opportunity/experiment logs, and append company memory.
- Search Console: Live browser inspection was blocked in this heartbeat session because Chrome did not expose a readable automation window (`cgWindowNotFound`). Local CSV sensor input `ops/sensor-inputs/search-console.csv` is still missing, so `npm run sensors:seo` reports 0 clicks, 0 impressions, 0% CTR, and no top queries/pages from local exports.
- Analytics: Live GA4 inspection was blocked by the same Chrome automation issue. Local CSV sensor input `ops/sensor-inputs/analytics-pages.csv` is still missing, so `npm run sensors:seo` reports 0 pageviews/sessions and 0 commercial or route-alert clicks from local exports. Prior manual browser work confirmed GA4 access to the `WC26 Chances` property was working and realtime showed 0 active users at that time.
- Revenue / CTA: No export rows available for outbound commercial clicks, route-alert clicks, key events, conversions, or revenue.
- Site health: `npm run build` generated 57 static/SSG routes after adding the schedule-by-team hub. Sitemap includes the new URL and all team pages.
- Code state: Working tree already contained uncommitted ops/sensor protocol changes from the 2026-05-29 manual loop; this run preserved them and added a new page, sitemap link, home links, opportunity row, experiment row, and this memory entry.
- Relevant memory: `ops/100-click-sprint.md` targets 100 Google organic clicks by 2026-06-10. Prior product work already strengthened team, city, and route SEO hubs; the previous recommended P1 follow-up was a dedicated `/world-cup-2026-schedule-by-team` page.

### Observations
- The source-of-truth exported sensor layer is still blocked by missing CSVs, so the conservative measurable sprint state remains 0 / 100 clicks from local inputs.
- Live browser data cannot be read in this heartbeat run, so the current Search Console top queries/pages, indexed-page counts, and GA4 CTA/revenue signals cannot be verified today through automation.
- A safe local SEO improvement was available without new external data: create a dedicated schedule-by-team hub for the exact broad intent already identified in P1 and link it from the home page.
- The new hub reduces dependence on the home page for the `World Cup 2026 schedule by team` query and gives Google a more explicit, indexable target page.

### Decision
- Record the live-sensor blocker rather than inferring fresh Search Console or GA4 numbers.
- Ship the dedicated schedule-by-team hub because it is a low-risk P1 page addition based on existing project schedule data, not invented facts.
- Update `ops/seo-opportunity-log.md` and `ops/experiments.md` because this is a material SEO experiment.

### Actions Taken
- Added `/world-cup-2026-schedule-by-team` with every team, group, opponents, confirmed cities, match dates, stadiums, team-page links, commercial CTAs, FAQ content, and FAQPage JSON-LD.
- Added the new hub to `app/sitemap.ts` with priority 0.9.
- Added home-page links to the new hub in the nav and search-answer section.
- Added a shipped opportunity row for the schedule-by-team index intent.
- Added `EXP-004` for the dedicated schedule-by-team hub.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`, which still marks Search Console and analytics CSVs as missing.

### Files Changed
- `app/world-cup-2026-schedule-by-team/page.tsx`
- `app/sitemap.ts`
- `app/page.tsx`
- `ops/seo-opportunity-log.md`
- `ops/experiments.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:seo` passed and wrote `ops/weekly-reports/seo-sensor-snapshot.md`.
- `npm run lint` passed.
- `npm run build` passed, generating 57 routes including `/world-cup-2026-schedule-by-team`.
- Local production HTML check confirmed the new page title, description, FAQPage schema, Argentina team links, and CTA tracking context.
- Local sitemap check confirmed `https://www.wc26chances.com/world-cup-2026-schedule-by-team` is present.
- Local home-page HTML check confirmed links to `/world-cup-2026-schedule-by-team`.

### Expected Impact
- Gives Google a precise landing page for broad schedule-by-team queries instead of relying only on the home page.
- Improves internal link flow from the home page to all team pages through a structured index.
- Adds another measurable SEO experiment to the 100-click sprint without changing schedule facts or unsupported commercial claims.

### Follow-Up
- Export Search Console performance data to `ops/sensor-inputs/search-console.csv` or restore readable browser automation for live Search Console checks.
- Export GA4 page/event data to `ops/sensor-inputs/analytics-pages.csv` or restore readable browser automation for live GA4 checks.
- After deployment, request indexing for `https://www.wc26chances.com/world-cup-2026-schedule-by-team` in Search Console.
- Monitor whether schedule-by-team queries start producing impressions for the new hub within 2 to 7 days.
