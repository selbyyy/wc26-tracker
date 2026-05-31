# Google Sensor Setup

WC26 Chances can pull Search Console and GA4 data without opening a browser
after a one-time Google OAuth authorization.

## One-Time Google Cloud Setup

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud project for WC26 Chances.
3. Enable the [Google Search Console API](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com).
4. Enable the [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com).
5. Configure the OAuth consent screen. Use `External` if Google asks for a user
   type, then add the Google account that owns Search Console and GA4 as a test
   user.
6. Create an OAuth client ID with application type `Desktop app`.
7. Add the client ID and client secret to a local file named
   `.env.sensors.local` in the repository root:

```bash
GOOGLE_OAUTH_CLIENT_ID=replace-me
GOOGLE_OAUTH_CLIENT_SECRET=replace-me
```

The file is ignored by Git. Do not commit it.

## One-Time Local Authorization

Run:

```bash
npm run sensors:oauth
```

Chrome opens a Google authorization page. Approve read-only access for Search
Console and Analytics. The script writes `GOOGLE_OAUTH_REFRESH_TOKEN` into
`.env.sensors.local`.

## Daily Refresh

Run:

```bash
npm run sensors:refresh
```

The command:

1. Pulls final Search Console query/page data for the latest available period.
2. Pulls GA4 pageviews, sessions, engagement rate, and tracked CTA events.
3. Writes local CSV inputs under `ops/sensor-inputs/`.
4. Generates `ops/weekly-reports/seo-sensor-snapshot.md`.

## Configuration

Defaults are already set for WC26 Chances:

```bash
GSC_SITE_URL=https://www.wc26chances.com/
GA4_PROPERTY_ID=539351001
```

Add either variable to `.env.sensors.local` only if the property changes.

## Troubleshooting

- `Missing GOOGLE_OAUTH_CLIENT_ID`: create `.env.sensors.local` and add the
  OAuth desktop client credentials.
- `invalid_grant`: run `npm run sensors:oauth` again.
- Search Console permission error: authorize with the account that can open the
  `https://www.wc26chances.com/` property.
- GA4 permission error: authorize with an account that has access to property
  `539351001`.

## Official References

- [Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Google Analytics Data API quickstart](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries)
- [OAuth 2.0 for installed apps](https://developers.google.com/identity/protocols/oauth2/native-app)
