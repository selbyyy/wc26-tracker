import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CommercialCta } from '@/app/components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import {
  getAllTeams,
  getCountryFlag,
  getGroupForTeam,
  getTeamBySlugFromSchedule,
  getTeamMatches,
} from '@/lib/schedule';
import { getTeamGroupForecast, getTeamProbabilityTree } from '@/lib/probability-tree';

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
    alternates: {
      canonical: `/teams/${slug}`,
    },
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getTeamBySlugFromSchedule(slug);
  if (!team) notFound();

  const matches = getTeamMatches(team);
  const group = getGroupForTeam(team);
  const groupForecast = getTeamGroupForecast(team);
  const probabilityTree = getTeamProbabilityTree(team);
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
                Confirmed group-stage route plus a modelled decision tree from the Round of 32 to the Final.
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
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Model layer</p>
          <h2 className="mt-2 text-4xl font-black">How likely are they to reach each route?</h2>
          <p className="mt-3 max-w-4xl text-lg leading-7 text-[#3d3b23]">
            Polymarket-style prices can calibrate the top-level strength later. This version uses a transparent
            internal model to turn the official bracket into a readable fan path.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ['Win group', groupForecast.winner],
              ['Finish second', groupForecast.runnerUp],
              ['Advance as third', groupForecast.thirdAdvance],
              ['Out in group', groupForecast.out],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border-2 border-[#102033] bg-white p-4">
                <p className="text-sm font-black uppercase text-[#667085]">{label}</p>
                <p className="mt-1 text-4xl font-black text-[#0b7a3b]">{value}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context={`team-${slug}-tickets`}
          title={`Plan ${team} tickets`}
          body={`Use the confirmed ${team} group-stage cities here, then check FIFA's official ticket page for current ticket and hospitality availability.`}
          kind="tickets"
        />
        <CommercialCta
          context={`team-${slug}-alerts`}
          title={`Follow the ${team} route`}
          body={`Get a route reminder for ${team} if their knockout path changes, prices move, or a city becomes more important for fans.`}
          kind="alerts"
        />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Probability decision tree</p>
            <h2 className="mt-2 text-4xl font-black">Win, lose, next city</h2>
            <p className="mt-3 max-w-4xl text-lg leading-7 text-[#506070]">
              Each branch shows the chance of arriving at that match, the modelled chance to win there,
              and the city unlocked by a win. Losing usually ends the trip; semifinal losers go to the third-place match.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {probabilityTree.map((path) => (
              <div key={path.label} className="rounded-md border-2 border-[#102033] bg-[#fffaf0] p-4 shadow-[6px_6px_0_#ffd447]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#102033] p-4 text-white">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffd447]">{path.label}</p>
                    <h3 className="text-2xl font-black">{path.probability}% route probability</h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#102033]">
                    starts {path.entryMatch.city}
                  </span>
                </div>

                <div className="space-y-4">
                  {path.nodes.map((node, index) => (
                    <div key={node.match.id} className="relative rounded-md border-2 border-[#e8dfc8] bg-white p-4">
                      {index > 0 && (
                        <div className="absolute -top-4 left-8 h-4 w-1 bg-[#0b7a3b]" />
                      )}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase text-[#667085]">
                            {node.match.stage} · Match {node.match.id}
                          </p>
                          <h4 className="mt-1 text-2xl font-black">{node.match.city}</h4>
                          <p className="mt-1 text-sm font-bold text-[#506070]">
                            {node.match.date} · {node.match.stadium}
                          </p>
                        </div>
                        <div className="rounded-md bg-[#fffaf0] px-4 py-3 text-right">
                          <p className="text-xs font-black uppercase text-[#667085]">Chance here</p>
                          <p className="text-3xl font-black text-[#0b7a3b]">{node.arrivalProbability}%</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-md border-2 border-[#0b7a3b] bg-[#effaf2] p-3">
                          <p className="text-sm font-black text-[#0b7a3b]">Win this match: {node.winProbability}%</p>
                          <p className="mt-1 text-sm text-[#315a40]">
                            Total path chance: {node.winTotalProbability}%
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            Next: {node.nextWinMatch ? `${node.nextWinMatch.city} · ${node.nextWinMatch.stage}` : 'World Cup champion'}
                          </p>
                        </div>
                        <div className="rounded-md border-2 border-[#e52b2f] bg-[#fff3f2] p-3">
                          <p className="text-sm font-black text-[#e52b2f]">Lose this match: {node.loseProbability}%</p>
                          <p className="mt-1 text-sm text-[#7b3b38]">
                            Total path chance: {node.loseTotalProbability}%
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            Next: {node.nextLoseMatch ? `${node.nextLoseMatch.city} · ${node.nextLoseMatch.stage}` : 'Eliminated'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            and market layers can sit below this core route. The tree above is the shape we can later calibrate
            with Polymarket, sportsbook odds, or our own match model.
          </p>
        </div>
      </section>
    </main>
  );
}
