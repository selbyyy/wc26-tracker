import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from './components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import {
  allMatches,
  getAllTeams,
  getCityMatches,
  getRoundOf32Route,
  getTeamMatches,
  groupStageMatches,
} from '@/lib/schedule';
import { getTeamGroupForecast } from '@/lib/probability-tree';

export const metadata: Metadata = {
  title: 'World Cup 2026 Chances by Team: Routes, Cities, Schedule',
  description:
    'Pick a World Cup 2026 team and see its modelled chance of reaching the knockout stage, confirmed schedule, host cities, and possible route.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'World Cup 2026 Chances by Team: Routes, Cities, Schedule',
    description:
      'See each team\'s modelled chance of reaching the knockout stage, confirmed cities, dates, stadiums, and possible routes.',
    url: '/',
    type: 'website',
  },
};

const heroTeams = ['Argentina', 'USA', 'Mexico', 'Brazil', 'England', 'Spain', 'France', 'Portugal'];

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function teamCard(team: string) {
  const matches = getTeamMatches(team);
  const group = matches[0]?.group || '';
  const route = getRoundOf32Route(group);
  const cities = Array.from(new Set(matches.map((match) => match.city)));
  const forecast = getTeamGroupForecast(team);
  const advanceChance = 100 - forecast.out;
  return { team, matches, group, route, cities, advanceChance };
}

export default function Home() {
  const cards = heroTeams.map(teamCard);
  const allTeams = getAllTeams();
  const faqItems = [
    {
      question: 'How do I find a World Cup 2026 schedule by team?',
      answer:
        'Choose a team on WC26 Chances to see its confirmed group-stage opponents, dates, host cities, stadiums, and possible first knockout stop.',
    },
    {
      question: 'What do the World Cup 2026 chances mean?',
      answer:
        'WC26 Chances uses a simple planning model to estimate how likely each team is to win its group, finish second, advance in third place, or go out. The model is a guide, not an official prediction or betting market.',
    },
    {
      question: 'Where does Argentina play in World Cup 2026?',
      answer: `Argentina plays its confirmed group games in ${formatList(teamCard('Argentina').cities)}.`,
    },
    {
      question: 'Where does USA play in World Cup 2026?',
      answer: `USA plays its confirmed group games in ${formatList(teamCard('USA').cities)}.`,
    },
    {
      question: 'Can I search World Cup 2026 matches by city?',
      answer:
        'Yes. The host city guide lists scheduled group and knockout matches by city, including stadium, date, and teams where available.',
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
  const cityHighlights = ['Dallas', 'Miami', 'New York/New Jersey', 'Los Angeles'].map((city) => ({
    city,
    matches: getCityMatches(city),
  }));

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden bg-[#0b7a3b] text-white">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#ffffff_1px,transparent_1px),linear-gradient(45deg,#ffffff_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-6 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-10">
          <div className="flex min-h-[520px] flex-col justify-between">
            <nav className="flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-wide text-white/80">
              <span className="rounded-full bg-white px-4 py-2 text-[#0b7a3b]">WC26 Chances</span>
              <Link href="/teams/argentina" className="hover:text-[#ffd447]">Teams</Link>
              <Link href="/world-cup-2026-chances-by-team" className="hover:text-[#ffd447]">Chances</Link>
              <Link href="/world-cup-2026-schedule-by-team" className="hover:text-[#ffd447]">Schedule</Link>
              <Link href="/cities" className="hover:text-[#ffd447]">Cities</Link>
              <Link href="/scenarios" className="hover:text-[#ffd447]">Routes</Link>
            </nav>

            <div>
              <p className="mb-4 inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
                World Cup 2026 planning model
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
                World Cup 2026 chances, mapped by team.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-white/85">
                Choose a team to see its modelled chance of reaching the knockout stage, confirmed group games, and the cities that
                open up along each possible knockout route.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{allTeams.length}</span>
                <span className="text-sm font-bold text-white/75">team chance models</span>
              </div>
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{allMatches.length}</span>
                <span className="text-sm font-bold text-white/75">scheduled games</span>
              </div>
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{groupStageMatches.length}</span>
                <span className="text-sm font-bold text-white/75">confirmed group games</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-white/25 bg-white p-4 text-[#102033] shadow-2xl">
            <div className="mb-4 rounded-md bg-[#e52b2f] p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/80">Start with a team</p>
              <h2 className="mt-1 text-3xl font-black">Popular team chances</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map(({ team, group, matches, route, advanceChance }) => (
                <Link
                  href={`/teams/${generateSlug(team)}`}
                  key={team}
                  className="rounded-md border-2 border-[#eef0e8] bg-[#fffaf0] p-4 hover:border-[#e52b2f]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black">{team}</h3>
                      <p className="mt-1 text-xs font-black uppercase text-[#667085]">Group {group}</p>
                    </div>
                    <span className="rounded-full bg-[#ffd447] px-3 py-1 text-xs font-black">{advanceChance}% reach knockouts</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {matches.map((match) => (
                      <p key={match.id} className="text-sm font-bold">
                        {match.city} <span className="font-normal text-[#667085]">vs {match.home === team ? match.away : match.home}</span>
                      </p>
                    ))}
                  </div>
                  {route[0] && (
                    <p className="mt-4 rounded-md bg-white px-3 py-2 text-sm font-black text-[#0b7a3b]">
                      Win group: {route[0].match.city}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold leading-5 text-[#667085]">
              Knockout-stage chances come from a simple planning model, not an official forecast or betting market.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">All team pages</p>
          <h2 className="mt-2 text-3xl font-black">Find any World Cup 2026 team chance model</h2>
          <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-[#3d3b23]">
            Each page starts with the chance of advancing, then maps who they play, which cities they visit,
            and where the bracket could send them next.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {allTeams.map((team) => (
              <Link
                href={`/teams/${generateSlug(team)}`}
                key={team}
                className="rounded-full border-2 border-[#102033] bg-white px-4 py-2 text-sm font-black hover:bg-[#102033] hover:text-white"
              >
                {team}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Search answers</p>
            <h2 className="mt-2 text-4xl font-black">The questions fans actually ask</h2>
            <p className="mt-4 text-lg leading-8 text-[#506070]">
              These pages are built around quick answers: where a team plays, who they face, and which cities become
              relevant if they get out of the group.
            </p>
          </div>
          <div className="grid gap-3">
            {[
            ['World Cup 2026 schedule by team', '/world-cup-2026-schedule-by-team'],
              ['World Cup 2026 chances by team', '/world-cup-2026-chances-by-team'],
              ['Where does Argentina play in World Cup 2026?', '/teams/argentina'],
              ['Where does USA play in World Cup 2026?', '/teams/usa'],
              ['World Cup 2026 cities by team', '/cities'],
              ['World Cup 2026 knockout route by group', '/scenarios'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-md border-2 border-[#102033] bg-white px-5 py-4 text-lg font-black shadow-[5px_5px_0_#ffd447] hover:bg-[#fffaf0]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">City guide</p>
            <h2 className="mt-2 text-4xl font-black">Planning by city?</h2>
            <p className="mt-4 text-lg leading-8 text-[#506070]">
              If you already know where you might travel, start with the host city. See which teams are scheduled
              there and which later-round games could make the trip more interesting.
            </p>
            <Link href="/cities" className="mt-6 inline-flex rounded-full bg-[#0b7a3b] px-6 py-3 text-sm font-black text-white hover:bg-[#e52b2f]">
              See host cities
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cityHighlights.map(({ city, matches }) => (
              <Link href="/cities" key={city} className="rounded-md border-2 border-[#eef0e8] bg-[#fffaf0] p-5 hover:border-[#0b7a3b]">
                <p className="text-xs font-black uppercase text-[#667085]">{matches.length} games</p>
                <h3 className="mt-1 text-2xl font-black">{city}</h3>
                <div className="mt-4 space-y-2 text-sm">
                  {matches.slice(0, 3).map((match) => (
                    <p key={match.id} className="font-bold">
                      Match {match.id}: <span className="font-normal text-[#506070]">{match.home} vs {match.away}</span>
                    </p>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context="home-ticket-planning"
          title="Ready to look at tickets?"
          body="Use this page to decide which matches matter to you, then check FIFA's official ticket page for current availability."
          kind="tickets"
        />
        <CommercialCta
          context="home-route-alerts"
          title="Want updates for one team?"
          body="Send the team or city you care about. We will use that to shape a simple route alert."
          kind="alerts"
        />
      </section>

      <section className="bg-[#102033] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 md:px-8">
          {[
            ['No guessing the basics', 'The first answer is always the confirmed schedule: opponent, city, stadium, date, and time.'],
            ['Routes after the group', 'Once you know the group, you can see the first possible knockout city without digging through the bracket.'],
            ['Useful before it is fancy', 'Odds and prices can come later. Right now the site is built to answer the fan planning question quickly.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-md border border-white/15 bg-white/10 p-5">
              <h3 className="text-xl font-black text-[#ffd447]">{title}</h3>
              <p className="mt-3 leading-7 text-white/75">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 schedule FAQ</h2>
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
