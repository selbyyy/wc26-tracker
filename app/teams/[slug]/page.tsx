import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateSlug } from '@/lib/slug';
import {
  getAllTeams,
  getCountryFlag,
  getGroupForTeam,
  getRoundOf32Route,
  getTeamBySlugFromSchedule,
  getTeamMatches,
} from '@/lib/schedule';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllTeams().map((team) => ({ slug: generateSlug(team) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlugFromSchedule(slug);

  if (!team) return { title: 'Team Schedule Not Found' };

  return {
    title: `${team} World Cup 2026 Schedule, Cities, and Route`,
    description: `See ${team}'s confirmed World Cup 2026 group-stage matches, host cities, stadiums, and possible knockout route.`,
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getTeamBySlugFromSchedule(slug);
  if (!team) notFound();

  const matches = getTeamMatches(team);
  const group = getGroupForTeam(team);
  const roundOf32Routes = getRoundOf32Route(group);
  const cities = Array.from(new Set(matches.map((match) => match.city)));

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <section className="bg-[#0b7a3b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/75">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#0b7a3b]">WC26 Chances</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>

          <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-end">
            <div>
              <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
                Group {group} schedule
              </p>
              <h1 className="mt-4 text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
                {team} plays in {cities.join(', ')}.
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
                Confirmed group-stage route, opponents, stadiums, and the first knockout city if they win or finish second in the group.
              </p>
            </div>

            <div className="rounded-md bg-white p-5 text-[#102033] shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Quick answer</p>
              <div className="mt-3 space-y-3">
                {matches.map((match) => (
                  <div key={match.id} className="rounded-md border-2 border-[#eef0e8] bg-[#fffaf0] p-4">
                    <p className="text-lg font-black">{match.city}</p>
                    <p className="mt-1 text-sm font-bold text-[#506070]">
                      {match.date} · {match.time} · vs {match.home === team ? match.away : match.home}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {matches.map((match) => (
            <div key={match.id} className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#e52b2f] px-3 py-1 text-xs font-black uppercase text-white">
                  Match {match.id}
                </span>
                <span className="text-xs font-black uppercase text-[#667085]">{getCountryFlag(match.country)}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black">{match.home} vs {match.away}</h2>
              <p className="mt-3 text-lg font-black text-[#0b7a3b]">{match.city}</p>
              <p className="text-sm font-bold text-[#506070]">{match.stadium}</p>
              <p className="mt-3 rounded-md bg-[#fffaf0] px-3 py-2 text-sm font-black">
                {match.date} · {match.time}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Next city if they advance</p>
          <h2 className="mt-2 text-4xl font-black">First knockout route</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {roundOf32Routes.map(({ label, match }) => (
              <div key={label} className="rounded-md border-2 border-[#102033] bg-white p-5">
                <p className="text-sm font-black uppercase text-[#667085]">{label}</p>
                <h3 className="mt-2 text-3xl font-black">{match.city}</h3>
                <p className="mt-2 font-bold text-[#506070]">
                  Match {match.id} · {match.date} · {match.stadium}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#506070]">
                  Slot: {match.home} vs {match.away}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="rounded-md bg-[#102033] p-6 text-white">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#ffd447]">What this page is for</p>
          <h2 className="mt-2 text-3xl font-black">A fan should get the answer in 5 seconds.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
            If you support {team}, this page tells you the confirmed cities first. Prediction, ticket, hotel,
            and market layers can sit below this core route instead of forcing users through a betting page.
          </p>
        </div>
      </section>
    </main>
  );
}
