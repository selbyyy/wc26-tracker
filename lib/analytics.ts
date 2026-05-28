'use client';

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

function cleanProps(props: AnalyticsProps = {}) {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;
}

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === 'undefined') return;

  const eventProps = cleanProps(props);
  const plausibleProps = Object.fromEntries(
    Object.entries(eventProps).map(([key, value]) => [key, String(value)]),
  );

  window.gtag?.('event', eventName, eventProps);
  window.plausible?.(eventName, {
    props: plausibleProps,
  });
}
