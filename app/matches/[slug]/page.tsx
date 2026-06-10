import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CommercialCta } from '@/app/components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import {
  getCityMatches,
  getCitySlug,
  getGroupForTeam,
  getGroupStageMatchBySlug,
  getGroupStageMatchSlug,
  getTeamMatches,
  groupStageMatches,
} from '@/lib/schedule';
import { getTeamGroupForecast } from '@/lib/probability-tree';

export const dynamic = 'force-static';

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function opponentFor(team: string) {
  const matches = getTeamMatches(team);
  return matches.map((match) => (match.home === team ? match.away : match.home));
}

function advanceChance(team: string) {
  const forecast = getTeamGroupForecast(team);
  return 100 - forecast.out;
}

export function generateStaticParams() {
  return groupStageMatches.map((match) => ({ slug: getGroupStageMatchSlug(match) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const match = getGroupStageMatchBySlug(slug);
  if (!match) return { title: 'World Cup 2026 Match Not Found' };

  const title = `${match.home} vs ${match.away}: World Cup 2026 Match ${match.id}, ${match.city}`;
  const description = `${match.home} vs ${match.away} at World Cup 2026: ${match.date}, ${match.time}, ${match.stadium} in ${match.city}. See team schedules, city guide, and planning links.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/matches/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/matches/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function MatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const match = getGroupStageMatchBySlug(slug);
  if (!match) notFound();

  const teams = [match.home, match.away];
  const teamSummaries = teams.map((team) => ({
    team,
    group: getGroupForTeam(team),
    opponents: opponentFor(team),
    chance: advanceChance(team),
  }));
  const cityMatches = getCityMatches(match.city);
  const relatedCityMatches = cityMatches.filter((cityMatch) => cityMatch.id !== match.id).slice(0, 5);
  const faqItems = [
    {
      question: `When is ${match.home} vs ${match.away} at World Cup 2026?`,
      answer: `${match.home} vs ${match.away} is scheduled for ${match.date} at ${match.time}.`,
    },
    {
      question: `Where is ${match.home} vs ${match.away} played?`,
      answer: `The match is scheduled for ${match.stadium} in ${match.city}, ${match.country}.`,
    },
    {
      question: `What group is ${match.home} vs ${match.away}?`,
      answer: `${match.home} vs ${match.away} is a Group ${match.group} match.`,
    },
    {
      question: `Can I see the full ${match.city} World Cup 2026 schedule?`,
      answer: `Yes. The ${match.city} page lists the other group-stage matches and later knockout slots assigned to the city.`,
    },
  ];
  const pageUrl = `https://www.wc26chances.com/matches/${slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'WC26 Chances',
          item: 'https://www.wc26chances.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'World Cup 2026 Matches',
          item: 'https://www.wc26chances.com/matches',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${match.home} vs ${match.away}`,
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#0b7a3b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/75">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#0b7a3b]">WC26 Chances</Link>
            <Link href="/matches" className="px-2 py-2 hover:text-[#ffd447]">Matches</Link>
            <Link href="/world-cup-2026-schedule-by-team" className="px-2 py-2 hover:text-[#ffd447]">Schedule</Link>
            <Link href={`/cities/${getCitySlug(match.city)}`} className="px-2 py-2 hover:text-[#ffd447]">City</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Group {match.group} · Match {match.id}
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            {match.home} vs {match.away}.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            {match.home} and {match.away} meet in {match.city} on {match.date}. Use this page to confirm the stadium,
            compare each team&apos;s group path, and decide whether this match belongs in your trip plan.
          </p>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 md:grid-cols-4 md:px-8">
          {[
            ['Date', match.date],
            ['Time', match.time],
            ['City', match.city],
            ['Stadium', match.stadium],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border-2 border-[#102033] bg-white p-4">
              <p className="text-xs font-black uppercase text-[#667085]">{label}</p>
              <p className="mt-1 text-xl font-black">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {teamSummaries.map(({ team, group, opponents, chance }) => (
            <Link
              key={team}
              href={`/teams/${generateSlug(team)}`}
              className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447] hover:bg-[#fffaf0]"
            >
              <p className="text-xs font-black uppercase text-[#e52b2f]">Team page</p>
              <h2 className="mt-2 text-3xl font-black">{team}</h2>
              <p className="mt-3 text-lg font-black text-[#0b7a3b]">{chance}% modelled chance to reach the knockout stage</p>
              <p className="mt-2 leading-7 text-[#506070]">
                Group {group} opponents: {formatList(opponents)}.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <div className="rounded-md border-2 border-[#102033] bg-white p-5">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">City context</p>
          <h2 className="mt-2 text-3xl font-black">{match.city} has {cityMatches.length} World Cup 2026 games.</h2>
          <p className="mt-3 leading-7 text-[#506070]">
            Start from the city if you are planning travel. The city page shows group matches, assigned knockout slots,
            stadium details, and teams already scheduled there.
          </p>
          <Link
            href={`/cities/${getCitySlug(match.city)}`}
            className="mt-5 inline-flex rounded-full bg-[#0b7a3b] px-5 py-3 text-sm font-black text-white hover:bg-[#e52b2f]"
          >
            Open {match.city} guide
          </Link>
        </div>

        <div className="rounded-md border-2 border-[#102033] bg-[#ffd447] p-5">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">More in this city</p>
          <div className="mt-4 grid gap-3">
            {relatedCityMatches.map((cityMatch) => (
              <div key={cityMatch.id} className="rounded-md bg-white p-4">
                <p className="text-sm font-black">
                  Match {cityMatch.id}: {cityMatch.home} vs {cityMatch.away}
                </p>
                <p className="mt-1 text-sm font-bold text-[#506070]">
                  {cityMatch.stage} · {cityMatch.date} · {cityMatch.stadium}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context={`match-${match.id}-tickets`}
          title="Checking this match for tickets?"
          body="Use the confirmed city and stadium here, then check FIFA's official ticket page for current availability."
          kind="tickets"
        />
        <CommercialCta
          context={`match-${match.id}-hotels`}
          title={`Need hotels near ${match.city}?`}
          body="Compare hotels around the host city after you know the match date and stadium."
          kind="hotels"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">{match.home} vs {match.away} FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-md border-2 border-[#102033] bg-white p-5">
              <h3 className="text-xl font-black">{item.question}</h3>
              <p className="mt-2 leading-7 text-[#506070]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
