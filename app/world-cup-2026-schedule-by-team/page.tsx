import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from '../components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import { getAllTeams, getGroupForTeam, getTeamMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Schedule by Team: Every Team, City, Stadium',
  description:
    'Browse every World Cup 2026 team schedule with confirmed group-stage dates, opponents, host cities, stadiums, and links to each team route.',
  alternates: {
    canonical: '/world-cup-2026-schedule-by-team',
  },
  openGraph: {
    title: 'World Cup 2026 Schedule by Team: Every Team, City, Stadium',
    description:
      'Find every World Cup 2026 team schedule with confirmed cities, dates, stadiums, opponents, and possible routes.',
    url: '/world-cup-2026-schedule-by-team',
    type: 'article',
  },
};

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function getOpponent(match: ReturnType<typeof getTeamMatches>[number], team: string) {
  return match.home === team ? match.away : match.home;
}

export default function ScheduleByTeamPage() {
  const teams = getAllTeams().map((team) => {
    const matches = getTeamMatches(team);
    const cities = Array.from(new Set(matches.map((match) => match.city)));
    const opponents = matches.map((match) => getOpponent(match, team));

    return {
      team,
      group: getGroupForTeam(team),
      matches,
      cities,
      opponents,
      slug: generateSlug(team),
    };
  });
  const priorityTeams = ['Argentina', 'USA', 'Mexico', 'Brazil', 'England', 'Spain', 'France', 'Portugal'];
  const faqItems = [
    {
      question: 'How do I find a World Cup 2026 schedule by team?',
      answer:
        'Use this page to choose a team, then open the team page for confirmed opponents, dates, host cities, stadiums, and possible knockout routes.',
    },
    {
      question: 'Which teams have confirmed World Cup 2026 group-stage cities?',
      answer:
        'All listed teams on this page have confirmed group-stage cities from the project schedule data. Knockout cities depend on final group position and tournament results.',
    },
    {
      question: 'Can I compare World Cup 2026 teams by city?',
      answer:
        'Yes. Each team row lists its confirmed host cities, and the city guide shows which teams are scheduled in each host city.',
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

      <section className="bg-[#0b7a3b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/75">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#0b7a3b]">WC26 Chances</Link>
            <Link href="/world-cup-2026-games-today" className="px-2 py-2 hover:text-[#ffd447]">Today</Link>
            <Link href="/world-cup-2026-chances-by-team" className="px-2 py-2 hover:text-[#ffd447]">Chances</Link>
            <Link href="/matches" className="px-2 py-2 hover:text-[#ffd447]">Matches</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Team schedule index
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 schedule by team.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            Pick a team to see its confirmed group games, host cities, stadiums, opponents, and possible next stop.
          </p>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto grid max-w-7xl gap-5 border-b-2 border-[#102033]/20 px-5 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Tournament is live</p>
            <h2 className="mt-2 text-3xl font-black">Start with today&apos;s games, then pick a team.</h2>
            <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-[#3d3b23]">
              The current-slate page links each scheduled match back to its team, city, and route pages.
            </p>
          </div>
          <Link
            href="/world-cup-2026-games-today"
            className="inline-flex justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-black text-white hover:bg-[#e52b2f]"
          >
            Games today
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Most searched teams</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {priorityTeams.map((team) => (
              <Link
                key={team}
                href={`/teams/${generateSlug(team)}`}
                className="rounded-full border-2 border-[#102033] bg-white px-4 py-2 text-sm font-black hover:bg-[#102033] hover:text-white"
              >
                {team}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-4">
          {teams.map(({ team, group, matches, cities, opponents, slug }) => (
            <Link
              key={team}
              href={`/teams/${slug}`}
              className="grid gap-4 rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447] hover:bg-[#fffaf0] md:grid-cols-[0.9fr_1.1fr_1fr]"
            >
              <div>
                <p className="text-xs font-black uppercase text-[#e52b2f]">Group {group}</p>
                <h2 className="mt-1 text-3xl font-black">{team}</h2>
                <p className="mt-2 text-sm font-bold text-[#506070]">
                  vs {formatList(opponents)}
                </p>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-[#667085]">Confirmed cities</p>
                <p className="mt-1 text-lg font-black text-[#0b7a3b]">{formatList(cities)}</p>
              </div>
              <div className="space-y-2">
                {matches.map((match) => (
                  <p key={match.id} className="text-sm font-bold">
                    {match.date}: <span className="font-normal text-[#506070]">{match.city} · {match.stadium}</span>
                  </p>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context="schedule-by-team-ticket-planning"
          title="Choosing matches to follow?"
          body="Use the team list to shortlist cities and dates, then check official ticket availability before making travel plans."
          kind="tickets"
        />
        <CommercialCta
          context="schedule-by-team-route-alerts"
          title="Need one team tracked?"
          body="Send the team you care about and we will shape alerts around the cities that matter next."
          kind="alerts"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">Schedule by team FAQ</h2>
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
