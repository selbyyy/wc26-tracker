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

## 2026-05-31 10:10 CST - Daily 100-Click Growth Loop

### Inputs
- Search Console: Live browser access worked. The three-month Performance report, updated 3.5 hours before this run, showed 0 clicks, 20 impressions, 0% CTR, and average position 83.1 for May 27 to May 28, 2026. The visible queries were all Argentina odds variants, led by `argentina to win world cup odds` (4 impressions) and `odds on argentina to win world cup 2026` (4 impressions).
- Search Console pages: The visible rows were the retired `/market/will-argentina-win-the-2026-fifa-world-cup` URL (20 impressions), the retired Japan market URL (1 impression), and the retired Ivory Coast market URL (1 impression). The Google UI total remained 20 impressions even though the visible rows summed to 22, so this entry preserves the displayed total without inferring a reconciliation.
- Search Console sitemap and indexing: `/sitemap.xml` is `Success`, was last read on May 31, 2026, and reports 52 discovered pages. The Pages report is still processing and does not expose indexed or non-indexed counts yet.
- Analytics: Live GA4 access to the `WC26 Chances` property worked. Realtime showed 0 active users in the last 30 minutes and 0 active users in the last 5 minutes. Views, event counts, key events, and source rows had no data available.
- Revenue / CTA: No GA4 event rows or local analytics export are available, so outbound CTA clicks, route-alert clicks, conversions, and revenue cannot be measured yet.
- Local sensors: `ops/sensor-inputs/search-console.csv` and `ops/sensor-inputs/analytics-pages.csv` are still missing. `npm run sensors:seo` regenerated the snapshot but the local sensor report remains at 0 / 100 until export inputs are connected.
- Site health: Production checks returned 200 for the homepage, sitemap, and `/world-cup-2026-schedule-by-team`. The retired Argentina market URL returned 301 to `/teams/argentina`.

### Observations
- The sprint remains at 0 / 100 organic clicks. Live Search Console impressions increased from 12 to 20 since the prior manual measurement, while average position improved from 85.8 to 83.1.
- Google's visible demand is still concentrated on Argentina odds queries and retired `/market/...` URLs. The live 301 redirects are working, so the current bottleneck is recrawl and reindex lag rather than a missing redirect.
- The sitemap has been re-read after the schedule-by-team hub shipped. Adding another content page today would make `EXP-004` harder to evaluate before Google has had time to crawl the new hub.
- Browser-based measurement works, but the repeatable local CSV/API sensor path is still incomplete.

### Decision
- Do not ship another content page today. Preserve the measurement window for `EXP-004`.
- Request indexing for `https://www.wc26chances.com/world-cup-2026-schedule-by-team` through Search Console URL Inspection.
- Regenerate the local sensor snapshot and record live browser measurements in company memory.

### Actions Taken
- Ran `npm run sensors:seo`.
- Verified production homepage, sitemap, schedule-by-team hub, and the retired Argentina market redirect.
- Checked live Search Console Performance, Pages, Sitemaps, and Page indexing reports.
- Checked live GA4 Realtime access and current event availability.
- Submitted the schedule-by-team hub in Search Console URL Inspection. Search Console confirmed that the URL was added to a priority crawl queue.

### Files Changed
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:seo` passed and wrote `ops/weekly-reports/seo-sensor-snapshot.md`.
- Production HTTP checks passed for homepage, sitemap, schedule-by-team hub, and retired Argentina market redirect.
- No application code changed, so lint and build were not rerun.

### Expected Impact
- The indexing request should accelerate discovery of the new schedule-by-team hub without contaminating the current experiment with another content change.
- Continued daily browser measurements will show whether Google begins replacing retired `/market/...` impressions with current team or schedule hub URLs.

### Follow-Up
- Check whether the new hub appears in Search Console pages or queries within 2 to 7 days.
- Monitor whether retired `/market/...` impressions migrate to `/teams/...` pages after the 301 redirects are recrawled.
- Connect repeatable Search Console and GA4 export/API inputs so `npm run sensors:seo` can operate without browser-only measurements.

## 2026-05-31 12:16 CST - Google API Sensor Automation

### Inputs
- User instruction: Close the automation loop so daily Search Console and GA4 measurement no longer depends on manual browser inspection.
- Existing sensor layer: `npm run sensors:seo` processed local CSV files, but no script pulled Search Console or GA4 data.
- Local credentials: No `.env.sensors.local`, Google OAuth client credentials, `gcloud`, or Application Default Credentials were present on this machine.
- Existing analytics events: `CommercialCta` emits `ticket_planning_click`, `hotel_planning_click`, and `route_alert_click`. GA4 property ID `539351001` was previously confirmed through live browser access.

### Observations
- Daily browser reads are useful as a fallback but are not a reliable unattended sensor because Chrome automation can occasionally fail.
- A one-time Google OAuth desktop authorization can produce a refresh token that daily local scripts reuse without repeated user interaction.
- Read-only Search Console and Analytics scopes are sufficient for the measurement loop.

### Decision
- Add an automated Google API pull layer with a one-time OAuth bootstrap.
- Keep generated API CSV files local and ignored by Git while preserving `npm run sensors:seo` as the report generator and manual fallback.
- Do not attempt to create Google Cloud OAuth credentials programmatically. The user must create the desktop OAuth client in Google Cloud Console and approve the read-only authorization once.

### Actions Taken
- Added `npm run sensors:oauth`, `npm run sensors:pull-google`, and `npm run sensors:refresh`.
- Added a shared Google API helper for refresh-token authentication, JSON requests, dates, and CSV output.
- Added Search Console query/page pulling for final data and GA4 page/event pulling for pageviews, sessions, engagement rate, and tracked CTA clicks.
- Added a local OAuth callback bootstrap that stores the refresh token in ignored `.env.sensors.local` with file mode `0600`.
- Added `ops/google-sensor-setup.md` with the one-time Google Cloud and local authorization tutorial.
- Updated the sprint, AI loop, sensor README, and `.gitignore` to treat API refresh as the preferred path and CSV export as fallback.
- Updated the daily heartbeat automation to run `npm run sensors:refresh` first and use authenticated browser inspection only as a fallback.

### Files Changed
- `.gitignore`
- `package.json`
- `scripts/google-api-common.mjs`
- `scripts/google-oauth-bootstrap.mjs`
- `scripts/pull-google-sensors.mjs`
- `ops/google-sensor-setup.md`
- `ops/sensor-inputs/README.md`
- `ops/100-click-sprint.md`
- `ops/ai-loop.md`
- `ops/company-memory.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`

### Quality Gates
- `node --check scripts/google-api-common.mjs` passed.
- `node --check scripts/google-oauth-bootstrap.mjs` passed.
- `node --check scripts/pull-google-sensors.mjs` passed.
- `npm run sensors:seo` passed and regenerated the local report.
- `npm run lint` passed.
- `npm run build` passed, generating 57 static/SSG routes.
- `npm run sensors:pull-google` correctly stopped with `Missing GOOGLE_OAUTH_CLIENT_ID` because one-time OAuth setup is not complete.

### Expected Impact
- After one-time authorization, each daily loop can run `npm run sensors:refresh` to retrieve Search Console and GA4 data without browser automation.
- The report will contain real query/page performance and CTA behavior signals for autonomous iteration decisions.

### Follow-Up
- Complete `ops/google-sensor-setup.md`: create a Google Cloud desktop OAuth client, add its client ID and secret to `.env.sensors.local`, then run `npm run sensors:oauth`.
- Run `npm run sensors:refresh` once after authorization and verify Search Console and GA4 CSV rows.
- Update the daily heartbeat prompt to run `npm run sensors:refresh` before browser fallback after the first successful authenticated refresh.

## 2026-06-01 11:04 CST - Daily 100-Click Growth Loop

### Inputs
- User instruction: Automated daily WC26 Chances growth loop for the first 100 organic clicks; run `npm run sensors:refresh` before browser fallback, inspect Search Console and GA4, safely iterate, and append company memory.
- OAuth readiness: The one-time Google OAuth bootstrap completed after adding `selbyxiao@gmail.com` as an OAuth test user. `.env.sensors.local` contains the client ID, client secret, and refresh token locally; the ignored file was not committed.
- Terminal network: Direct Node fetch and curl access to `oauth2.googleapis.com:443` timed out, while Chrome worked through the macOS system proxy. The Google API helper now falls back to curl and automatically discovers the active macOS HTTPS proxy.
- Search Console API: `npm run sensors:refresh` wrote 8 query/page rows. The latest local source-of-truth window contains 0 clicks, 39 impressions, 0.0% CTR, and weighted average position 88.6.
- Search Console top page: All 39 impressions belong to `https://www.wc26chances.com/market/will-argentina-win-the-2026-fifa-world-cup`, which live production redirects with 301 to `/teams/argentina`.
- Search Console top queries: Visible API rows are all Argentina odds variants, led by `argentina to win world cup odds` (8 impressions), `argentina world cup winner odds` (7 impressions), and `odds on argentina to win world cup 2026` (7 impressions).
- Search Console sitemap API: `https://www.wc26chances.com/sitemap.xml` is not pending, has 0 errors and 0 warnings, was last downloaded on 2026-05-31T22:07:55.446Z, and reports 52 submitted web pages with 0 indexed pages.
- Analytics API: GA4 pull wrote 4 page rows with 4 pageviews and 2 tracked commercial clicks. The visible pages are `/`, `/scenarios`, `/teams/argentina`, and `/teams/mexico`. Revenue is not available.
- Browser fallback: Chrome automation returned `cgWindowNotFound`, so URL Inspection and the live Pages indexing report could not be inspected or changed during this heartbeat.
- Site health: Production returned 200 for the homepage, sitemap, and `/world-cup-2026-schedule-by-team`; the retired Argentina market URL returned 301 to `/teams/argentina`. The live sitemap contains 52 URLs.

### Observations
- The Google API sensor loop is now closed: daily refresh can retrieve Search Console and GA4 rows without browser inspection or manual CSV export.
- The sprint remains at 0 / 100 organic clicks. Search impressions increased from the prior live browser total of 20 to 39 in the API source-of-truth window, but no current URL has earned an impression yet.
- Indexing is the largest bottleneck. The sitemap is healthy but reports 0 indexed pages, and Google's only visible search surface is still the retired Argentina odds URL.
- The live redirect is correct. Shipping duplicate odds content or another broad page today would create more crawl targets before Google has processed the existing sitemap.
- GA4 page and CTA events are measurable through the API. The current 2 commercial clicks are useful instrumentation proof but are too early to treat as organic conversion evidence.

### Decision
- Do not ship a new content page today. Preserve the redirect and current experiment window while Google recrawls the sitemap.
- Improve the unattended sensor path and generated snapshot so future loops automatically report weighted average position, top queries, and top pages.
- Record the Argentina retired-URL recrawl issue as an active SEO opportunity.

### Actions Taken
- Ran `npm run sensors:refresh`, producing local ignored Search Console and GA4 CSV inputs and regenerating the sensor snapshot.
- Added curl proxy fallback with automatic macOS HTTPS proxy discovery to `scripts/google-api-common.mjs`.
- Added average organic position, top-query tables, and top-page tables to `scripts/seo-sensors.mjs`.
- Queried the Search Console sitemap API and verified 52 submitted pages, 0 indexed pages, 0 errors, and 0 warnings.
- Verified production HTTP status for homepage, sitemap, schedule-by-team hub, and retired Argentina market redirect.
- Updated `ops/google-sensor-setup.md`, `ops/seo-opportunity-log.md`, and `ops/experiments.md`.
- Attempted authenticated browser fallback for URL Inspection, but Chrome automation returned `cgWindowNotFound`.

### Files Changed
- `scripts/google-api-common.mjs`
- `scripts/seo-sensors.mjs`
- `ops/google-sensor-setup.md`
- `ops/seo-opportunity-log.md`
- `ops/experiments.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed and wrote 8 Search Console rows, 4 GA4 rows, and `ops/weekly-reports/seo-sensor-snapshot.md`.
- `node --check scripts/google-api-common.mjs` passed before the authenticated refresh.
- `npm run lint` passed.
- Production HTTP and sitemap checks passed.
- No application page code changed, so `npm run build` was not rerun.

### Expected Impact
- Daily loops now have a reliable unattended measurement path even when browser automation is unavailable.
- Automatic top-query, top-page, and average-position reporting should reduce manual interpretation and keep iteration decisions grounded in current data.
- Waiting for recrawl avoids adding more crawl competition while the sitemap still reports 0 indexed pages.

### Follow-Up
- Recheck sitemap indexed count and whether `/teams/argentina` replaces the retired `/market/...` URL in Search Console.
- Use URL Inspection browser fallback to request indexing for the homepage and `/teams/argentina` when Chrome automation becomes readable.
- Continue monitoring whether `/world-cup-2026-schedule-by-team` begins earning impressions within the 2-to-7-day recrawl window.
- Treat CTA clicks as instrumentation validation until organic traffic is distinguishable from operator testing.

## 2026-06-01 15:34 CST - Manual URL Inspection Recovery

### Inputs
- User instruction: verify whether browser automation recovered and continue the prioritized URL indexing requests.
- Chrome automation: readable and interactive again.
- Search Console Overview: 5 indexed pages and 51 not indexed pages in the live UI.

### Observations
- The live Search Console UI provides a fresher indexing view than the sitemap API snapshot, which reported 0 indexed pages.
- The www homepage is not indexed because Google currently selects `https://wc26chances.com/` as canonical even though the page declares `https://www.wc26chances.com/`.
- Production HTTP checks show that non-www homepage and `/teams/argentina` requests already redirect to their www counterparts with HTTP 307; www pages return 200.
- `/teams/argentina` is present in `https://www.wc26chances.com/sitemap.xml` and has been discovered by Google, but had not yet been crawled.

### Decision
- Request fresh crawls for the homepage and `/teams/argentina`.
- Do not repeat the schedule-by-team hub request because it was already queued on 2026-05-31 and repeated submissions do not increase priority.
- Monitor canonical consolidation before changing domain-layer redirect behavior.

### Actions Taken
- Submitted `https://www.wc26chances.com/` to the Search Console priority crawl queue.
- Submitted `https://www.wc26chances.com/teams/argentina` to the Search Console priority crawl queue.
- Recorded homepage canonical consolidation as an active SEO opportunity.

### Files Changed
- `ops/company-memory.md`
- `ops/seo-opportunity-log.md`

### Quality Gates
- Search Console confirmed `Indexing requested` for both submitted URLs.
- Production HTTP checks confirmed non-www redirects to www and www pages return 200.

### Expected Impact
- Google should recrawl the two highest-priority surfaces and reconsider the stale homepage canonical selection.
- Argentina impressions should gradually migrate from the retired `/market/...` URL to `/teams/argentina`.

### Follow-Up
- Recheck homepage canonical selection, indexed-page count, and Argentina crawl state in the next daily loop.
- If Google still selects non-www after recrawl processing, evaluate a permanent domain-layer redirect.

## 2026-06-01 15:58 CST - Chances Positioning Pass

### Inputs
- User instruction: identify actionable follow-up work and evaluate whether the WC26 Chances domain should emphasize chances more strongly.
- Existing product: team pages already contain a planning-model group forecast and route probability tree, but the homepage and team-page hero copy lead with schedules.
- Search signal: the first visible Search Console impressions are Argentina odds variants.

### Observations
- The domain name and existing model support a clearer product position: chances first, schedule and route details second.
- The dedicated schedule-by-team hub can continue serving schedule intent, so the homepage does not need to compete with it for the same job.
- Existing model disclaimers are important because the probabilities are planning guidance, not official forecasts or betting-market prices.

### Decision
- Reposition the homepage around World Cup 2026 chances by team.
- Surface the existing modelled advance chance on popular-team cards and in each team-page hero.
- Keep explicit planning-model disclaimers and preserve confirmed schedule facts.

### Actions Taken
- Updated homepage metadata, hero copy, popular-team cards, and team-directory copy.
- Updated team-page metadata and hero copy to lead with modelled advance chance.
- Added `EXP-005` and recorded the SEO opportunity.

### Files Changed
- `app/page.tsx`
- `app/teams/[slug]/page.tsx`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed, generating 57 static/SSG routes.
- Local browser visual checks passed for the desktop homepage, desktop Argentina page, mobile homepage, and mobile Argentina page.

### Expected Impact
- WC26 Chances should present a more coherent reason to exist than a generic schedule site.
- Team pages should better match emerging odds/chance search intent without presenting the planning model as official odds.

### Follow-Up
- Monitor whether chance/odds impressions begin migrating from the retired Argentina market URL to `/teams/argentina`.
- Revisit title and copy variants only after the current recrawl has had time to process.
- Retry pushing the local chances-positioning commit when the GitHub network path recovers; the first push failed with an HTTP/2 framing error and subsequent HTTP/1.1 retries stalled.

### Deployment Resolution
- The terminal did not inherit the active macOS HTTPS proxy at `127.0.0.1:8118`.
- Retried GitHub push with explicit `HTTPS_PROXY` and `HTTP_PROXY`, then verified the production homepage contains `World Cup 2026 chances, mapped by team` and `Popular team chances`.

## 2026-06-02 10:02 CST - Daily 100-Click Growth Loop

### Inputs
- Automated daily growth loop for the first 100 organic clicks.
- `npm run sensors:refresh` completed successfully and regenerated the Search Console and GA4 snapshot.
- Authenticated Search Console browser inspection was available as a live indexing fallback.

### Observations
- Sprint progress remains 0 / 100 organic clicks.
- Search Console API reports 52 impressions, 0 clicks, 0.0% CTR, and weighted average position 87.5. Impressions increased from 39 to 52 since the prior daily run.
- The visible queries remain odds intent. Argentina odds variants account for 47 impressions; Japan odds variants now account for 5 impressions.
- Search impressions still belong to retired `/market/...` URLs. Production verifies that Argentina and Japan retired URLs both return 301 redirects to their `/teams/...` replacements.
- GA4 API access is working. It reports 4 page rows, 4 pageviews, and 2 tracked commercial clicks. Revenue is unavailable. Current CTA activity remains too early to treat as organic conversion evidence.
- Live Search Console Overview reports 5 indexed pages and 51 not indexed pages. The production sitemap returns 200 and contains 52 URLs.
- Production homepage, sitemap, `/teams/argentina`, and `/world-cup-2026-schedule-by-team` return 200. The non-www homepage still redirects to www with HTTP 307.
- User feedback identified an avoidable product ambiguity: `modelled chance to advance` can be read as tournament-winning probability rather than group-stage progression.

### Decision
- Keep indexing and retired-URL recrawl as the primary bottleneck. Do not create additional crawl targets today.
- Ship a narrow copy clarification: state that the displayed model percentage is the chance to reach the knockout stage.
- Continue monitoring whether impressions migrate from retired market URLs to team pages after Google processes the redirects and recent crawl requests.

### Actions Taken
- Ran `npm run sensors:refresh`, producing 11 Search Console rows and 4 GA4 rows.
- Verified live Search Console indexed-page count through authenticated Chrome inspection.
- Verified production HTTP behavior and the 52-URL sitemap.
- Replaced ambiguous `advance` labels with explicit knockout-stage language on the homepage and team pages.
- Added the clarification to `ops/seo-opportunity-log.md`.

### Files Changed
- `app/page.tsx`
- `app/teams/[slug]/page.tsx`
- `ops/seo-opportunity-log.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed, generating 57 static/SSG routes.

### Expected Impact
- Users should understand that the headline model percentage is a group-stage progression estimate, not a title-winning probability.
- Avoiding new URLs keeps crawl attention on the existing team pages while Google processes redirects.

### Follow-Up
- Recheck indexed-page count, homepage canonical selection, and whether Argentina/Japan impressions migrate to `/teams/...`.
- If Google still prefers non-www after recrawl processing, evaluate replacing the temporary 307 domain redirect with a permanent 301 or 308.
- Treat the next meaningful SEO action as an indexing decision unless query/page data shows a stronger opportunity.

## 2026-06-02 10:24 CST - Chances Hub Crawl Promotion

### Inputs
- User instruction: do not only wait for recrawl; find concrete ways to promote impressions.
- Current Search Console signal: 52 impressions, concentrated in retired Argentina and Japan odds URLs, with 5 indexed pages and 51 not indexed pages in the live UI.
- Existing product: homepage and team pages now emphasize knockout-stage chances, but there was no dedicated chances comparison index.

### Observations
- A single focused comparison hub can strengthen topical clarity and give Google a crawl path to every team page without producing a batch of thin pages.
- The existing model already provides the data needed for all 48 teams.
- Google Search Central documents permanent redirects as strong canonical signals; the apex domain still uses a temporary HTTP 307 redirect to www and remains a separate external follow-up.

### Decision
- Add one high-value `/world-cup-2026-chances-by-team` index page.
- Link it prominently from the homepage, team pages, schedule hub, and routes hub.
- Include the page in the sitemap and submit it for indexing after deployment.

### Actions Taken
- Added a chances-by-team comparison hub with modelled knockout-stage probabilities, group breakdowns, model disclaimers, and FAQ schema.
- Added major-hub internal links and updated site-level metadata to reflect the chances-first product position.
- Added sitemap inclusion with daily change frequency and high priority.
- Added `EXP-006` and recorded the SEO opportunity.

### Files Changed
- `app/world-cup-2026-chances-by-team/page.tsx`
- `app/sitemap.ts`
- `app/page.tsx`
- `app/teams/[slug]/page.tsx`
- `app/world-cup-2026-schedule-by-team/page.tsx`
- `app/scenarios/page.tsx`
- `app/layout.tsx`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed, generating 58 static/SSG routes.
- Local browser visual checks passed for desktop and mobile chances-hub layouts.

### Expected Impact
- Google receives a clearer chances-by-team topic cluster and a direct internal crawl path to all team pages.
- The new hub can compete for broad World Cup 2026 chances queries while retired odds URLs continue consolidating into team pages.

### Follow-Up
- Deploy, verify the hub and 53-URL sitemap, then request hub indexing in Search Console.
- Continue monitoring whether retired odds URL impressions migrate to `/teams/...`.
- Evaluate changing the domain-layer apex redirect from temporary 307 to permanent 301 or 308.

## 2026-06-02 10:37 CST - Chances Hub Priority Crawl Request

### Inputs
- Production verification: `/world-cup-2026-chances-by-team` is live and the sitemap contains 53 URLs.
- Search Console URL Inspection initially reported `URL is not on Google` and `URL is unknown to Google`.

### Decision
- Request indexing for the new chances hub immediately after deployment.

### Actions Taken
- Submitted `https://www.wc26chances.com/world-cup-2026-chances-by-team` through Search Console URL Inspection.
- Search Console confirmed `Indexing requested`: the URL was added to a priority crawl queue.

### Quality Gates
- Production hub responded successfully.
- Production sitemap contains the new hub.
- Search Console live indexing request passed.

### Expected Impact
- Google has an explicit priority-crawl request for the new chances hub in addition to sitemap discovery and internal links.

### Follow-Up
- Check crawl, index, impressions, and query data in the daily growth loop.
- Avoid repeat submissions unless the page changes materially; Search Console states repeated submissions do not increase priority.

## 2026-06-02 10:55 CST - Community Promotion Scan

### Inputs
- User instruction: look for suitable Reddit, football, and travel communities for manual promotion.
- Current product fit: the site helps fans understand confirmed schedules, host cities, and possible knockout routes by team.

### Observations
- Reddit `r/WorldCup2026Tickets` contains recent, directly relevant questions about booking trips around uncertain knockout-stage routes.
- The best initial distribution motion is a small number of tailored, disclosed replies to existing planning questions.
- Generic self-promotional posting in broad communities is higher-risk and less useful.

### Decision
- Create a human-reviewed community promotion backlog.
- Prioritize one directly relevant `r/WorldCup2026Tickets` reply, then assess engagement before considering a second reply, standalone post, or broader communities.

### Actions Taken
- Added `ops/community-promotion-log.md` with candidate threads, community guidance, safety constraints, and measurement expectations.

### Quality Gates
- No external content was posted.
- Candidate comments require human review and publication.

### Expected Impact
- Early referral visitors can validate whether the chances and route pages solve a real planning problem while organic indexing develops.

### Follow-Up
- Draft a tailored reply for the highest-priority Reddit thread.
- Publish only after account-owner review and record referral outcomes in GA4.

## 2026-06-03 10:56 CST - Daily 100-Click Growth Loop

### Inputs
- Automated daily growth loop for the first 100 organic clicks.
- `npm run sensors:refresh` completed successfully.
- Read business goals, loop policy, quality gates, experiments, SEO opportunity log, 100-click sprint, and recent company memory.

### Observations
- Sprint progress remains 0 / 100 organic clicks.
- Search Console API reports 62 impressions, 0 clicks, 0.0% CTR, and weighted average position 86.2.
- Impressions increased from 52 to 62 since the prior daily run, but all impressions still belong to retired `/market/...` URLs.
- Top page remains `https://www.wc26chances.com/market/will-argentina-win-the-2026-fifa-world-cup` with 57 impressions. Japan has 5 impressions.
- Production verifies both retired Argentina and Japan market URLs return HTTP 301 redirects to their `/teams/...` replacements.
- GA4 API access is working. It reports 9 page rows, 15 pageviews/sessions, and 2 tracked commercial or route-alert clicks.
- The new chances hub appears in GA4 with 1 session and 0 pageviews in the page report, but has no Search Console impressions yet.
- Production sitemap returns 200 and contains 53 URLs. Robots allows crawling and points to the www sitemap.
- The apex domain still redirects to the www domain with HTTP 307, which remains the main domain-layer canonical weakness.
- Authenticated browser coverage inspection was unavailable in this run because the Chrome automation layer could not attach to a visible Chrome window.

### Decision
- Do not ship another content or metadata change today. The current bottleneck is Google recrawl/indexing, not missing on-page copy.
- Preserve the existing 301 redirects and give Google time to migrate old market impressions to team pages.
- Update the daily automation prompt so future runs also read `ops/community-promotion-log.md` and can track human-reviewed promotion opportunities.

### Actions Taken
- Ran `npm run sensors:refresh`, producing 11 Search Console rows and 9 GA4 page rows.
- Verified production retired-URL redirects, robots, and 53-URL sitemap.
- Updated the `wc26-chances-daily-growth-loop` heartbeat prompt to include community-promotion monitoring while explicitly prohibiting automatic external posting.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`.

### Files Changed
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed before recording this memory entry.
- Production redirect checks passed for retired Argentina and Japan market URLs.
- Production sitemap check passed with 53 URLs.
- No site code changed, so `npm run lint` and `npm run build` were not rerun.

### Expected Impact
- The loop preserves a clean experiment window while Google processes redirects, sitemap discovery, and the manual indexing request for the chances hub.
- Tomorrow's automation will include the community promotion backlog as a monitored growth channel without risking automated Reddit posting.

### Follow-Up
- Recheck whether impressions migrate from retired market URLs to `/teams/argentina`, `/teams/japan`, or `/world-cup-2026-chances-by-team`.
- Recheck indexed-page count through authenticated browser inspection when Chrome automation is available.
- If the apex 307 remains after another recrawl window, fix it at the Vercel/domain layer to use a permanent redirect to `https://www.wc26chances.com/`.

## 2026-06-05 10:04 CST - Daily 100-Click Growth Loop

### Inputs
- Automated daily growth loop for the first 100 organic clicks.
- `npm run sensors:refresh` completed successfully.
- Read business goals, loop policy, quality gates, experiments, SEO opportunity log, community promotion log, 100-click sprint, and recent company memory.

### Observations
- Sprint progress remains 0 / 100 organic clicks.
- Search Console API reports 80 impressions, 0 clicks, 0.0% CTR, and weighted average position 77.9.
- Impressions increased from 62 to 80 since the prior recorded daily run.
- Retired market URLs still hold nearly all impressions: Argentina has 66 impressions and Japan has 12 impressions.
- A new non-retired signal appeared: `/teams/panama` received 2 impressions for `panama world cup schedule` and `panama world cup games`, at average positions 47 and 61.
- One Japan query is an AI-agent style market prompt with 6 impressions and average position 7.7. It is not a normal fan search query and should not drive copy changes.
- GA4 API access is working. It reports 9 page rows, 15 pageviews/sessions, and 2 tracked commercial or route-alert clicks.
- Production verifies retired Argentina and Japan market URLs return HTTP 301 redirects to `/teams/argentina` and `/teams/japan`.
- Production `/teams/panama` returns HTTP 200, the sitemap returns 53 URLs and includes Panama, the schedule hub, and the chances hub, and robots allows crawling.
- The apex domain still redirects to the www domain with HTTP 307.
- Authenticated browser indexing inspection was not used in this run; API sensors succeeded, and terminal production checks covered sitemap, robots, and redirects.

### Decision
- Do not ship site code today. The biggest bottleneck remains crawl/index migration from retired market URLs, not missing on-page content.
- Record Panama schedule intent as a watched SEO opportunity, but wait for repeat impressions before modifying the Panama page or adding special internal-link treatment.
- Keep community promotion human-reviewed; no external posts were made automatically.

### Actions Taken
- Ran `npm run sensors:refresh`, producing 16 Search Console rows and 9 GA4 page rows.
- Verified production retired-URL redirects, Panama page availability, robots, and 53-URL sitemap.
- Added a Panama schedule-intent watchlist row to `ops/seo-opportunity-log.md`.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`.

### Files Changed
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- Production redirect checks passed for retired Argentina and Japan market URLs.
- Production Panama page check passed with HTTP 200.
- Production sitemap check passed with 53 URLs and expected URLs present.
- No site code changed, so `npm run lint` and `npm run build` were not rerun.

### Expected Impact
- Preserves the current recrawl experiment while capturing the first useful schedule-query signal on a live team page.
- Avoids overfitting to 2 Panama impressions or to an AI-agent style Japan market prompt.

### Follow-Up
- Recheck whether `/teams/panama` receives repeat schedule impressions.
- Recheck whether impressions migrate from retired market URLs to `/teams/argentina`, `/teams/japan`, or `/world-cup-2026-chances-by-team`.
- Fix the apex 307 at the Vercel/domain layer if canonical ambiguity persists.

## 2026-06-05 10:13 CST - Redirect Canonical Audit

### Inputs
- User asked why migration is taking so long and whether something is wrong.
- Current Search Console signal: retired `/market/...` URLs still hold most impressions.
- Production checks were run against old market URLs, team pages, sitemap, robots, and apex-domain variants.

### Observations
- `https://www.wc26chances.com/market/will-argentina-win-the-2026-fifa-world-cup` returns HTTP 301 to `/teams/argentina`, then HTTP 200.
- `https://www.wc26chances.com/market/will-japan-win-the-2026-fifa-world-cup` returns HTTP 301 to `/teams/japan`.
- `/teams/argentina`, `/teams/japan`, and `/teams/panama` have self-canonical tags on the www domain.
- `robots.txt` allows crawling and points to the www sitemap. The sitemap contains 53 URLs and includes the relevant team and hub pages.
- `https://wc26chances.com/...` still returns HTTP 307 to the www host before app-level redirects run. This is a weaker temporary redirect signal and is the main canonical risk found.

### Decision
- Add explicit Vercel permanent host redirects in repo config so the intended canonical rule is versioned with the app.
- Do not change page copy or duplicate old market pages; the app-level old market redirects are correct.

### Actions Taken
- Added `vercel.json` rules:
  - apex old market URL -> corresponding www team URL with HTTP 308.
  - all other apex paths -> matching www path with HTTP 308.
- Added this canonical issue to `ops/seo-opportunity-log.md`.

### Files Changed
- `vercel.json`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed, generating 58 static/SSG routes.

### Expected Impact
- Strengthens canonical consolidation from apex to www and reduces ambiguity while Google processes old URL redirects.
- If Vercel's domain-level redirect takes precedence, the repo config still documents the desired permanent behavior and the next fix is in Vercel domain settings.

### Follow-Up
- Production verification after deploy still returns HTTP 307 for `https://wc26chances.com/`, so Vercel's domain-level redirect appears to take precedence over repo-level host redirects.
- Change the primary-domain or redirect setting in the Vercel dashboard/domain layer so apex to www uses a permanent redirect.

### Dashboard Resolution
- Used the Vercel project Domains UI to change `wc26chances.com` from `307 Temporary Redirect` to `308 Permanent Redirect` targeting `www.wc26chances.com`.
- Verified production `https://wc26chances.com/` now returns HTTP 308 to `https://www.wc26chances.com/`.
- Verified the apex old-market chain is now `308` apex -> www old-market URL, then app-level `301` -> `/teams/argentina`, then HTTP 200.

## 2026-06-05 10:53 CST - Tournament-Aligned Growth Milestones

### Inputs
- User asked to match the 100-click path with the World Cup schedule and back-solve milestones.
- Current baseline: 0 clicks, 80 impressions, average position 77.9, and recent apex canonical fix from 307 to 308.
- Local schedule data covers group stage from June 11 to June 27, Round of 32 from June 28 to July 3, Round of 16 from July 4 to July 7, quarterfinals from July 9 to July 11, semifinals July 14-15, third place July 18, and final July 19.

### Observations
- Search demand will not be linear. It should spike around opening matches, major-team match days, final group matches, and knockout-route certainty.
- The original June 10 100-click milestone is now a stretch target because current rankings are too low and most impressions remain on retired market URLs.

### Decision
- Add a tournament-calendar milestone plan and treat June 27 to July 3 as the base-case window for the first 100 Google organic clicks.

### Actions Taken
- Added `ops/world-cup-growth-milestones.md`.
- Linked the 100-click sprint to the new tournament-calendar milestone plan.

### Files Changed
- `ops/world-cup-growth-milestones.md`
- `ops/100-click-sprint.md`
- `ops/company-memory.md`

### Quality Gates
- Planning/documentation-only change.
- No production code changed.

### Expected Impact
- Daily growth loop can judge progress against tournament demand windows instead of a stale pre-kickoff linear target.

### Follow-Up
- Use the June 10, June 15, June 23, June 27, and July 3 checkpoints in future daily reports.
- If clicks are still 0 by June 23, shift effort from page edits to indexing diagnostics and human-reviewed distribution.

## 2026-06-05 11:09 CST - Community Validation and Commercial CTA Execution

### Inputs
- User reported the first Reddit comment was published on the same day it was drafted, but it has not received replies.
- Current GA4 signal: 2 commercial or route-alert clicks, too little to evaluate revenue intent.
- Existing team-page CTAs were generic ticket and route-alert cards placed below the route odds section.

### Observations
- Lack of Reddit replies does not invalidate the channel; the measurable signal should be referral sessions, page engagement, and CTA clicks.
- Team pages are the highest-intent commercial surface because they already contain confirmed cities, match dates, route uncertainty, and a clear fan identity.
- Current team CTAs do not expose hotel intent and do not track CTA-panel views, so click-through rate cannot be calculated cleanly.

### Decision
- Use team pages as the first commercial validation surface.
- Replace generic team CTAs with a specific three-action planning panel: tickets, hotels, and route alerts.
- Keep all ticket and hotel language neutral and avoid unsupported availability or affiliate claims.

### Actions Taken
- Added `PlanningActionPanel`, which tracks `planning_action_panel_view`, `ticket_planning_click`, `hotel_planning_click`, and `route_alert_click`.
- Replaced team-page ticket/alert cards with the new planning panel.
- Prefilled route-alert emails with the team and confirmed cities.
- Updated `EXP-007`, `ops/seo-opportunity-log.md`, and the community promotion log.

### Files Changed
- `app/components/PlanningActionPanel.tsx`
- `app/teams/[slug]/page.tsx`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/community-promotion-log.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed, generating 58 static/SSG routes.

### Expected Impact
- Community or search visitors landing on team pages now see a concrete planning next step instead of a generic CTA.
- GA4 can measure panel views and split commercial intent into ticket, hotel, and route-alert actions.

### Follow-Up
- In the next sensor run, compare `planning_action_panel_view` against ticket, hotel, and alert clicks.
- If Reddit still has no referral traffic, test a second highly relevant community reply instead of reposting the same link.

## 2026-06-06 10:06 CST - Daily 100-Click Growth Loop

### Inputs
- Automated daily growth loop for the first 100 organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, 100-click sprint, tournament milestones, and recent company memory.
- `npm run sensors:refresh` completed successfully.

### Observations
- Sprint progress remains 0 / 100 organic clicks.
- Search Console API reports 80 impressions, 0 clicks, 0.0% CTR, and weighted average position 77.9.
- Search data is unchanged from the prior run: retired Argentina and Japan market URLs still hold 78 of 80 impressions; `/teams/panama` still has 2 impressions.
- GA4 page rows are unchanged at 9 rows, 15 pageviews/sessions, and 2 commercial or route-alert clicks.
- The new team-page planning action panel has 0 recorded views so far. The existing commercial events are homepage-only: 1 `route_alert_click` and 1 `ticket_planning_click`.
- Production canonical checks still pass: apex returns HTTP 308 to www, old apex market URL chains through 308 -> 301 -> team page 200, and sitemap contains 53 URLs.

### Decision
- Do not ship more page copy or CTA changes today. There is no fresh traffic movement to optimize against.
- Fix the sensor gap instead: the loop needs event-level GA4 data to distinguish "panel not seen" from "panel seen but not clicked".

### Actions Taken
- Extended `scripts/pull-google-sensors.mjs` to pull `planning_action_panel_view` alongside ticket, hotel, and route-alert click events.
- Added `ops/sensor-inputs/analytics-events.csv`.
- Extended `scripts/seo-sensors.mjs` to report planning panel views and a commercial event summary by page.
- Updated `ops/sensor-inputs/README.md`.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`.

### Files Changed
- `scripts/pull-google-sensors.mjs`
- `scripts/seo-sensors.mjs`
- `ops/sensor-inputs/README.md`
- `ops/sensor-inputs/analytics-events.csv`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `git diff --check` passed.
- `npm run sensors:refresh` passed and produced Search Console, analytics page, and analytics event CSVs.
- `npm run lint` passed.
- No app code changed, so `npm run build` was not rerun.

### Expected Impact
- Future runs can measure the team-page commercial panel funnel: panel views, ticket clicks, hotel clicks, and route-alert clicks.
- The current bottleneck is still acquisition/discovery, not CTA conversion.

### Follow-Up
- If `planning_action_panel_view` remains 0 after 72 hours, prioritize distribution to team pages instead of changing CTA wording.
- If Search Console remains unchanged through June 10, use the tournament milestone plan's indexing-phase decision rule and continue community discovery.

## 2026-06-10 21:20 CST - Match and City Landing Page Expansion

### Inputs
- User asked to continue the WC26 Chances growth loop after the prior diagnosis that the real bottleneck is acquisition entry pages.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, 100-click sprint, tournament growth milestones, and recent company memory.
- Ran `npm run sensors:refresh` first, as required by the daily loop.

### Observations
- `npm run sensors:refresh` failed before Search Console or GA4 data could refresh. The failure happened during Google OAuth token refresh; the actionable Google error is `invalid_grant` / `Token has been expired or revoked`.
- Fallback `npm run sensors:seo` regenerated the snapshot from existing local CSV inputs, so the displayed metrics are stale but still the latest available local source: 0 / 100 organic clicks, 80 impressions, 0.0% CTR, average position 77.9, 15 analytics pageviews/sessions, 0 planning action panel views, and 2 commercial or route-alert clicks.
- The stale Search Console sample still shows most impressions on retired `/market/...` URLs, with only 2 impressions on a live team page (`/teams/panama`).
- Given the tournament starts immediately, waiting for broad hub pages to migrate is too slow. More specific entry pages now matter: exact matchups and host-city travel pages.

### Decision
- Shift today's action from passive indexing wait to high-intent acquisition entry expansion.
- Add static pages for confirmed group-stage matchups and host-city detail pages, then connect them through internal links and sitemap.
- Improve sensor error diagnostics so the next Google token refresh failure exposes the actionable Google response body instead of only `curl 400`.

### Actions Taken
- Added schedule helpers for city slugs, city lookup, group-stage match slugs, and group-stage match lookup.
- Added `/matches` as a group-stage match index.
- Added 72 static `/matches/[slug]` pages for confirmed group-stage matchups.
- Added 16 static `/cities/[slug]` host-city detail pages.
- Linked new match pages from team pages and city cards.
- Linked new city detail pages from the homepage city highlights and city index.
- Added `Matches` navigation links across major hubs.
- Added match and city detail URLs to `sitemap.xml`.
- Updated `EXP-008` and added SEO opportunity rows for exact matchup intent, host-city travel intent, and sensor OAuth diagnostics.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md` from fallback local CSV data.
- Tightened Google API fallback errors so future token-refresh failures do not print local OAuth request parameters into terminal output.

### Files Changed
- `lib/schedule.ts`
- `app/matches/page.tsx`
- `app/matches/[slug]/page.tsx`
- `app/cities/[slug]/page.tsx`
- `app/page.tsx`
- `app/cities/page.tsx`
- `app/teams/[slug]/page.tsx`
- `app/world-cup-2026-schedule-by-team/page.tsx`
- `app/world-cup-2026-chances-by-team/page.tsx`
- `app/scenarios/page.tsx`
- `app/sitemap.ts`
- `scripts/google-api-common.mjs`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` failed during OAuth token refresh, so fresh Search Console and GA4 data are blocked until OAuth is refreshed.
- `npm run sensors:seo` passed using existing local CSV inputs.
- `npm run lint` passed.
- `npm run build` passed and generated 147 static pages.
- Browser verification passed for `/matches`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, and `/cities/dallas`.
- Local sitemap check passed with 142 URLs and includes the Argentina match page plus Dallas city page.
- `git diff --check` passed.

### Expected Impact
- Gives Google more precise pages for kickoff and group-stage search behavior: exact match queries, city schedule queries, hotel/trip planning queries, and team-specific match pages.
- Creates new commercial surfaces for city hotel intent and match ticket/hotel intent without making unsupported availability or pricing claims.
- Increases sitemap from 53 production URLs in the previous loop to 142 local URLs after this change.

### Follow-Up
- Resubmit or request indexing for `/matches`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, `/cities/dallas`, and `/cities/los-angeles`.
- Refresh Google OAuth by rerunning `npm run sensors:oauth` if the next `npm run sensors:refresh` exposes an `invalid_grant` or revoked-token response.
- Future daily loops should read `ops/world-cup-growth-milestones.md` alongside the core ops files because the June 10 target is now an indexing-phase checkpoint rather than a realistic 100-click deadline.

### Deployment Update
- Committed as `725761f` (`add match and city landing pages`) and pushed to `origin/main`.
- Production `/matches/argentina-vs-algeria-world-cup-2026-match-19` returned HTTP 200 after deployment.
- Production `/cities/dallas` returned HTTP 200 after deployment.
- Production `sitemap.xml` now reports 142 URLs and includes both the Argentina match page and Dallas city page.
- A post-deploy sensor retry confirmed the OAuth blocker is an expired or revoked refresh token. User action needed: rerun `npm run sensors:oauth` locally and approve the Google read-only scopes again.

## 2026-06-10 12:53 CST - OAuth Restored and Fresh Sensor Check

### Inputs
- User reran `npm run sensors:oauth` and reported the authorization completed.
- Ran `npm run sensors:refresh` to verify Search Console and GA4 API access.

### Observations
- Google API refresh is working again.
- Search Console CSV now has 23 rows, analytics page CSV has 10 rows, and analytics event CSV has 5 rows.
- 100-click sprint progress remains 0 / 100 clicks.
- Google impressions increased from 80 to 126, CTR remains 0.0%, and weighted average position is 82.4.
- Retired market URLs still hold most impressions: old Argentina market URL has 105 impressions, old Japan market URL has 12, and old Ivory Coast market URL has 2.
- Live pages are beginning to appear: `/teams/argentina` has 3 impressions and `/teams/usa` has 2 impressions.
- GA4 reports 17 pageviews/sessions and 4 planning action panel views: Argentina 2, Mexico 1, USA 1.
- Commercial or route-alert clicks remain 2, both from the homepage.
- Production old Ivory Coast market URL correctly returns HTTP 301 to `/teams/ivory-coast`, then HTTP 200.

### Decision
- Do not change page copy based on today's data. The meaningful signal is still crawl/index migration and early discovery of live pages, not CTR optimization.
- Keep the match/city landing-page expansion as the next acquisition bet and monitor whether those URLs appear in Search Console after deployment.

### Actions Taken
- Verified `npm run sensors:refresh` after OAuth restore.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md` with fresh API data.
- Verified production redirect coverage for the newly visible old Ivory Coast market URL.

### Files Changed
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed.
- Production old Ivory Coast market redirect passed: 301 to `/teams/ivory-coast`, then 200.

### Expected Impact
- Restores the daily measurement loop.
- Confirms the site is moving from only retired-market impressions toward some live team-page visibility, though clicks remain at zero.

### Follow-Up
- Watch whether `/matches`, `/matches/[slug]`, and `/cities/[slug]` enter Search Console within the next 48-72 hours.
- If clicks are still 0 while impressions exceed 300-500, prioritize title/description tests on live pages with impressions.

## 2026-06-11 10:17 CST - Daily Growth Loop and Acquisition Sensor

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, 100-click sprint, tournament milestones, and recent company memory.
- Ran `npm run sensors:refresh` with restored Google OAuth credentials.

### Observations
- Google API access is working.
- Search Console CSV has 26 rows, analytics page CSV has 18 rows, analytics event CSV has 13 rows.
- 100-click sprint progress remains 0 / 100 clicks.
- Google impressions increased from 126 to 142, CTR remains 0.0%, and weighted average position improved slightly from 82.4 to 82.0.
- The June 10 milestone range was 0-5 clicks and 200-500 impressions. Current clicks are within the indexing-phase range, but impressions are still below the 200-500 checkpoint.
- Retired market URLs still dominate Search Console: old Argentina market URL has 115 impressions and old Japan market URL has 12.
- Live team-page discovery is improving slowly: `/teams/argentina` has 9 impressions, `/teams/usa` has 2, and `/teams/panama` has 2.
- No `/matches`, `/matches/[slug]`, or `/cities/[slug]` pages appear in Search Console yet; this is expected within 24 hours of deployment.
- GA4 reports 17 pageviews/sessions, 13 planning action panel views, and 2 commercial or route-alert clicks.
- The team planning panel is now being viewed across Argentina plus several newly visited team pages, but it has not produced new ticket, hotel, or route-alert clicks.
- Production sitemap returns 142 URLs and includes `/matches` plus `/cities/dallas`.
- New acquisition source rows show early organic sessions outside Search Console clicks: `google / organic` to `/teams/argentina` and `/world-cup-2026-chances-by-team`, plus `bing / organic` sessions across multiple team pages. No Reddit/referral source is visible yet.

### Decision
- Do not change page titles, copy, redirects, or CTAs today. The data still points to crawl/index migration and discovery, not CTR or conversion copy.
- Improve the sensor layer instead by adding acquisition source reporting, so future community-promotion decisions are based on source/medium data rather than page/event rows alone.

### Actions Taken
- Added GA4 acquisition pulling to `scripts/pull-google-sensors.mjs`, writing `ops/sensor-inputs/analytics-acquisition.csv`.
- Added acquisition parsing and an "Acquisition Source Summary" section to `scripts/seo-sensors.mjs`.
- Updated `ops/sensor-inputs/README.md` and the community promotion measurement note.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`.
- Tried to view the heartbeat automation configuration; the app rendered the card, but the tool did not return editable field details, so no automation update was made.

### Files Changed
- `scripts/pull-google-sensors.mjs`
- `scripts/seo-sensors.mjs`
- `ops/sensor-inputs/README.md`
- `ops/community-promotion-log.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed and produced Search Console, analytics page, analytics event, and analytics acquisition CSVs.
- `node --check scripts/pull-google-sensors.mjs` passed.
- `node --check scripts/seo-sensors.mjs` passed.
- `git diff --check` passed.
- Production sitemap check passed with 142 URLs and expected match/city URLs present.

### Expected Impact
- Future daily loops can distinguish direct, Google organic, Bing organic, and referral/community traffic by page.
- This makes Reddit or other human-reviewed promotion testable without changing external posting policy.

### Follow-Up
- Watch for `/matches` and `/cities/[slug]` entering Search Console within 48-72 hours.
- If impressions reach 300-500 with 0 clicks, start title/meta tests on live pages with impressions.
- If acquisition rows show Reddit/referral traffic with engagement, draft one more human-reviewed community reply targeted to the specific page that received visits.
- When automation field details are accessible, update the heartbeat prompt to explicitly include `ops/world-cup-growth-milestones.md` and acquisition-source review.

## 2026-06-14 12:36 CST - Daily Growth Loop, URL Inspection Sensor, and Indexing Diagnosis

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, 100-click sprint, tournament milestones, and recent company memory.
- Ran `npm run sensors:refresh` with Google Search Console, GA4, acquisition-source, and URL Inspection API access.

### Observations
- Google API access is working.
- Search Console CSV has 29 rows, GA4 page CSV has 31 rows, GA4 event CSV has 22 rows, GA4 acquisition CSV has 39 rows, and URL Inspection CSV has 7 rows.
- 100-click sprint progress remains 0 / 100 clicks.
- Google impressions increased from 142 to 153, CTR remains 0.0%, and weighted average position improved slightly from 82.0 to 81.4.
- The June 10 milestone range was 0-5 clicks and 200-500 impressions. Current clicks are still within the indexing-phase range, but impressions remain below the 200-500 checkpoint.
- Retired market URLs still dominate Search Console: old Argentina market URL has 122 impressions and old Japan market URL has 13.
- Live team pages are present but weak: `/teams/argentina` has 12 impressions, `/teams/usa` has 2, and `/teams/panama` has 2.
- GA4 reports 24 pageviews/sessions, 34 planning action panel views, and 2 commercial or route-alert clicks.
- Bing organic sessions are now visible on team and match pages, including several `/matches/[slug]` URLs. No Reddit/referral source is visible yet.
- Production sitemap returns 142 URLs and includes `/matches`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, and `/cities/dallas`.
- URL Inspection shows `/teams/argentina`, `/teams/usa`, and `/world-cup-2026-chances-by-team` are submitted and indexed.
- URL Inspection shows `/matches/argentina-vs-algeria-world-cup-2026-match-19` and `/cities/dallas` are discovered but currently not indexed.
- URL Inspection shows the old Argentina market URL is a page with redirect and Google canonicalizes it to `/teams/argentina`.
- URL Inspection still shows the homepage canonical selected as `https://wc26chances.com/`, but production apex now returns a 308 redirect to `https://www.wc26chances.com/`, so this appears to be stale crawl state rather than a current redirect defect.

### Decision
- Do not change site copy or commercial CTAs today. The biggest bottleneck is still Google indexing and residual old-market visibility, not on-page conversion.
- Improve the sensor layer so future daily loops can distinguish no-click pages, indexed pages, discovered-but-not-indexed pages, redirects, and stale canonical issues without manual browser inspection.

### Actions Taken
- Added URL Inspection API pulling to `scripts/pull-google-sensors.mjs`, writing `ops/sensor-inputs/url-inspection.csv`.
- Added URL Inspection reporting to `scripts/seo-sensors.mjs`.
- Added a high-impression zero-click page sensor so page-level no-click bottlenecks are visible even when query-level impressions are split.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`.
- Updated EXP-008 and the SEO opportunity log with the new indexing diagnosis.
- Updated the heartbeat automation prompt to explicitly include tournament milestones, acquisition-source review, and URL Inspection status.

### Files Changed
- `scripts/pull-google-sensors.mjs`
- `scripts/seo-sensors.mjs`
- `ops/sensor-inputs/README.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed and produced Search Console, analytics page, analytics event, analytics acquisition, and URL Inspection CSVs.
- `node --check scripts/pull-google-sensors.mjs` passed.
- `node --check scripts/seo-sensors.mjs` passed.
- `git diff --check` passed before this memory entry.
- Production sitemap check passed with 142 URLs and expected match/city URLs present.
- Production apex redirect check passed: `https://wc26chances.com/` returns 308 to `https://www.wc26chances.com/`.

### Expected Impact
- Daily loops can now diagnose whether lack of clicks is caused by no indexing, low rankings, poor CTR, or weak commercial action.
- The current diagnosis is more precise: core pages are indexed, but the new match/city inventory has not crossed into Google index yet; Bing has already discovered and sent sessions to that inventory.

### Follow-Up
- Watch whether the inspected match and city URLs move from `Discovered - currently not indexed` to `Submitted and indexed`.
- If match/city pages remain discovered but not indexed for another 3-5 daily runs, increase internal links from indexed team/chances pages to a smaller set of priority match/city pages instead of expanding more inventory.
- If impressions pass 300-500 with CTR still 0.0%, run title/meta tests on the live pages that already have impressions.

## 2026-06-14 13:08 CST - Tournament-Live Recovery Page

### Inputs
- User escalation: World Cup has started and Google organic clicks are still 0.
- Ran `npm run sensors:refresh` before changing pages.
- Reviewed the latest SEO sensor snapshot, URL Inspection status, tournament milestones, 100-click sprint, community promotion log, and current homepage/match index.

### Observations
- Google API access is working.
- Search Console now has 30 rows.
- 100-click sprint progress remains 0 / 100 Google organic clicks.
- Google impressions increased only from 153 to 154, CTR remains 0.0%, and weighted average position remains 81.4.
- The only newly visible Search Console page is `/cities/san-francisco-bay-area` with 1 impression.
- Google still mostly shows retired market URLs rather than current tournament pages.
- URL Inspection still shows priority match and city pages as discovered but not indexed.
- GA4 still shows 24 pageviews/sessions, 34 planning action panel views, and 2 commercial or route-alert clicks.
- Bing organic has already reached match pages, which means the match inventory is crawlable and useful, but Google has not caught up.

### Decision
- Do not wait passively for Google. The site needs a sharper tournament-live landing page that can satisfy "games today" intent and be used for human-reviewed distribution.
- Keep the page factual and schedule-only. Do not claim live scores, live odds, or official status.

### Actions Taken
- Added `/world-cup-2026-games-today` as a dynamic page for today's scheduled games plus coming match days.
- Added internal links from the homepage hero/navigation area and `/matches` to the new today page.
- Added the new today page to `sitemap.xml`, increasing local sitemap URL count from 142 to 143.
- Added the today page and a current Japan/Netherlands match page to default URL Inspection monitoring.
- Added EXP-009 and a SEO opportunity log row for tournament-live current-slate intent.
- Added a human-reviewed community reply draft for fresh match-day/ticket/travel questions.
- Updated the 100-click sprint to reflect the missed June 10 target and the tournament-live recovery order.

### Files Changed
- `app/world-cup-2026-games-today/page.tsx`
- `lib/tournament-day.ts`
- `app/page.tsx`
- `app/matches/page.tsx`
- `app/sitemap.ts`
- `scripts/pull-google-sensors.mjs`
- `ops/100-click-sprint.md`
- `ops/community-promotion-log.md`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed before page changes.
- `npm run lint` passed.
- `npm run build` passed.
- `node --check scripts/pull-google-sensors.mjs` passed.
- `git diff --check` passed before this memory entry.
- Browser verification passed for `/world-cup-2026-games-today` on desktop and mobile viewport.
- Local sitemap check passed: 143 URLs and `world-cup-2026-games-today` present.

### Expected Impact
- Gives users and communities a direct current-slate landing page instead of sending them to a broad homepage.
- Improves internal linking toward today's matches and cities.
- Creates a monitored indexing target for the tournament-live phase.

### Follow-Up
- Production check after deploy passed: `https://www.wc26chances.com/world-cup-2026-games-today` returns 200 and contains the expected title.
- Search Console UI automation for Request Indexing was attempted after deploy, but Google Search Console navigation timed out in Chrome automation. Manual URL Inspection or a later browser retry is still needed.
- Request URL Inspection/indexing for `/world-cup-2026-games-today`.
- Use the community draft only in fresh, relevant threads where the link materially helps.
- If the today page is not indexed after several runs, keep using it for direct/community/Bing traffic while internal links concentrate on already indexed team/chances pages.

## 2026-06-16 10:32 CST - Daily Growth Loop and Today Page Discovery Fix

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, tournament milestones, 100-click sprint, and recent company memory.
- Ran `npm run sensors:refresh` with Google Search Console, GA4 page/event/acquisition, and URL Inspection API access.

### Observations
- Google API access is working.
- Search Console CSV has 30 rows, GA4 page CSV has 33 rows, GA4 event CSV has 23 rows, GA4 acquisition CSV has 43 rows, and URL Inspection CSV has 9 rows.
- 100-click sprint progress remains 0 / 100 Google clicks.
- Google impressions increased from 154 to 156, CTR remains 0.0%, and weighted average position is 81.3.
- The current result is far behind the Jun 15 milestone target of 5-20 clicks and 500-1,500 impressions.
- Retired market URLs still dominate Search Console: old Argentina market URL has 122 impressions, old Japan market URL has 14.
- Live page visibility remains weak: `/teams/argentina` has 12 impressions, `/teams/usa` has 2, `/teams/panama` has 2, and `/cities/san-francisco-bay-area` has 2.
- GA4 reports 24 pageviews/sessions, 40 planning action panel views, and 2 commercial or route-alert clicks.
- Acquisition rows show small but broad non-Google organic discovery from Bing, DuckDuckGo, Yahoo, Ecosia, and cn.bing.com, including team and match pages.
- URL Inspection shows `/world-cup-2026-games-today` is `URL is unknown to Google`.
- URL Inspection shows priority match pages and `/cities/dallas` are still discovered but not indexed.
- URL Inspection shows `/teams/argentina`, `/teams/usa`, and `/world-cup-2026-chances-by-team` remain submitted and indexed.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.
- Production today page returns 200, but before this run's fix it served `cache-control: private, no-cache, no-store`, because the page was force dynamic.

### Decision
- The main bottleneck remains discovery/indexing, not CTR or commercial conversion.
- Fix the today page's crawlability and route internal links from indexed pages before adding more new content.
- Stabilize the URL Inspection sensor so slow Google inspection responses do not stall future daily loops.

### Actions Taken
- Changed `/world-cup-2026-games-today` from `force-dynamic` to hourly revalidation, making it static with a 1-hour revalidate in the production build.
- Added prominent Today links from indexed or indexable surfaces: team pages, `/world-cup-2026-chances-by-team`, and `/world-cup-2026-schedule-by-team`.
- Added a current-slate callout on the chances hub and schedule hub.
- Added a per-URL timeout to URL Inspection pulls; timed-out inspections now write an error row instead of blocking the full refresh.
- Updated EXP-009 and the SEO opportunity log with the 2026-06-16 `URL is unknown to Google` diagnosis and internal-link/cache response fix.

### Files Changed
- `app/world-cup-2026-games-today/page.tsx`
- `app/world-cup-2026-chances-by-team/page.tsx`
- `app/world-cup-2026-schedule-by-team/page.tsx`
- `app/teams/[slug]/page.tsx`
- `scripts/pull-google-sensors.mjs`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed.
- `npm run lint` passed.
- `npm run build` passed.
- Build output confirms `/world-cup-2026-games-today` is now static with 1h revalidation.
- `node --check scripts/pull-google-sensors.mjs` passed.
- `node --check scripts/seo-sensors.mjs` passed.
- `git diff --check` passed before this memory entry.
- Production sitemap check passed with 143 URLs and the today page present.

### Expected Impact
- Gives Google more paths from already indexed pages to discover the today page.
- Removes an unnecessary no-store response from the today page, making it a cleaner crawl target.
- Keeps the daily loop from becoming brittle when URL Inspection API calls are slow.

### Follow-Up
- Post-deploy verification passed: `/world-cup-2026-games-today` now returns `cache-control: public, max-age=0, must-revalidate` and `x-vercel-cache: PRERENDER/HIT`, not `private no-store`.
- Request indexing for `/world-cup-2026-games-today` manually or retry Search Console browser automation.
- If the today page is still unknown to Google after the next daily run, add a smaller "today games" link block above the fold on `/teams/argentina`, `/teams/usa`, and `/world-cup-2026-chances-by-team`, then stop adding new pages until indexing improves.

## 2026-06-17 15:24 CST - Daily Growth Loop Blocked by Expired Google OAuth Token

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, tournament milestones, 100-click sprint, and recent company memory.
- Ran `npm run sensors:refresh`.
- Tried authenticated Chrome Search Console fallback after API refresh failed.
- Checked production `/world-cup-2026-games-today` and production sitemap.

### Observations
- Google API refresh failed before pulling new GSC/GA4 data.
- Exact API blocker: Google token refresh returned `invalid_grant` / `Token has been expired or revoked`.
- Chrome Search Console fallback also failed: the Search Console URL Inspection page timed out during Google navigation before readable page data was available.
- No fresh Search Console, GA4, acquisition, or URL Inspection data was collected today.
- Stale latest usable snapshot remains 2026-06-16: 0 / 100 Google clicks, 156 impressions, 0.0% CTR, average position 81.3, 24 pageviews/sessions, 40 planning panel views, and 2 commercial or route-alert clicks.
- Stale 2026-06-16 URL Inspection status: `/world-cup-2026-games-today` was `URL is unknown to Google`; priority match and Dallas city pages were discovered but not indexed.
- Production `/world-cup-2026-games-today` currently returns 200 with `x-nextjs-prerender: 1`, `x-vercel-cache: STALE`, and public cache headers.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.

### Decision
- Do not make SEO/content changes based on stale metrics.
- Treat today's run as blocked on measurement credentials, with site health OK.
- Improve the sensor error message so the next invalid refresh token failure gives the exact recovery command.

### Actions Taken
- Updated `scripts/google-api-common.mjs` to catch `invalid_grant` and throw a direct action message: run `npm run sensors:oauth` from the repo root, approve Search Console and Analytics read-only access, then rerun `npm run sensors:refresh`.
- Cleaned up the attempted Chrome fallback session.

### Files Changed
- `scripts/google-api-common.mjs`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` failed with `invalid_grant`; no fresh measurement was available.
- Authenticated browser fallback attempted but timed out in Google Search Console navigation.
- Production today page check passed.
- Production sitemap check passed with 143 URLs and the today page present.

### Expected Impact
- Next credential failure will be faster to diagnose and repair.
- The site remains crawlable, but the daily AI loop cannot measure progress again until OAuth is refreshed.

### Follow-Up
- Required user action: run `npm run sensors:oauth` from `/Users/selby/Documents/wc26chances.com 复活`, complete Google authorization, then run `npm run sensors:refresh`.
- After OAuth is restored, check whether `/world-cup-2026-games-today` has moved from `URL is unknown to Google` to discovered or indexed.
- If it remains unknown after fresh data, add a smaller above-the-fold "today games" link block to indexed priority pages.

## 2026-06-18 11:13 CST - Daily Growth Loop Still Blocked, Sensor Freshness Improved

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, tournament milestones, 100-click sprint, and recent company memory.
- Ran `npm run sensors:refresh`.
- Attempted authenticated browser fallback through the available desktop app state.
- Re-ran local `npm run sensors:seo` against the existing CSV inputs.
- Checked production `/world-cup-2026-games-today` and production sitemap.

### Observations
- Google API refresh is still blocked before new data is pulled.
- Exact API blocker: Google OAuth refresh token expired or was revoked; the script now reports the direct recovery command.
- Authenticated browser fallback was unavailable today because Chrome had no controllable window; desktop state returned `cgWindowNotFound`.
- No fresh Search Console, GA4, acquisition, or URL Inspection data was collected today.
- The regenerated snapshot is explicitly stale: all Google/GA input CSVs were last updated on 2026-06-16 UTC.
- Stale latest metrics remain 0 / 100 Google clicks, 156 impressions, 0.0% CTR, average position 81.3, 24 pageviews/sessions, 40 planning panel views, and 2 commercial or route-alert clicks.
- Stale 2026-06-16 URL Inspection status still has `/world-cup-2026-games-today` as `URL is unknown to Google`.
- Production `/world-cup-2026-games-today` currently returns 200 with `x-nextjs-prerender: 1`, `x-vercel-cache: STALE`, and public cache headers.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.

### Decision
- Do not change SEO copy, CTAs, or page inventory today because the measurement layer is stale.
- Make a safe sensor/reporting improvement so future stale-data situations are obvious in the generated snapshot.
- Treat the biggest current bottleneck as measurement credentials first, then Google discovery/indexing once fresh URL Inspection data is restored.

### Actions Taken
- Updated `scripts/seo-sensors.mjs` so the generated snapshot shows the filesystem update time for every CSV input.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md`; it now shows the report was generated on 2026-06-18 while all sensor inputs remain from 2026-06-16.

### Files Changed
- `scripts/seo-sensors.mjs`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` failed with the expected expired/revoked Google OAuth token message.
- Browser fallback attempted but unavailable because Chrome had no controllable window.
- `npm run sensors:seo` passed and regenerated the snapshot from existing local CSVs.
- `node --check scripts/seo-sensors.mjs` passed.
- `npm run lint` passed.
- `git diff --check` passed before this memory entry.
- Production today page check passed.
- Production sitemap check passed with 143 URLs and the today page present.

### Expected Impact
- Daily loop reports will no longer blur together a fresh report date and stale sensor inputs.
- The next operator can immediately see whether the numbers are live or merely a reprocessing of older CSVs.

### Follow-Up
- Required user action remains: run `npm run sensors:oauth` from `/Users/selby/Documents/wc26chances.com 复活`, complete Google authorization, then run `npm run sensors:refresh`.
- After OAuth is restored, inspect `/world-cup-2026-games-today`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, and `/cities/dallas` again through URL Inspection.
- If the today page is still unknown to Google with fresh data, add a compact above-the-fold today-games link block to indexed priority pages and request indexing manually.

## 2026-06-19 10:06 CST - Daily Growth Loop OAuth Blocker, Team-Page Today Discovery Link

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, tournament milestones, 100-click sprint, and recent company memory.
- Ran `npm run sensors:refresh`.
- Checked Chrome desktop state for authenticated fallback availability.
- Re-ran local `npm run sensors:seo` against the existing CSV inputs.
- Checked public search fallback for whether the today page appears in visible search results.
- Checked production `/world-cup-2026-games-today`, production sitemap, and production robots.txt.

### Observations
- Google API refresh is still blocked before new data is pulled.
- Exact API blocker: Google OAuth refresh token expired or was revoked.
- Chrome is running, but current tooling did not expose stable DOM/address-bar control for a safe Search Console fallback; the current tab is unrelated to Search Console.
- No fresh Search Console, GA4, acquisition, or URL Inspection data was collected today.
- Snapshot was regenerated on 2026-06-19, but all Google/GA input CSVs remain from 2026-06-16 UTC.
- Stale latest metrics remain 0 / 100 Google clicks, 156 impressions, 0.0% CTR, average position 81.3, 24 pageviews/sessions, 40 planning panel views, and 2 commercial or route-alert clicks.
- Stale 2026-06-16 URL Inspection status still has `/world-cup-2026-games-today` as `URL is unknown to Google`.
- Public search fallback surfaces WC26 team, city, and match pages, but did not surface `/world-cup-2026-games-today`.
- Production `/world-cup-2026-games-today` currently returns 200 with `x-nextjs-prerender: 1`, `x-vercel-cache: STALE`, and public cache headers.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.
- Production robots.txt allows crawling and points to the sitemap.

### Decision
- The biggest immediate bottleneck remains measurement credentials; the biggest SEO/product bottleneck after that is current-slate discovery/indexing.
- Do not add more pages or change probability/schedule claims without fresh data.
- Make one safe internal-discovery improvement: use all static team pages as stronger links to the current-slate page.

### Actions Taken
- Added a compact tournament-live callout to every team page below the hero, linking to `/world-cup-2026-games-today` and `/matches`.
- Updated EXP-009 with the 2026-06-19 public-search and OAuth-blocked diagnosis.
- Added a 2026-06-19 SEO opportunity row for current-slate discovery from indexed team pages.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md` so it shows the 2026-06-19 report date while keeping input freshness visible.

### Files Changed
- `app/teams/[slug]/page.tsx`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` failed with the expected expired/revoked Google OAuth token message.
- `npm run sensors:seo` passed and regenerated the snapshot from existing local CSVs.
- Production today page check passed.
- Production sitemap check passed with 143 URLs and the today page present.
- Production robots.txt check passed.
- `npm run lint` passed.
- `npm run build` passed; build generated 148 static pages and kept `/world-cup-2026-games-today` on 1h revalidation.

### Expected Impact
- Gives Google and users another strong path from team pages to the current-slate page.
- Keeps the change small and reversible while waiting for fresh URL Inspection data.
- Should help discovery without diluting the existing team schedule/chances intent.

### Follow-Up
- Required user action remains: run `npm run sensors:oauth` from `/Users/selby/Documents/wc26chances.com 复活`, complete Google authorization, then run `npm run sensors:refresh`.
- After OAuth is restored, inspect `/world-cup-2026-games-today`, `/teams/argentina`, `/teams/usa`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, and `/cities/dallas`.
- If the today page is still unknown after this team-page link pass and a manual URL Inspection request, stop adding internal links and prioritize human-reviewed distribution to fresh match-day questions.

## 2026-06-20 10:08 CST - Daily Growth Loop OAuth Blocker, Refresh Fallback Automated

### Inputs
- Automated daily WC26 Chances growth loop for the first 100 Google organic clicks.
- Read business goals, AI loop policy, quality gates, experiments, SEO opportunity log, community promotion log, tournament milestones, 100-click sprint, and recent company memory.
- Ran `npm run sensors:refresh`.
- Re-ran local sensor processing through the updated refresh runner.
- Checked production `/world-cup-2026-games-today`, sitemap, and robots.txt.
- Used public search fallback to check whether the today page or related WC26 pages appear in visible search results.

### Observations
- Google API refresh is still blocked before new data is pulled.
- Exact API blocker: Google OAuth refresh token expired or was revoked.
- No fresh Search Console, GA4, acquisition, or URL Inspection data was collected today.
- Snapshot was regenerated on 2026-06-20, but all Google/GA input CSVs remain from 2026-06-16 UTC.
- Stale latest metrics remain 0 / 100 Google clicks, 156 impressions, 0.0% CTR, average position 81.3, 24 pageviews/sessions, 40 planning panel views, and 2 commercial or route-alert clicks.
- Stale 2026-06-16 URL Inspection status still has `/world-cup-2026-games-today` as `URL is unknown to Google`.
- Public search fallback still did not surface `/world-cup-2026-games-today` directly.
- Public search fallback did surface WC26 team, city, and match pages; the USA result includes the new Games today callout text from the 2026-06-19 team-page change.
- Production `/world-cup-2026-games-today` currently returns 200 with `x-nextjs-prerender: 1`, `x-vercel-cache: STALE`, and public cache headers.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.
- Production robots.txt allows crawling and points to the sitemap.

### Decision
- Do not add more SEO page changes today. The next meaningful external blocker is OAuth restoration and manual URL Inspection/request indexing.
- Improve the sensor automation instead: `npm run sensors:refresh` should regenerate the best available snapshot even when the Google pull fails, while still exiting non-zero so the stale-data condition remains visible.

### Actions Taken
- Added `scripts/refresh-sensors.mjs`.
- Updated `package.json` so `npm run sensors:refresh` runs the new refresh runner.
- Verified the new runner fails on the expired OAuth token, then automatically regenerates `ops/weekly-reports/seo-sensor-snapshot.md` from the latest local CSVs and prints a stale-input warning.

### Files Changed
- `package.json`
- `scripts/refresh-sensors.mjs`
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` failed with the expected expired/revoked Google OAuth token message and regenerated the fallback snapshot.
- `node --check scripts/refresh-sensors.mjs` passed.
- `npm run lint` passed.
- `npm run build` passed; build generated 148 static pages and kept `/world-cup-2026-games-today` on 1h revalidation.
- `git diff --check` passed before this memory entry.
- Production today page check passed.
- Production sitemap check passed with 143 URLs and the today page present.
- Production robots.txt check passed.

### Expected Impact
- Future daily loops will always have an updated snapshot file, even during Google OAuth outages.
- The command still fails when fresh Google data is unavailable, so automation cannot silently treat stale CSVs as live metrics.
- This reduces manual recovery work without masking the credential blocker.

### Follow-Up
- Required user action remains: run `npm run sensors:oauth` from `/Users/selby/Documents/wc26chances.com 复活`, complete Google authorization, then run `npm run sensors:refresh`.
- After OAuth is restored, inspect `/world-cup-2026-games-today`, `/teams/usa`, `/teams/argentina`, `/matches/argentina-vs-algeria-world-cup-2026-match-19`, and `/cities/dallas`.
- If OAuth is not restored by the next daily loop, do not make more page changes; only monitor production health and prepare human-reviewed community responses.

## 2026-06-21 01:45 CST - OAuth Restored, Today Page Discovered Not Indexed

### Inputs
- User reported OAuth authorization was done.
- Ran `npm run sensors:refresh`.
- Reviewed the regenerated Search Console, GA4 pages, GA4 events, GA4 acquisition, and URL Inspection snapshot.
- Checked production `/world-cup-2026-games-today`, production sitemap, and production robots.txt.

### Observations
- Google API access is working again.
- Search Console CSV has 35 rows, GA4 pages has 47 rows, GA4 events has 34 rows, GA4 acquisition has 78 rows, and URL Inspection has 9 rows.
- 100-click sprint progress remains 0 / 100 Google clicks.
- Google impressions increased from 156 to 164, CTR remains 0.0%, and weighted average position improved slightly from 81.3 to 80.8.
- Analytics pageviews/sessions increased from 24 to 31.
- Planning action panel views increased from 40 to 71.
- Commercial or route-alert clicks increased from 2 to 3.
- Retired market URLs still dominate Google impressions: old Argentina market URL has 122 impressions and old Japan market URL has 16.
- Live page visibility is improving slowly: `/teams/argentina` has 14 impressions, `/cities/san-francisco-bay-area` has 5, and `/teams/usa` has 3.
- New striking-distance query appeared: `what are plausible knockout matchups for argentina in the 2026 world cup and where would they be played?` on `/teams/argentina` at position 8.0 with 1 impression.
- Bing organic is sending more qualified team traffic, especially `/teams/usa` with 7 sessions and `/teams/mexico` with 4 sessions.
- URL Inspection shows `/world-cup-2026-games-today` moved from `URL is unknown to Google` to `Discovered - currently not indexed`.
- Priority match pages and `/cities/dallas` remain discovered but not indexed.
- `/teams/argentina`, `/teams/usa`, and `/world-cup-2026-chances-by-team` remain submitted and indexed.
- Production `/world-cup-2026-games-today` returns 200 with `x-nextjs-prerender: 1`, `x-vercel-cache: HIT`, and public cache headers.
- Production sitemap returns 143 URLs and includes `/world-cup-2026-games-today`.
- Production robots.txt allows crawling and points to the sitemap.

### Decision
- Do not make more product/page changes today. The 2026-06-19 team-page internal-link change appears to have helped discovery, and additional link stacking would add noise before indexing updates.
- The biggest bottleneck is now indexing, not crawlability or analytics access.
- Next best action is manual URL Inspection/request indexing for `/world-cup-2026-games-today` and the priority discovered-not-indexed match/city pages.

### Actions Taken
- Updated EXP-009 with the restored sensor result.
- Updated the 2026-06-19 SEO opportunity result: today page is now discovered but not indexed.
- Regenerated `ops/weekly-reports/seo-sensor-snapshot.md` with fresh Google and GA4 data.

### Files Changed
- `ops/weekly-reports/seo-sensor-snapshot.md`
- `ops/experiments.md`
- `ops/seo-opportunity-log.md`
- `ops/company-memory.md`

### Quality Gates
- `npm run sensors:refresh` passed and regenerated Search Console, GA4 pages, GA4 events, GA4 acquisition, URL Inspection, and the snapshot.
- Production today page check passed.
- Production sitemap check passed with 143 URLs and the today page present.
- Production robots.txt check passed.

### Expected Impact
- Restored observability closes the biggest operational blocker.
- Logging the today page's movement from unknown to discovered gives the AI loop a clean next decision point: wait/request indexing rather than continuing to add links.
- Current commercial signal remains weak but not zero: 3 commercial or route-alert clicks against 31 pageviews/sessions.

### Follow-Up
- Manually request indexing in Google Search Console for `/world-cup-2026-games-today`.
- Also inspect/request indexing for `/matches/argentina-vs-algeria-world-cup-2026-match-19`, `/matches/netherlands-vs-japan-world-cup-2026-match-10`, and `/cities/dallas`.
- If `/teams/argentina` receives more route-query impressions, expand the route FAQ or title only after repeat impressions appear, not from a single 1-impression row.
