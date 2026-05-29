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

function getOpponent(match: ReturnType<typeof getTeamMatches>[number], team: string) {
  return match.home === team ? match.away : match.home;
}

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

export function generateStaticParams() {
  return getAllTeams().map((team) => ({ slug: generateSlug(team) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlugFromSchedule(slug);

  if (!team) return { title: 'Team Schedule Not Found' };

  const matches = getTeamMatches(team);
  const cities = Array.from(new Set(matches.map((match) => match.city)));
  const title = `${team} World Cup 2026 Schedule: Dates, Cities, Stadiums`;
  const description = `${team} plays its World Cup 2026 group games in ${formatList(cities)}. See match dates, opponents, stadiums, and possible knockout routes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/teams/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/teams/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
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
  const firstMatch = matches[0];
  const opponents = matches.map((match) => getOpponent(match, team));
  const groupTeams = Array.from(new Set([team, ...opponents])).sort((a, b) => a.localeCompare(b));
  const faqItems = [
    {
      question: `Where does ${team} play in World Cup 2026?`,
      answer: `${team} plays its confirmed World Cup 2026 group games in ${formatList(cities)}.`,
    },
    {
      question: `When is ${team}'s first World Cup 2026 match?`,
      answer: `${team}'s first group match is ${firstMatch.home} vs ${firstMatch.away} on ${firstMatch.date} at ${firstMatch.stadium} in ${firstMatch.city}.`,
    },
    {
      question: `Who does ${team} play in the group stage?`,
      answer: `${team} plays ${formatList(opponents)} in Group ${group}.`,
    },
    {
      question: `What stadiums does ${team} play at in World Cup 2026?`,
      answer: `${team}'s confirmed group-stage stadiums are ${formatList(matches.map((match) => match.stadium))}.`,
    },
    {
      question: `What is ${team}'s possible knockout route?`,
      answer: `The knockout route depends on whether ${team} wins Group ${group}, finishes second, or advances as a third-place team. This page maps the likely cities and matches for each route.`,
    },
  ];
  const pageUrl = `https://www.wc26chances.com/teams/${slug}`;
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
          name: `${team} World Cup 2026 Schedule`,
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
                {team} has confirmed group games against {formatList(opponents)}. Start with the cities and dates
                already locked in, then see where the route could go if {team} make it through.
              </p>
            </div>

            <div className="rounded-md bg-white p-5 text-[#102033] shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Quick answer</p>
              <p className="mt-2 text-lg font-black leading-7">
                {team} plays its World Cup 2026 group games in {formatList(cities)}.
              </p>
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
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Route odds</p>
          <h2 className="mt-2 text-4xl font-black">What are the likely paths?</h2>
          <p className="mt-3 max-w-4xl text-lg leading-7 text-[#3d3b23]">
            This is a simple model built on top of the official bracket. Treat it as a planning guide, not a prediction
            that knows the future.
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
          title={`Looking for ${team} tickets?`}
          body={`Use the confirmed ${team} cities here first, then check FIFA's official ticket page for current availability.`}
          kind="tickets"
        />
        <CommercialCta
          context={`team-${slug}-alerts`}
          title={`Want ${team} route updates?`}
          body={`Tell us you care about ${team}, and we will shape alerts around the cities that matter next.`}
          kind="alerts"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Common questions</p>
            <h2 className="mt-2 text-4xl font-black">{team} World Cup 2026 FAQ</h2>
            <div className="mt-5 divide-y-2 divide-[#e8dfc8] rounded-md border-2 border-[#102033] bg-white">
              {faqItems.map((item) => (
                <div key={item.question} className="p-5">
                  <h3 className="text-xl font-black">{item.question}</h3>
                  <p className="mt-2 text-base leading-7 text-[#506070]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border-2 border-[#102033] bg-[#ffd447] p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Group {group}</p>
            <h2 className="mt-2 text-3xl font-black">Compare the group</h2>
            <div className="mt-5 grid gap-3">
              {groupTeams.map((groupTeam) => (
                <Link
                  key={groupTeam}
                  href={`/teams/${generateSlug(groupTeam)}`}
                  className="rounded-md border-2 border-[#102033] bg-white px-4 py-3 text-lg font-black hover:bg-[#fffaf0]"
                >
                  {groupTeam}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Match-by-match path</p>
            <h2 className="mt-2 text-4xl font-black">Win, lose, where next?</h2>
            <p className="mt-3 max-w-4xl text-lg leading-7 text-[#506070]">
              Each card shows the chance of reaching that match, the model win chance, and the city that opens up
              with a win. Most losses end the run; semifinal losers still go to the third-place match.
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
          <h2 className="mt-2 text-3xl font-black">This page is for quick planning.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
            If you support {team}, start here to see the cities that are already locked in. Tickets, hotels,
            and odds are useful later, but the first question is simpler: where might you need to be?
          </p>
        </div>
      </section>
    </main>
  );
}
