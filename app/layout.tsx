import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://wc26chances.com"),
  title: {
    default: "WC26 Chances | World Cup 2026 Prediction Market Odds",
    template: "%s | WC26 Chances",
  },
  description:
    "Track live World Cup 2026 probabilities, market moves, and prediction market odds for every major tournament outcome.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WC26 Chances | World Cup 2026 Prediction Market Odds",
    description:
      "Live World Cup 2026 probabilities, market moves, and prediction market odds.",
    url: "https://wc26chances.com",
    siteName: "WC26 Chances",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
