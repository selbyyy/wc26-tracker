'use client';

import { trackEvent } from '@/lib/analytics';

type CtaKind = 'tickets' | 'hotels' | 'alerts';

type CommercialCtaProps = {
  context: string;
  title: string;
  body: string;
  kind?: CtaKind;
};

const ctaConfig: Record<CtaKind, { label: string; href: string; event: string }> = {
  tickets: {
    label: 'Plan tickets',
    href: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets',
    event: 'ticket_planning_click',
  },
  hotels: {
    label: 'Compare hotels',
    href: 'https://www.google.com/travel/hotels',
    event: 'hotel_planning_click',
  },
  alerts: {
    label: 'Get route alerts',
    href: 'mailto:hello@wc26chances.com?subject=WC26%20route%20alerts',
    event: 'route_alert_click',
  },
};

export function CommercialCta({ context, title, body, kind = 'tickets' }: CommercialCtaProps) {
  const config = ctaConfig[kind];

  function trackClick() {
    trackEvent(config.event, {
      event_category: 'commercial',
      event_label: context,
      context,
      cta_kind: kind,
    });
  }

  return (
    <div className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e52b2f]">Planning next step</p>
      <h2 className="mt-2 text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-[#506070]">{body}</p>
      <a
        href={config.href}
        target={kind === 'alerts' ? undefined : '_blank'}
        rel={kind === 'alerts' ? undefined : 'nofollow sponsored noopener noreferrer'}
        onClick={trackClick}
        data-commercial-context={context}
        data-commercial-event={config.event}
        className="mt-5 inline-flex rounded-full bg-[#0b7a3b] px-5 py-3 text-sm font-black text-white hover:bg-[#e52b2f]"
      >
        {config.label}
      </a>
    </div>
  );
}
