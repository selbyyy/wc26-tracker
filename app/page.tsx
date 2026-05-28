import Link from 'next/link';
import {
  findTeamWinMarket,
  formatPercent,
  generateSlug,
  getBinaryYesProbability,
  getWorldCupMarkets,
} from '@/lib/markets';
import { featuredTeams, hostCities, scenarioCards } from '@/lib/site-data';

export const revalidate = 300;

function displayChance(marketChance: number | null, fallback: number) {
  return marketChance === null ? formatPercent(fallback) : formatPercent(marketChance);
}

function chanceSource(marketChance: number | null) {
  return marketChance === null ? 'Model placeholder' : 'Live market';
}

export default async function Home() {
  const markets = await getWorldCupMarkets();
  const topMarkets = markets
    .sort((a, b) => (b.volume || 0) - (a.volume || 0))
    .slice(0, 8);

  const teamRows = featuredTeams.map((team) => {
    const market = findTeamWinMarket(markets, team.name);
    const marketChance = market ? getBinaryYesProbability(market) : null;
    return {
      team,
      market,
      marketChance,
      gap: marketChance === null ? null : marketChance - team.baseWinChance,
    };
  });

  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#101820]">
      <section className="border-b border-[#dbe3ea] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-12">
          <div className="flex min-h-[420px] flex-col justify-between">
            <nav className="mb-10 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#516170]">
              <span className="text-[#101820]">WC26 Chances</span>
              <Link href="/teams/usa" className="hover:text-[#0b6b58]">Teams</Link>
              <Link href="/cities" className="hover:text-[#0b6b58]">Cities</Link>
              <Link href="/scenarios" className="hover:text-[#0b6b58]">Scenarios</Link>
              <Link href="/market/will-usa-win-the-2026-fifa-world-cup" className="hover:text-[#0b6b58]">Markets</Link>
            </nav>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">
                World Cup 2026 path predictor
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-normal text-[#101820] md:text-7xl">
                Track where your team can go next.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#516170]">
                Follow each team&apos;s chances to win, reach each round, appear in key host cities,
                and move in prediction markets before the crowd catches up.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link href="/teams/argentina" className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-4 hover:border-[#0b6b58]">
                <span className="block text-xs font-bold uppercase text-[#697887]">Start with</span>
                <span className="mt-1 block text-lg font-black">Argentina path</span>
              </Link>
              <Link href="/cities" className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-4 hover:border-[#0b6b58]">
                <span className="block text-xs font-bold uppercase text-[#697887]">Plan around</span>
                <span className="mt-1 block text-lg font-black">Host cities</span>
              </Link>
              <Link href="/scenarios" className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-4 hover:border-[#0b6b58]">
                <span className="block text-xs font-bold uppercase text-[#697887]">Model</span>
                <span className="mt-1 block text-lg font-black">What-if paths</span>
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-[#cfd9e2] bg-[#101820] p-5 text-white shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#83d6c4]">Live signal board</p>
                <h2 className="mt-1 text-2xl font-black">Teams to watch</h2>
              </div>
              <span className="rounded-md bg-white/10 px-3 py-1 text-sm text-white/80">5 min cache</span>
            </div>
            <div className="space-y-3">
              {teamRows.slice(0, 6).map(({ team, marketChance }) => (
                <Link
                  href={`/teams/${team.slug}`}
                  key={team.slug}
                  className="grid grid-cols-[1fr_auto] items-center rounded-md border border-white/10 bg-white/[0.04] p-4 hover:border-[#83d6c4]"
                >
                  <div>
                    <p className="font-bold">{team.name}</p>
                    <p className="mt-1 text-sm text-white/60">{chanceSource(marketChance)} win chance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#83d6c4]">
                      {displayChance(marketChance, team.baseWinChance)}
                    </p>
                    <p className="text-xs text-white/50">QF {formatPercent(team.quarterFinal)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dbe3ea] bg-[#f7f9fb]">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Decision modules</p>
              <h2 className="mt-2 text-3xl font-black">What this site should help users decide</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#516170]">
              The first version focuses on high-value repeat use: team paths, city exposure,
              scenario changes, and market disagreement.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Team paths', 'Round-by-round chances and likely opponent routes.'],
              ['City chances', 'Which teams are likely to appear in each host city.'],
              ['Scenario swings', 'How one result changes qualification and bracket paths.'],
              ['Market signals', 'Prediction-market price compared with model assumptions.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-md border border-[#cfd9e2] bg-white p-5">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#516170]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Team path board</p>
              <h2 className="mt-2 text-3xl font-black">Featured teams</h2>
            </div>
            <span className="hidden text-sm text-[#516170] md:block">Market chance overrides placeholder model when available.</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {teamRows.map(({ team, marketChance }) => (
              <Link href={`/teams/${team.slug}`} key={team.slug} className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-5 hover:border-[#0b6b58]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black">{team.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase text-[#697887]">{team.confederation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#0b6b58]">{displayChance(marketChance, team.baseWinChance)}</p>
                    <p className="text-xs text-[#697887]">{chanceSource(marketChance)}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-white p-3">
                    <span className="block font-black">{formatPercent(team.roundOf32)}</span>
                    <span className="text-xs text-[#697887]">R32</span>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <span className="block font-black">{formatPercent(team.semiFinal)}</span>
                    <span className="text-xs text-[#697887]">Semi</span>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <span className="block font-black">{formatPercent(team.final)}</span>
                    <span className="text-xs text-[#697887]">Final</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#516170]">{team.pathNote}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe3ea] bg-[#edf3f7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[0.85fr_1.15fr] md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">City exposure</p>
            <h2 className="mt-2 text-3xl font-black">Probability meets travel planning</h2>
            <p className="mt-4 leading-7 text-[#516170]">
              City pages are the pivot away from generic betting content. They connect team probability
              to ticket demand, hotel planning, and fan travel decisions.
            </p>
            <Link href="/cities" className="mt-6 inline-flex rounded-md bg-[#101820] px-5 py-3 text-sm font-bold text-white hover:bg-[#0b6b58]">
              View host city board
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {hostCities.slice(0, 4).map((city) => (
              <Link href="/cities" key={city.slug} className="rounded-md border border-[#cfd9e2] bg-white p-5 hover:border-[#0b6b58]">
                <p className="text-xs font-bold uppercase text-[#697887]">{city.country}</p>
                <h3 className="mt-1 text-xl font-black">{city.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#516170]">{city.angle}</p>
                <p className="mt-4 text-sm font-bold text-[#0b6b58]">{city.likelyTeams.slice(0, 3).join(' / ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 md:px-8">
          <div className="md:col-span-1">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Scenario engine</p>
            <h2 className="mt-2 text-3xl font-black">The feature that can become habit-forming</h2>
            <Link href="/scenarios" className="mt-6 inline-flex rounded-md border border-[#101820] px-5 py-3 text-sm font-bold hover:border-[#0b6b58] hover:text-[#0b6b58]">
              Open scenario page
            </Link>
          </div>
          <div className="grid gap-4 md:col-span-2">
            {scenarioCards.map((card) => (
              <div key={card.title} className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-5">
                <h3 className="font-black">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#101820]">{card.question}</p>
                <p className="mt-2 text-sm leading-6 text-[#516170]">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dbe3ea] bg-[#101820] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#83d6c4]">Market layer</p>
              <h2 className="mt-2 text-3xl font-black">Live prediction-market signals</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/60">
              This remains useful, but it becomes one input inside a broader path and travel product.
            </p>
          </div>

          {topMarkets.length === 0 ? (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-white/70">
              Live markets are temporarily unavailable.
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border border-white/10">
              {topMarkets.map((market) => (
                <Link
                  href={`/market/${generateSlug(market.question)}`}
                  key={market.id}
                  className="grid gap-3 border-b border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.07] md:grid-cols-[1fr_auto]"
                >
                  <span className="font-semibold">{market.question}</span>
                  <span className="text-sm text-[#83d6c4]">
                    Vol {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(market.volume || 0)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
