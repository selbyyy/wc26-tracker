import Link from 'next/link';
import type { Metadata } from 'next';
import { featuredTeams, scenarioCards } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'World Cup 2026 Scenario Simulator',
  description:
    'Explore the World Cup 2026 scenario engine concept: group winner paths, third-place qualification, and city exposure.',
};

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#101820]">
      <section className="border-b border-[#dbe3ea] bg-[#101820] text-white">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <nav className="mb-10 flex flex-wrap gap-3 text-sm font-semibold text-white/60">
            <Link href="/" className="text-white hover:text-[#83d6c4]">WC26 Chances</Link>
            <Link href="/teams/usa" className="hover:text-[#83d6c4]">Teams</Link>
            <Link href="/cities" className="hover:text-[#83d6c4]">Cities</Link>
          </nav>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#83d6c4]">Scenario simulator</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-6xl">
            Turn one result into path changes.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
            The first build defines the product surface. The next build should connect real groups,
            standings, and bracket rules so each match instantly updates team, city, and market probabilities.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b58]">Prototype controls</p>
          <h2 className="mt-2 text-3xl font-black">The expected user workflow</h2>
          <p className="mt-4 leading-7 text-[#516170]">
            A user chooses a team, adjusts a match result, then sees qualification, next city,
            likely opponent, and market gap update together.
          </p>
        </div>

        <div className="rounded-md border border-[#cfd9e2] bg-white p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-xs font-bold uppercase text-[#697887]">Team</span>
              <select className="mt-2 w-full rounded-md border border-[#cfd9e2] bg-white px-3 py-3 text-sm font-bold">
                {featuredTeams.map((team) => (
                  <option key={team.slug}>{team.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase text-[#697887]">Result</span>
              <select className="mt-2 w-full rounded-md border border-[#cfd9e2] bg-white px-3 py-3 text-sm font-bold">
                <option>Win</option>
                <option>Draw</option>
                <option>Loss</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase text-[#697887]">Impact</span>
              <select className="mt-2 w-full rounded-md border border-[#cfd9e2] bg-white px-3 py-3 text-sm font-bold">
                <option>Qualification</option>
                <option>City path</option>
                <option>Market gap</option>
              </select>
            </label>
          </div>
          <div className="mt-5 rounded-md bg-[#edf3f7] p-5">
            <p className="text-sm font-bold uppercase text-[#697887]">Example output</p>
            <p className="mt-2 text-2xl font-black">A group win can change the next-city route and opponent pool.</p>
            <p className="mt-3 leading-7 text-[#516170]">
              This placeholder keeps the page usable while the real match model is built.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#dbe3ea] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {scenarioCards.map((card) => (
              <div key={card.title} className="rounded-md border border-[#cfd9e2] bg-[#f7f9fb] p-5">
                <h2 className="font-black">{card.title}</h2>
                <p className="mt-2 text-sm font-semibold">{card.question}</p>
                <p className="mt-2 text-sm leading-6 text-[#516170]">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
