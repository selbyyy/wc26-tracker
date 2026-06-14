import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from '../components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import { getCitySlug, getGroupStageMatchSlug } from '@/lib/schedule';
import {
  getMatchesForScheduleLabel,
  getUpcomingGroupStageMatches,
  groupMatchesByDate,
  tournamentTodayLabel,
} from '@/lib/tournament-day';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'World Cup 2026 Games Today: Match Schedule, Teams, Cities',
  description:
    'See the World Cup 2026 games scheduled today, plus the next matches by team, city, stadium, and kickoff time.',
  alternates: {
    canonical: '/world-cup-2026-games-today',
  },
  openGraph: {
    title: 'World Cup 2026 Games Today: Match Schedule',
    description:
      'Check today\'s World Cup 2026 games and the next matches by team, city, stadium, and kickoff time.',
    url: '/world-cup-2026-games-today',
    type: 'article',
  },
};

function MatchCard({ match, compact = false }: {
  match: ReturnType<typeof getUpcomingGroupStageMatches>[number];
  compact?: boolean;
}) {
  return (
    <Link
      href={`/matches/${getGroupStageMatchSlug(match)}`}
      className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447] hover:bg-[#fffaf0]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#e52b2f] px-3 py-1 text-xs font-black uppercase text-white">
          Match {match.id}
        </span>
        <span className="text-xs font-black uppercase text-[#667085]">Group {match.group}</span>
      </div>
      <h2 className={`${compact ? 'text-2xl' : 'text-3xl'} mt-4 font-black`}>
        {match.home} vs {match.away}
      </h2>
      <p className="mt-3 text-lg font-black text-[#0b7a3b]">
        {match.date} · {match.time}
      </p>
      <p className="mt-2 text-sm font-bold text-[#506070]">
        {match.stadium}, {match.city}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[match.home, match.away, match.city].map((item) => (
          <span key={item} className="rounded-full border-2 border-[#102033] px-3 py-1 text-xs font-black">
            {item}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function GamesTodayPage() {
  const todayLabel = tournamentTodayLabel();
  const todayMatches = getMatchesForScheduleLabel(todayLabel);
  const upcomingMatches = getUpcomingGroupStageMatches(3);
  const upcomingGroups = Array.from(groupMatchesByDate(upcomingMatches).entries());
  const primaryMatches = todayMatches.length > 0 ? todayMatches : upcomingMatches.slice(0, 4);
  const faqItems = [
    {
      question: 'What World Cup 2026 games are today?',
      answer:
        todayMatches.length > 0
          ? `Today's listed World Cup 2026 games are ${todayMatches.map((match) => `${match.home} vs ${match.away}`).join(', ')}.`
          : 'There are no group-stage matches listed for today in the current schedule data. The page shows the next scheduled matches instead.',
    },
    {
      question: 'Are these live scores?',
      answer:
        'No. WC26 Chances shows scheduled games, teams, cities, stadiums, and planning links. It does not publish live scores.',
    },
    {
      question: 'Can I open one match page?',
      answer:
        'Yes. Each game links to a match page with the matchup, stadium, host city, team pages, and trip-planning next steps.',
    },
  ];
  const jsonLd = [
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
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `World Cup 2026 games today - ${todayLabel}`,
      itemListElement: primaryMatches.map((match, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.wc26chances.com/matches/${getGroupStageMatchSlug(match)}`,
        name: `${match.home} vs ${match.away}`,
      })),
    },
  ];

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
            <Link href="/matches" className="px-2 py-2 hover:text-[#ffd447]">Matches</Link>
            <Link href="/world-cup-2026-chances-by-team" className="px-2 py-2 hover:text-[#ffd447]">Chances</Link>
            <Link href="/world-cup-2026-schedule-by-team" className="px-2 py-2 hover:text-[#ffd447]">Schedule</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Today&apos;s match schedule
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 games today.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/75">
            For {todayLabel}, see the scheduled World Cup 2026 matchups, kickoff times, host cities, stadiums,
            and the team pages that explain each route.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">{todayMatches.length}</span>
              <span className="text-sm font-bold text-white/70">games listed today</span>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">{upcomingMatches.length}</span>
              <span className="text-sm font-bold text-white/70">games in the coming match days</span>
            </div>
            <div className="rounded-md bg-white/10 p-4">
              <span className="block text-3xl font-black">No scores</span>
              <span className="text-sm font-bold text-white/70">schedule and planning only</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">
            {todayLabel}
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {todayMatches.length > 0 ? 'Games scheduled today' : 'No listed games today. Start with the next scheduled matches.'}
          </h2>
          <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-[#3d3b23]">
            Open a match to check the city, stadium, team routes, and planning links. Times are shown as schedule labels from the match data.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {primaryMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Coming match days</p>
          <h2 className="mt-2 text-4xl font-black">Upcoming World Cup 2026 games by date</h2>
          <div className="mt-6 space-y-8">
            {upcomingGroups.map(([date, matches]) => (
              <div key={date}>
                <h3 className="text-2xl font-black">{date}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {matches.map((match) => (
                    <MatchCard key={match.id} match={match} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context="today-ticket-planning"
          title="Found a match today?"
          body="Confirm the city and stadium, then check FIFA's official ticket page before planning travel."
          kind="tickets"
        />
        <CommercialCta
          context="today-route-alerts"
          title="Following one team?"
          body="Send the team or city you care about and we will shape a simple route alert."
          kind="alerts"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Fast links</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from(new Set(primaryMatches.flatMap((match) => [match.home, match.away]))).map((team) => (
            <Link
              href={`/teams/${generateSlug(team)}`}
              key={team}
              className="rounded-full border-2 border-[#102033] bg-white px-4 py-2 text-sm font-black hover:bg-[#102033] hover:text-white"
            >
              {team}
            </Link>
          ))}
          {Array.from(new Set(primaryMatches.map((match) => match.city))).map((city) => (
            <Link
              href={`/cities/${getCitySlug(city)}`}
              key={city}
              className="rounded-full border-2 border-[#0b7a3b] bg-[#e9fff3] px-4 py-2 text-sm font-black text-[#0b7a3b] hover:bg-[#0b7a3b] hover:text-white"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 games today FAQ</h2>
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
