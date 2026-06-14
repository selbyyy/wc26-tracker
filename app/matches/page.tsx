import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from '../components/CommercialCta';
import { getAllCities, getGroupStageMatchSlug, groupStageMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Matches: Dates, Cities, Teams, Stadiums',
  description:
    'Browse every confirmed World Cup 2026 group-stage match by date, team, city, and stadium, with links to match and team planning pages.',
  alternates: {
    canonical: '/matches',
  },
  openGraph: {
    title: 'World Cup 2026 Matches: Dates, Cities, Teams, Stadiums',
    description:
      'Find confirmed World Cup 2026 group-stage matches by date, team, city, and stadium.',
    url: '/matches',
    type: 'article',
  },
};

export default function MatchesPage() {
  const firstMatch = groupStageMatches[0];
  const lastMatch = groupStageMatches[groupStageMatches.length - 1];
  const cities = getAllCities();
  const faqItems = [
    {
      question: 'Where can I find the World Cup 2026 match schedule?',
      answer:
        'This page lists every confirmed World Cup 2026 group-stage match with date, time, teams, city, and stadium.',
    },
    {
      question: 'Can I open a page for one World Cup 2026 match?',
      answer:
        'Yes. Each match card links to a match page with the teams, stadium, city, related team schedules, and trip-planning next steps.',
    },
    {
      question: 'Are knockout matches included here?',
      answer:
        'This index focuses on confirmed group-stage team matchups. Host-city pages include both group-stage matches and assigned knockout slots.',
    },
  ];
  const jsonLd = {
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
  };

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#102033] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/70">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#102033]">WC26 Chances</Link>
            <Link href="/world-cup-2026-games-today" className="px-2 py-2 hover:text-[#ffd447]">Today</Link>
            <Link href="/world-cup-2026-chances-by-team" className="px-2 py-2 hover:text-[#ffd447]">Chances</Link>
            <Link href="/world-cup-2026-schedule-by-team" className="px-2 py-2 hover:text-[#ffd447]">Schedule</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Group-stage match index
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 matches by date.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/75">
            Open one match to see the teams, city, stadium, date, and the next planning steps around tickets, hotels, and route alerts.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">{groupStageMatches.length}</span>
              <span className="text-sm font-bold text-white/70">confirmed group matches</span>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">{cities.length}</span>
              <span className="text-sm font-bold text-white/70">host cities with games</span>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">{firstMatch.date.split(', ')[1]}-{lastMatch.date.split(', ')[1]}</span>
              <span className="text-sm font-bold text-white/70">group-stage window</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Need the current slate?</p>
            <h2 className="mt-2 text-3xl font-black">Open today&apos;s World Cup 2026 games first.</h2>
            <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-[#3d3b23]">
              The today page filters this match index down to the games scheduled now and the coming match days.
            </p>
          </div>
          <Link
            href="/world-cup-2026-games-today"
            className="inline-flex justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-black text-white hover:bg-[#e52b2f]"
          >
            Games today
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groupStageMatches.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${getGroupStageMatchSlug(match)}`}
              className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447] hover:bg-[#fffaf0]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#e52b2f] px-3 py-1 text-xs font-black uppercase text-white">
                  Match {match.id}
                </span>
                <span className="text-xs font-black uppercase text-[#667085]">Group {match.group}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black">{match.home} vs {match.away}</h2>
              <p className="mt-3 text-lg font-black text-[#0b7a3b]">{match.city}</p>
              <p className="text-sm font-bold text-[#506070]">{match.stadium}</p>
              <p className="mt-3 rounded-md bg-[#fffaf0] px-3 py-2 text-sm font-black">
                {match.date} · {match.time}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[match.home, match.away].map((team) => (
                  <span key={team} className="rounded-full border-2 border-[#102033] px-3 py-1 text-xs font-black">
                    {team}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context="matches-ticket-planning"
          title="Found a match you care about?"
          body="Use the match page to confirm the city and stadium, then check FIFA's official ticket page before planning travel."
          kind="tickets"
        />
        <CommercialCta
          context="matches-route-alerts"
          title="Want one team tracked?"
          body="Send the team or city you care about and we will shape a simple alert around the route."
          kind="alerts"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 match FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
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
