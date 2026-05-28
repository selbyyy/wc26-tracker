import Link from 'next/link';
import type { Metadata } from 'next';
import { hostCities } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'World Cup 2026 Host City Chances',
  description:
    'Track which teams are most likely to appear in each World Cup 2026 host city for ticket, travel, and market decisions.',
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#101820]">
      <section className="border-b border-[#dbe3ea] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <nav className="mb-10 flex flex-wrap gap-3 text-sm font-semibold text-[#516170]">
            <Link href="/" className="text-[#101820] hover:text-[#0b6b58]">WC26 Chances</Link>
            <Link href="/teams/usa" className="hover:text-[#0b6b58]">Teams</Link>
            <Link href="/scenarios" className="hover:text-[#0b6b58]">Scenarios</Link>
          </nav>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Host city board</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-6xl">
            Which teams might play in each city?
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#516170]">
            This is the travel and ticketing angle of WC26 Chances. City exposure can become
            a practical decision tool once the draw, group results, and bracket paths are connected.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hostCities.map((city) => (
            <div key={city.slug} className="rounded-md border border-[#cfd9e2] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#697887]">{city.country}</p>
                  <h2 className="mt-1 text-2xl font-black">{city.name}</h2>
                </div>
                <span className="rounded-md bg-[#edf3f7] px-3 py-1 text-xs font-bold text-[#516170]">
                  {city.venue}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#516170]">{city.angle}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {city.likelyTeams.map((team) => (
                  <span key={team} className="rounded-md bg-[#f7f9fb] px-3 py-2 text-sm font-bold">
                    {team}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
