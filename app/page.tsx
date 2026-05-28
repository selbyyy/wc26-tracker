import Link from 'next/link';
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

const heroTeams = ['Argentina', 'USA', 'Mexico', 'Brazil', 'England', 'Spain', 'France', 'Portugal'];

function teamCard(team: string) {
  const matches = getTeamMatches(team);
  const group = matches[0]?.group || '';
  const route = getRoundOf32Route(group);
  const cities = Array.from(new Set(matches.map((match) => match.city)));
  return { team, matches, group, route, cities };
}

export default function Home() {
  const cards = heroTeams.map(teamCard);
  const allTeams = getAllTeams();
  const cityHighlights = ['Dallas', 'Miami', 'New York/New Jersey', 'Los Angeles'].map((city) => ({
    city,
    matches: getCityMatches(city),
  }));

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <section className="relative overflow-hidden bg-[#0b7a3b] text-white">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#ffffff_1px,transparent_1px),linear-gradient(45deg,#ffffff_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-6 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-10">
          <div className="flex min-h-[520px] flex-col justify-between">
            <nav className="flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-wide text-white/80">
              <span className="rounded-full bg-white px-4 py-2 text-[#0b7a3b]">WC26 Chances</span>
              <Link href="/teams/argentina" className="hover:text-[#ffd447]">Teams</Link>
              <Link href="/cities" className="hover:text-[#ffd447]">Cities</Link>
              <Link href="/scenarios" className="hover:text-[#ffd447]">Routes</Link>
            </nav>

            <div>
              <p className="mb-4 inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
                Real 2026 schedule paths
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
                Pick your team. See their cities.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-white/85">
                A faster World Cup guide for fans planning where their team plays, where they could go next,
                and which host cities matter.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{groupStageMatches.length}</span>
                <span className="text-sm font-bold text-white/75">group matches loaded</span>
              </div>
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{allMatches.length}</span>
                <span className="text-sm font-bold text-white/75">official match slots</span>
              </div>
              <div className="rounded-md bg-white/15 p-4 backdrop-blur">
                <span className="block text-3xl font-black">{allTeams.length}</span>
                <span className="text-sm font-bold text-white/75">teams with routes</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-white/25 bg-white p-4 text-[#102033] shadow-2xl">
            <div className="mb-4 rounded-md bg-[#e52b2f] p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/80">5-second fan task</p>
              <h2 className="mt-1 text-3xl font-black">Where does my team play?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map(({ team, group, matches, route }) => (
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
                    <span className="rounded-full bg-[#ffd447] px-3 py-1 text-xs font-black">Route</span>
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
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <h2 className="text-2xl font-black">Choose any team</h2>
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

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Tourism mode</p>
            <h2 className="mt-2 text-4xl font-black">Host cities as the product</h2>
            <p className="mt-4 text-lg leading-8 text-[#506070]">
              This version answers the travel question first: which teams are already scheduled in each city,
              and which knockout slots make that city worth watching.
            </p>
            <Link href="/cities" className="mt-6 inline-flex rounded-full bg-[#0b7a3b] px-6 py-3 text-sm font-black text-white hover:bg-[#e52b2f]">
              Explore host cities
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cityHighlights.map(({ city, matches }) => (
              <Link href="/cities" key={city} className="rounded-md border-2 border-[#eef0e8] bg-[#fffaf0] p-5 hover:border-[#0b7a3b]">
                <p className="text-xs font-black uppercase text-[#667085]">{matches.length} match slots</p>
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
          title="Start with official ticket planning"
          body="Use the team and city pages here to decide which matches matter, then check FIFA's official ticket page for current availability and ticket-inclusive hospitality options."
          kind="tickets"
        />
        <CommercialCta
          context="home-route-alerts"
          title="Follow a team route"
          body="Tell us which team or city you care about and we can turn future updates into a route alert product instead of a one-time pageview."
          kind="alerts"
        />
      </section>

      <section className="bg-[#102033] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 md:px-8">
          {[
            ['No old market pages', 'Prediction-market prices can come back as inline signals, not as the main destination.'],
            ['Real schedule first', 'Every team page now starts with confirmed group-stage dates, opponents, cities, and stadiums.'],
            ['Knockout paths next', 'Round-of-32 city routes are shown from official bracket slots, without pretending future results are known.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-md border border-white/15 bg-white/10 p-5">
              <h3 className="text-xl font-black text-[#ffd447]">{title}</h3>
              <p className="mt-3 leading-7 text-white/75">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
