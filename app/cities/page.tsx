import Link from 'next/link';
import type { Metadata } from 'next';
import { allMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Host Cities and Match Routes',
  description:
    'See World Cup 2026 host cities, stadiums, scheduled matches, teams, and knockout route slots.',
};

const cityOrder = [
  'Mexico City',
  'Guadalajara',
  'Monterrey',
  'Toronto',
  'Vancouver',
  'Los Angeles',
  'Seattle',
  'San Francisco Bay Area',
  'Dallas',
  'Houston',
  'Kansas City',
  'Atlanta',
  'Miami',
  'Boston',
  'Philadelphia',
  'New York/New Jersey',
];

export default function CitiesPage() {
  const cities = cityOrder.map((city) => ({
    city,
    matches: allMatches.filter((match) => match.city === city),
  }));

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <section className="bg-[#e52b2f] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/75">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#e52b2f]">WC26 Chances</Link>
            <Link href="/teams/argentina" className="px-2 py-2 hover:text-[#ffd447]">Teams</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Tourism board
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            Every host city, every match slot.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            Use cities like a travel map: see confirmed group games, knockout slots, and where fan demand may concentrate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cities.map(({ city, matches }) => (
            <div key={city} className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-[#667085]">{matches[0]?.country}</p>
                  <h2 className="mt-1 text-2xl font-black">{city}</h2>
                </div>
                <span className="rounded-full bg-[#0b7a3b] px-3 py-1 text-xs font-black text-white">
                  {matches.length} slots
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {matches.slice(0, 5).map((match) => (
                  <div key={match.id} className="rounded-md bg-[#fffaf0] p-3">
                    <p className="text-sm font-black">
                      Match {match.id}: {match.home} vs {match.away}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#506070]">
                      {match.stage} · {match.date} · {match.stadium}
                    </p>
                  </div>
                ))}
              </div>

              {matches.length > 5 && (
                <p className="mt-4 text-sm font-black text-[#e52b2f]">
                  + {matches.length - 5} more knockout or group slots
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
