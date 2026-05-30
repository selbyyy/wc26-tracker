# Quality Gates

## Required Before Shipping

- `npm run lint`
- `npm run build`
- Sitemap includes intended indexable pages.
- Robots allows intended indexable pages.
- Metadata is present on all new page templates.
- Canonical URLs are correct.
- CTAs do not make unsupported commercial claims.
- `ops/company-memory.md` has a dated entry explaining the inputs, observations, decision, actions, checks, expected impact, and follow-up for the loop.

## SEO Checks

- One clear H1 per page.
- Title matches the search intent.
- Description explains the page's concrete answer.
- Internal links point to related team, city, route, or commercial pages.
- Thin pages have a plan to become useful or should not be created.

## Sensor Checks

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set in production if analytics should run.
- CTA links include `data-commercial-context` and `data-commercial-event`.
- Search Console and analytics exports can be placed in `ops/sensor-inputs/` and processed with `npm run sensors:seo`.
- Weekly sensor output is reviewed before high-traffic metadata, CTA, or internal-link changes.

## Fact Checks

Schedule, city, stadium, and route claims must come from:

- `lib/schedule.ts`
- a cited official source
- a clearly labeled model or estimate

## AI Change Policy

AI-generated changes should be shipped through normal code review. For now, AI can generate patches and reports, but a human approves production release.

Every AI run must preserve company memory. If the run changes code, content, operations docs, automation prompts, or strategy, it must append or update the relevant dated entry in `ops/company-memory.md`. If the run is blocked, it must still record the blocker and the exact user action needed.
