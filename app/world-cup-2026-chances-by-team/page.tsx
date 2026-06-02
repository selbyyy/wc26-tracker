import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSlug } from '@/lib/slug';
import { getTeamGroupForecast } from '@/lib/probability-tree';
import { getAllTeams, getGroupForTeam } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Chances by Team: Knockout Stage Model',
  description:
    'Compare every World Cup 2026 team by its modelled chance of reaching the knockout stage, including group-win, runner-up, third-place, and group-exit estimates.',
  alternates: {
    canonical: '/world-cup-2026-chances-by-team',
  },
  openGraph: {
    title: 'World Cup 2026 Chances by Team: Knockout Stage Model',
    description:
      'Compare modelled knockout-stage chances for every World Cup 2026 team, then open any team page to map its schedule and possible route.',
    url: '/world-cup-2026-chances-by-team',
    type: 'article',
  },
};

const featuredTeams = ['Argentina', 'Brazil', 'France', 'Spain', 'England', 'Portugal', 'Mexico', 'USA'];

export default function ChancesByTeamPage() {
  const teams = getAllTeams()
    .map((team) => {
      const forecast = getTeamGroupForecast(team);
      return {
        team,
        group: getGroupForTeam(team),
        forecast,
        reachKnockouts: 100 - forecast.out,
      };
    })
    .sort((a, b) => b.reachKnockouts - a.reachKnockouts || a.team.localeCompare(b.team));

  const faqItems = [
    {
      question: 'What does a team chance mean on WC26 Chances?',
      answer:
        'It is the modelled chance that a team reaches the World Cup 2026 knockout stage. It includes finishing first, finishing second, or advancing as one of the best third-place teams.',
    },
    {
      question: 'Are these official World Cup 2026 odds?',
      answer:
        'No. These are planning-model estimates, not official forecasts and not live betting-market prices. Use them to compare possible routes, then open a team page for the underlying schedule and bracket path.',
    },
    {
      question: 'Why can a third-place team still reach the knockouts?',
      answer:
        'The 2026 tournament has 12 groups. The eight best third-place teams join the group winners and runners-up in the Round of 32.',
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
            <Link href="/world-cup-2026-schedule-by-team" className="px-2 py-2 hover:text-[#ffd447]">Schedule</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Planning model
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 chances by team.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            Compare each team&apos;s modelled chance of reaching the knockout stage, then open a team page to see
            the confirmed schedule and possible route by city.
          </p>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Popular teams</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredTeams.map((team) => (
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
        <div className="mb-5 max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">All 48 teams</p>
          <h2 className="mt-2 text-4xl font-black">Chance to reach the knockout stage</h2>
          <p className="mt-3 text-lg leading-7 text-[#506070]">
            These estimates come from a simple planning model. They are designed to make route comparisons useful,
            not to imitate official odds or a live betting market.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teams.map(({ team, group, forecast, reachKnockouts }) => (
            <Link
              key={team}
              href={`/teams/${generateSlug(team)}`}
              className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[5px_5px_0_#ffd447] hover:bg-[#fffaf0]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase text-[#e52b2f]">Group {group}</p>
                  <h3 className="mt-1 text-2xl font-black">{team}</h3>
                </div>
                <p className="rounded-md bg-[#0b7a3b] px-3 py-2 text-right text-lg font-black text-white">
                  {reachKnockouts}%
                </p>
              </div>
              <p className="mt-3 text-sm font-black text-[#0b7a3b]">Reach the knockout stage</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <p className="rounded-md bg-[#fffaf0] px-3 py-2"><strong>{forecast.winner}%</strong> win group</p>
                <p className="rounded-md bg-[#fffaf0] px-3 py-2"><strong>{forecast.runnerUp}%</strong> finish second</p>
                <p className="rounded-md bg-[#fffaf0] px-3 py-2"><strong>{forecast.thirdAdvance}%</strong> advance third</p>
                <p className="rounded-md bg-[#fffaf0] px-3 py-2"><strong>{forecast.out}%</strong> group exit</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 chances FAQ</h2>
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
