# WC26 Chances AI Loop

## Loop Definition

WC26 Chances is the first validation project for an AI-native, self-improving company system.

The loop is:

1. Sensors collect search, behavior, revenue, and site health data.
2. Context processing turns raw data into page opportunities and experiment records.
3. Policy limits what AI can change.
4. Tools produce code, content, reports, and checks.
5. Quality gates prevent low-quality or unsafe changes from shipping.
6. Learning updates the backlog, pages, metadata, internal links, CTAs, and policies.

## Sensors / Data

Required:

- Google Search Console query and page data.
- Web analytics pageviews and engagement.
- Outbound commercial click events.
- Core Web Vitals events from the app analytics sensor.
- Email signup events.
- Build, lint, sitemap, and link-check status.
- Revenue or affiliate dashboard exports.

Useful later:

- Search trend snapshots for teams, cities, tickets, hotels, and route queries.
- SERP screenshots for priority queries.
- Competitor page snapshots.
- User feedback or emails.

## Context Assets

The project should maintain these files:

- `ops/business-goals.md`: target, timeline, and metrics.
- `ops/company-memory.md`: append-only operating memory for loop inputs, observations, decisions, actions, checks, expected impact, and follow-up.
- `ops/seo-opportunity-log.md`: query and page opportunities.
- `ops/experiments.md`: shipped experiments and results.
- `ops/monetization-plan.md`: commercial surfaces and partners.
- `ops/quality-gates.md`: checks before release.
- `ops/weekly-reports/`: recurring review outputs.

## Policy Layer

AI may:

- Propose new pages, metadata, internal links, FAQs, and CTAs.
- Generate code changes and content drafts.
- Produce weekly SEO reports and experiment summaries.
- Add pages based on known schedule data.

AI must not:

- Invent official schedule facts, ticket availability, prices, or commercial claims.
- Publish high-impact pages without build and lint passing.
- Change high-traffic pages without recording the experiment.
- Use scraped copyrighted article text as page content.
- Hide affiliate or sponsored relationships.

## Tool Layer

Initial tools:

- Next.js static pages.
- Sitemap and robots generation.
- JSON-LD structured data.
- `app/components/AnalyticsSensors.tsx` for GA4/Plausible pageviews and Web Vitals.
- `CommercialCta` analytics events for outbound commercial clicks.
- `npm run sensors:seo` to turn Search Console and analytics exports into a weekly sensor snapshot.
- Codex for code changes, reports, and opportunity analysis.

## Quality Gates

Before release:

- `npm run lint`
- `npm run build`
- Metadata title and description are unique enough for the page intent.
- Canonical URL is correct.
- Sitemap includes new indexable pages.
- High-intent pages include a commercial or email CTA.
- Claims about schedule, teams, cities, and routes trace back to project data or a cited source.

## Learning Mechanism

The first operating milestone is the `ops/100-click-sprint.md` loop: reach 100 Google organic clicks, then scale only the page patterns that show real impressions or clicks.

Every daily, weekly, or manual loop must append an entry to `ops/company-memory.md`, even when blocked. The entry must record inputs, observations, decision, actions taken, files changed, quality gates, expected impact, and follow-up. This is the project's company memory.

Every weekly review should answer:

- Which queries have high impressions and low CTR?
- Which pages rank 8 to 20 and need content/internal-link support?
- Which teams, cities, or ticket/travel intents lack pages?
- Which pages get traffic but no commercial action?
- Which CTA placements earned clicks?
- Which AI-generated changes did not improve metrics?

The output should be a small set of concrete changes, not a broad strategy memo.
