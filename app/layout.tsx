import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsSensors } from "./components/AnalyticsSensors";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wc26chances.com"),
  title: {
    default: "WC26 Chances | World Cup 2026 Team Cities & Routes",
    template: "%s | WC26 Chances",
  },
  description:
    "Pick a World Cup 2026 team and instantly see its confirmed match cities, stadiums, dates, and possible knockout route.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WC26 Chances | World Cup 2026 Team Cities & Routes",
    description:
      "Pick a team and instantly see its confirmed World Cup 2026 cities, stadiums, dates, and possible route.",
    url: "https://www.wc26chances.com",
    siteName: "WC26 Chances",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WC26 Chances",
  url: "https://www.wc26chances.com",
  description:
    "World Cup 2026 team schedules, host city guides, and possible knockout routes for fans planning tickets and travel.",
  publisher: {
    "@type": "Organization",
    name: "WC26 Chances",
    url: "https://www.wc26chances.com",
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', { send_page_view: false });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={null}>
          <AnalyticsSensors />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
