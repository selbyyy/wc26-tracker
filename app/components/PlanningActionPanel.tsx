'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

type PlanningActionPanelProps = {
  context: string;
  team: string;
  cities: string[];
};

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function googleHotelsUrl(team: string, cities: string[]) {
  const cityQuery = cities[0] ? `${cities[0]} World Cup 2026 hotels` : `${team} World Cup 2026 hotels`;
  return `https://www.google.com/travel/hotels?q=${encodeURIComponent(cityQuery)}`;
}

function alertMailto(team: string, cities: string[]) {
  const subject = `${team} World Cup 2026 route alerts`;
  const body = [
    `Team: ${team}`,
    `Cities I am watching: ${formatList(cities)}`,
    '',
    'Please send me updates when the likely route or useful planning pages change.',
  ].join('\n');

  return `mailto:hello@wc26chances.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PlanningActionPanel({ context, team, cities }: PlanningActionPanelProps) {
  const actions = [
    {
      label: 'Check official tickets',
      title: 'Tickets',
      body: 'Use the confirmed cities first, then check FIFA for current ticket information.',
      href: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets',
      event: 'ticket_planning_click',
      rel: 'nofollow sponsored noopener noreferrer',
      target: '_blank',
    },
    {
      label: 'Compare hotels',
      title: 'Hotels',
      body: `Start with ${cities[0] || 'the first confirmed city'}, then keep bookings flexible for knockout routes.`,
      href: googleHotelsUrl(team, cities),
      event: 'hotel_planning_click',
      rel: 'nofollow sponsored noopener noreferrer',
      target: '_blank',
    },
    {
      label: 'Request route alerts',
      title: 'Route alerts',
      body: 'Tell us the team you care about so we can shape useful city and route updates.',
      href: alertMailto(team, cities),
      event: 'route_alert_click',
    },
  ];

  useEffect(() => {
    trackEvent('planning_action_panel_view', {
      event_category: 'commercial',
      event_label: context,
      context,
      team,
      city_count: cities.length,
    });
  }, [cities.length, context, team]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e52b2f]">Before you book</p>
        <h2 className="mt-2 text-3xl font-black">Turn {team}&apos;s route into a plan.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#506070]">
          {team} is confirmed for {formatList(cities)}. Use those cities as the base case, then keep the knockout
          rounds flexible until the group table is clearer.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <a
              key={action.event}
              href={action.href}
              target={action.target}
              rel={action.rel}
              onClick={() => {
                trackEvent(action.event, {
                  event_category: 'commercial',
                  event_label: context,
                  context,
                  team,
                });
              }}
              data-commercial-context={context}
              data-commercial-event={action.event}
              className="rounded-md border-2 border-[#eef0e8] bg-[#fffaf0] p-4 hover:border-[#0b7a3b]"
            >
              <p className="text-sm font-black uppercase text-[#667085]">{action.title}</p>
              <p className="mt-2 min-h-16 text-sm font-bold leading-6 text-[#506070]">{action.body}</p>
              <span className="mt-4 inline-flex rounded-full bg-[#0b7a3b] px-4 py-2 text-sm font-black text-white">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
