import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  findTeamWinMarket,
  formatPercent,
  generateSlug,
  getBinaryYesProbability,
  getWorldCupMarkets,
} from '@/lib/markets';
import { getTeamBySlug, hostCities } from '@/lib/site-data';

export const revalidate = 300;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) {
    return {
      title: 'Team Path Not Found',
    };
  }

  return {
    title: `${team.name} World Cup 2026 Chances, Path, and Host Cities`,
    description: `Track ${team.name}'s World Cup 2026 win chance, knockout path, likely host cities, and prediction-market signal.`,
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) notFound();

  const markets = await getWorldCupMarkets();
  const market = findTeamWinMarket(markets, team.name);
  const marketChance = market ? getBinaryYesProbability(market) : null;
  const winChance = marketChance ?? team.baseWinChance;
  const relatedCities = hostCities.filter((city) => team.likelyCities.includes(city.name));

  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#101820]">
      <section className="border-b border-[#dbe3ea] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          <nav className="mb-10 flex flex-wrap gap-3 text-sm font-semibold text-[#516170]">
            <Link href="/" className="text-[#101820] hover:text-[#0b6b58]">WC26 Chances</Link>
            <Link href="/cities" className="hover:text-[#0b6b58]">Cities</Link>
            <Link href="/scenarios" className="hover:text-[#0b6b58]">Scenarios</Link>
          </nav>

          <div className="grid gap-8 md:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">{team.confederation} path page</p>
              <h1 className="mt-3 text-5xl font-black leading-tight tracking-normal md:text-6xl">
                {team.name} World Cup 2026 chances
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#516170]">{team.userAngle}</p>
            </div>

            <div className="rounded-md border border-[#cfd9e2] bg-[#101820] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#83d6c4]">
                {marketChance === null ? 'Model placeholder' : 'Live market'}
              </p>
              <p className="mt-2 text-5xl font-black text-[#83d6c4]">{formatPercent(winChance)}</p>
              <p className="mt-2 text-sm text-white/60">Current win chance</p>
              {market && (
                <Link
                  href={`/market/${generateSlug(market.question)}`}
                  className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-bold text-[#101820] hover:bg-[#83d6c4]"
                >
                  Open market detail
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-4 md:px-8">
        {[
          ['Round of 32', team.roundOf32],
          ['Quarterfinal', team.quarterFinal],
          ['Semifinal', team.semiFinal],
          ['Final', team.final],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#cfd9e2] bg-white p-5">
            <p className="text-sm font-bold uppercase text-[#697887]">{label}</p>
            <p className="mt-2 text-4xl font-black text-[#0b6b58]">{formatPercent(Number(value))}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-[#dbe3ea] bg-[#edf3f7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Path interpretation</p>
            <h2 className="mt-2 text-3xl font-black">What needs to happen?</h2>
            <p className="mt-4 leading-7 text-[#516170]">{team.pathNote}</p>
            <p className="mt-4 leading-7 text-[#516170]">
              The next version should convert group results into live route changes: likely opponent,
              next city, rest disadvantage, and market mispricing.
            </p>
          </div>

          <div className="grid gap-4">
            {relatedCities.map((city) => (
              <Link href="/cities" key={city.slug} className="rounded-md border border-[#cfd9e2] bg-white p-5 hover:border-[#0b6b58]">
                <p className="text-xs font-bold uppercase text-[#697887]">Likely city</p>
                <h3 className="mt-1 text-xl font-black">{city.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#516170]">{city.angle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="rounded-md border border-[#cfd9e2] bg-white p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Product note</p>
          <h2 className="mt-2 text-2xl font-black">Why this page can rank</h2>
          <p className="mt-4 leading-7 text-[#516170]">
            This page targets a more specific job than generic odds pages: whether a fan, bettor,
            or traveler should treat {team.name} as a likely knockout traveler, city-demand driver,
            or over/underpriced contender.
          </p>
        </div>
      </section>
    </main>
  );
}
